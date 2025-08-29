/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

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
}

export const useCharacters = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState(true);

    const getCharacters = async (page: number, pageSize: number = 10) => {
        try {
            const res = await fetch("https://swapi.info/api/people");
            const data = await res.json();

            // convertir objeto en array
            const allResults = Object.values(data);

            // simular paginación
            const start = (page - 1) * pageSize;
            const paginated = allResults.slice(start, start + pageSize);

            const enriched: Character[] = await Promise.all(
                paginated.map(async (ch: any) => {
                    const id = parseInt(
                        ch.url.replace(/\/$/, "").split("/").pop() || "0",
                        10
                    );

                    // pedir datos de akabab
                    const akRes = await fetch(
                        `https://akabab.github.io/starwars-api/api/id/${id}.json`
                    );
                    const akData = await akRes.json();

                    // Helper para capitalizar la primera letra
                    const capitalize = (str: string) =>
                        str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

                    return {
                        id,
                        name: capitalize(ch.name),
                        height: `${parseFloat(ch.height) / 100}m`,
                        mass: `${ch.mass}kg`,
                        gender: capitalize(ch.gender),
                        hair_color: capitalize(ch.hair_color),
                        skin_color: capitalize(ch.skin_color),
                        eye_color: capitalize(ch.eye_color),
                        image: akData.image,
                    };
                })
            );

            setCharacters(enriched);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching characters:", error);
            setLoading(false);
        }
    };

    return { getCharacters, characters, loading };
};
