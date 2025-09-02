import { useEffect, useRef, useState } from "react";

import { normalizeValue } from "../../../helpers/normalize-value";

import "./InfoModal.scss";

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

type SWModalProps = {
    isOpen: boolean;
    onClose: () => void;
    character: Character | null;
};

export default function SWModal({ isOpen, onClose, character }: SWModalProps) {
    const [tab, setTab] = useState("character"); // 'character' | 'films'
    const dialogRef = useRef<HTMLDivElement>(null);
    const closeBtnRef = useRef<HTMLButtonElement>(null);

    // Cerrar con ESC
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose?.();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen, onClose]);

    // Enfocar el botón de cerrar al abrir
    useEffect(() => {
        if (isOpen) {
            // pequeño timeout para asegurar que montó
            const t = setTimeout(() => closeBtnRef.current?.focus(), 0);
            return () => clearTimeout(t);
        }
    }, [isOpen]);

    // Cerrar al hacer click en el fondo (pero no dentro del diálogo)
    const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === dialogRef.current) onClose?.();
    };

    if (!isOpen || !character) return null;

    const {
        name,
        gender,
        height,
        mass,
        hair_color,
        skin_color,
        eye_color,
        image,
        species = [],
        films = [],
    } = character;

    return (
        <div
            className="sw-modal__backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sw-modal-title"
            ref={dialogRef}
            onMouseDown={onBackdropClick}
        >
            <div className="sw-modal__hyperspace" aria-hidden="true" />
            <div className="sw-modal__container">
                <header className="sw-modal__header">
                    <h2 id="sw-modal-title" className="sw-modal__title">
                        {name}
                    </h2>
                    <button
                        className="sw-modal__close"
                        onClick={onClose}
                        ref={closeBtnRef}
                        aria-label="Cerrar"
                    >
                        ✕
                    </button>
                </header>

                <nav className="sw-modal__tabs" aria-label="Secciones">
                    <button
                        className={`sw-modal__tab ${tab === "character" ? "is-active" : ""}`}
                        onClick={() => setTab("character")}
                        type="button"
                    >
                        Character
                    </button>
                    <button
                        className={`sw-modal__tab ${tab === "films" ? "is-active" : ""}`}
                        onClick={() => setTab("films")}
                        type="button"
                    >
                        Movies ({films.length})
                    </button>
                </nav>

                <div className="sw-modal__content">
                    {tab === "character" && (
                        <section className="sw-modal__grid">
                            <div className="sw-modal__portrait">
                                <img
                                    src={image}
                                    alt={name}
                                    loading="lazy"
                                    decoding="async"
                                    onError={(e) => {
                                        e.currentTarget.src = "/img/placeholder-character.png";
                                    }}
                                />
                            </div>

                            <ul className="sw-modal__specs">
                                <li><strong>Gender:</strong> {normalizeValue(gender)}</li>
                                <li><strong>Height:</strong> {normalizeValue(height)}</li>
                                <li><strong>Mass:</strong> {normalizeValue(mass)}</li>
                                <li><strong>Hair Color:</strong> {normalizeValue(hair_color)}</li>
                                <li><strong>Skin Color:</strong> {normalizeValue(skin_color)}</li>
                                <li><strong>Eye Color:</strong> {normalizeValue(eye_color)}</li>
                            </ul>

                            <div className="sw-modal__panel">
                                <h3>Species information</h3>
                                {species.length === 0 ? (
                                    <p className="sw-modal__muted">No species information.</p>
                                ) : (
                                    <ul className="sw-modal__chips">
                                        {species.map((s, i) => (
                                            <>
                                                <li key={i} className="sw-chip">
                                                    <span className="sw-chip__title">Species name</span>
                                                    <span className="sw-chip__meta">{normalizeValue(s.name)}</span>
                                                </li>
                                                <li key={i} className="sw-chip">
                                                    <span className="sw-chip__title">Classification</span>
                                                    <span className="sw-chip__meta">{normalizeValue(s.classification)}</span>
                                                </li>
                                                <li key={i} className="sw-chip">
                                                    <span className="sw-chip__title">Languages</span>
                                                    <span className="sw-chip__meta">{normalizeValue(s.language)}</span>
                                                </li>
                                            </>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </section>
                    )}

                    {tab === "films" && (
                        <section className="sw-modal__films">
                            {films.length === 0 ? (
                                <p className="sw-modal__muted">It does not appear in films.</p>
                            ) : (
                                <ul className="sw-film-list">
                                    {films
                                        .slice() // por si quieres ordenar sin mutar
                                        .sort((a, b) => a.episode_id - b.episode_id)
                                        .map((f, idx) => (
                                            <li key={`${f.title}-${idx}`} className="sw-film">
                                                <div className="sw-film__ep">EP {f.episode_id}</div>
                                                <div className="sw-film__body">
                                                    <h4 className="sw-film__title">{f.title}</h4>
                                                    <div className="sw-film__meta">
                                                        <span>Release Date: {f.release_date}</span>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </section>
                    )}
                </div>

                <footer className="sw-modal__footer">
                    <button className="sw-modal__cta" onClick={onClose} type="button">
                        Close
                    </button>
                </footer>
            </div>
        </div>
    );
}
