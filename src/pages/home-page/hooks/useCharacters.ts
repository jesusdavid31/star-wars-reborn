/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef, useState } from "react";

export interface Character {
    id: number;
    name: string;
    height: string;
    mass: string;
    gender: string;
    image: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    species: { name: string; classification: string; language: string }[];
    films: { title: string; episode_id: number; release_date: string }[];
}

type SWAPIPerson = {
    name: string;
    height: string;
    mass: string;
    gender: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    url: string;
    species: string[];
    films: string[];
};

const capitalize = (s: string) =>
    s ? s.charAt(0).toUpperCase() + s.slice(1) : "";

// Convierte centímetros a metros
const safeMeters = (h: string) => {
    const n = parseFloat(h);
    return Number.isFinite(n) ? `${(n / 100).toFixed(2)}m` : "Unknown";
};

const safeMass = (m: string) => {
    const n = parseFloat(String(m).replace(/,/g, ""));
    return Number.isFinite(n) ? `${n}kg` : "Unknown";
};

export const useCharacters = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Cache del listado base (people) para paginar en memoria
    const allPeopleRef = useRef<SWAPIPerson[] | null>(null);

    // Cache por URL (species, films, akabab images, etc.)
    const urlCacheRef = useRef<Map<string, any>>(new Map());

    const needsNetworkForPage = (people: SWAPIPerson[], page: number, pageSize: number, urlCache: Map<string, any>) => {
        const start = (page - 1) * pageSize;
        const chunk = people.slice(start, start + pageSize);

        for (const ch of chunk) {
            const id = parseInt(ch.url.replace(/\/$/, "").split("/").pop() || "0", 10);
            const akUrl = `https://akabab.github.io/starwars-api/api/id/${id}.json`;
            if (!urlCache.has(akUrl)) return true;
            for (const u of ch.species || []) if (!urlCache.has(u)) return true;
            for (const u of ch.films   || []) if (!urlCache.has(u)) return true;
        }
        // todo ya está cacheado en TU Map, no hace falta loader
        return false; 
    };

    // Helper con caché por URL + AbortSignal
    const fetchJSON = useCallback(
        async (url: string, signal?: AbortSignal) => {
            const cache = urlCacheRef.current;   // Map<string, any> que guarda respuestas por URL
            if (cache.has(url)) return cache.get(url); // Si ya pedimos esa URL, devolvemos la respuesta guardada

            const r = await fetch(url, { signal }); // Petición fetch con signal (para abortar si hace falta)
            if (!r.ok) throw new Error(`HTTP ${r.status} on ${url}`); // Manejo de error HTTP (404, 500, etc.)

            const j = await r.json();   // Parseamos JSON
            cache.set(url, j);          // Lo guardamos en cache
            return j;                   // Lo devolvemos
        },
        []
    );

    const clearCaches = useCallback(() => {
        allPeopleRef.current = null;
        urlCacheRef.current.clear();
    }, []);

    const getCharacters = useCallback(
        async (page: number, pageSize = 10, signal?: AbortSignal) => {
            setError(null);

            try {
                // 1) Traer o reutilizar todo el listado base
                // allPeopleRef es un ref (useRef) que guarda el listado completo en caché, para que:
                // Solo hagas fetch una vez.
                // En los siguientes cambios de página no vuelvas a bajar todos los personajes desde la API.
                // if (!allPeopleRef.current) → significa “si todavía no tenemos guardado el listado completo”.
                // fetchJSON(...) → descarga todos los personajes de la API.
                // Object.values(data) → la API no devuelve un array sino un objeto, así que lo convierto en array.
                // allPeopleRef.current = ... → guardo ese array completo en memoria (persistente entre renders gracias a useRef).
                if (!allPeopleRef.current) {
                    setLoading(true);
                    const data = await fetchJSON("https://swapi.info/api/people", signal);
                    allPeopleRef.current = Object.values(data) as SWAPIPerson[];
                }

                // 2) Chequear si necesitamos red para ENRIQUECER esta página
                const all = allPeopleRef.current!;
                const mustShowLoader = needsNetworkForPage(all, page, pageSize, urlCacheRef.current);

                if (mustShowLoader) setLoading(true);

                // 3) paginar + enriquecer (fetchJSON usa tu Map con caché por URL)
                const start = (page - 1) * pageSize;
                const paginated = all.slice(start, start + pageSize);

                const enriched: Character[] = await Promise.all(
                    paginated.map(async (ch) => {
                        
                        const id = parseInt(
                            ch.url.replace(/\/$/, "").split("/").pop() || "0",
                            10
                        );

                        // Imagen (akabab) — cacheada por URL
                        let image = "";
                        try {
                            const ak = await fetchJSON(
                                `https://akabab.github.io/starwars-api/api/id/${id}.json`,
                                signal
                            );
                            image = ak?.image || "";
                        } catch {
                            image = "";
                        }

                        // Species — cacheadas por URL
                        const speciesData = await Promise.all(
                            (ch.species || []).map((u) => fetchJSON(u, signal))
                        );

                        // Films — cacheadas por URL
                        const filmsData = await Promise.all(
                            (ch.films || []).map((u) => fetchJSON(u, signal))
                        );

                        return {
                            id,
                            name: capitalize(ch.name),
                            height: safeMeters(ch.height),
                            mass: safeMass(ch.mass),
                            gender: capitalize(ch.gender),
                            hair_color: capitalize(ch.hair_color),
                            skin_color: capitalize(ch.skin_color),
                            eye_color: capitalize(ch.eye_color),
                            image: image || "/img/placeholder-character.png",
                            species: speciesData.map((s: any) => ({
                                name: s.name,
                                classification: s.classification,
                                language: s.language,
                            })),
                            films: filmsData.map((f: any) => ({
                                title: f.title,
                                episode_id: f.episode_id,
                                release_date: f.release_date,
                            })),
                        };
                    })
                );

                setCharacters(enriched);
            } catch (e: any) {
                if (e?.name !== "AbortError") {
                    setError(e?.message || "Unknown error");
                }
            } finally {
                setLoading(false);
            }
        },
        [fetchJSON]
    );

    return {
        getCharacters,
        characters,
        loading,
        error,
        total: allPeopleRef.current?.length ?? 0,
        clearCaches, // por si quieres forzar refetch en algún momento
    };
};