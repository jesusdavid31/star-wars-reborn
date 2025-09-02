import { useState, useEffect } from "react";

import { useCharacters, type Character } from "./hooks/useCharacters"; // importa el hook

// Components
import Galaxy from "../../components/galaxy/Galaxy";
import InfoModal from "./components/InfoModal";

// Helpers
import { normalizeValue } from "../../helpers/normalize-value";

// ESTILOS
import './HomePage.scss';

const HomePage = () => {

    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(1);
    // const [totalPages, setTotalPages] = useState(2);
    const [character, setCharacter] = useState<Character | null>(null);

    // usamos el hook pasándole la página actual
    const { getCharacters, characters, loading } = useCharacters();

    const goToPreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const goToNextPage = () => {
        setPage(page + 1);
    };

    useEffect(() => {
        const controller = new AbortController(); // crear el abort controller para hacer un seguro anti-fetches viejos
        getCharacters(page, 10, controller.signal); // pasamos el signal al hook
        return () => controller.abort(); // cancelar cuando cambie de página o se desmonte
    }, [page, getCharacters]);

    // useEffect(() => {
    //     setTotalPages(Math.ceil(total / 10));
    // }, [total]);

    return (
        <div className="home-page">
            <div style={{ width: '100%', height: 'auto', position: 'relative' }}>
                <Galaxy starSpeed={0.2}  speed={0.5} rotationSpeed={0.2} density={0.7} mouseInteraction={false} mouseRepulsion={false} />
                <div className="home-page-container">
                    { loading ? (
                        <div
                            style={{ minHeight: 400, display: 'grid', placeItems: 'center' }}
                            aria-busy="true"
                            aria-live="polite"
                        >
                            <div className="solar">
                                <i className="mercury"></i>
                                <i className="venus"></i>
                                <i className="earth"></i>
                                <i className="mars"></i>
                                <i className="belt"></i>
                                <i className="jupiter"></i>
                                <i className="saturn"></i>
                                <i className="uranus"></i>
                                <i className="neptune"></i>
                            </div>
                        </div>
                    ) : (
                        <div className="card-container">

                            {/* From Uiverse.io by reyrojo2 */}
                            <div className="section-banner-sun">
                                <div id="star-1">
                                    <div className="curved-corner-star">
                                    <div id="curved-corner-bottomright"></div>
                                    <div id="curved-corner-bottomleft"></div>
                                    </div>
                                    <div className="curved-corner-star">
                                    <div id="curved-corner-topright"></div>
                                    <div id="curved-corner-topleft"></div>
                                    </div>
                                </div>

                                <div id="star-2">
                                    <div className="curved-corner-star">
                                    <div id="curved-corner-bottomright"></div>
                                    <div id="curved-corner-bottomleft"></div>
                                    </div>
                                    <div className="curved-corner-star">
                                    <div id="curved-corner-topright"></div>
                                    <div id="curved-corner-topleft"></div>
                                    </div>
                                </div>

                                <div id="star-3">
                                    <div className="curved-corner-star">
                                    <div id="curved-corner-bottomright"></div>
                                    <div id="curved-corner-bottomleft"></div>
                                    </div>
                                    <div className="curved-corner-star">
                                    <div id="curved-corner-topright"></div>
                                    <div id="curved-corner-topleft"></div>
                                    </div>
                                </div>

                                <div id="star-4">
                                    <div className="curved-corner-star">
                                    <div id="curved-corner-bottomright"></div>
                                    <div id="curved-corner-bottomleft"></div>
                                    </div>
                                    <div className="curved-corner-star">
                                    <div id="curved-corner-topright"></div>
                                    <div id="curved-corner-topleft"></div>
                                    </div>
                                </div>

                                <div id="star-5">
                                    <div className="curved-corner-star">
                                    <div id="curved-corner-bottomright"></div>
                                    <div id="curved-corner-bottomleft"></div>
                                    </div>
                                    <div className="curved-corner-star">
                                    <div id="curved-corner-topright"></div>
                                    <div id="curved-corner-topleft"></div>
                                    </div>
                                </div>

                                <div id="star-6">
                                    <div className="curved-corner-star">
                                    <div id="curved-corner-bottomright"></div>
                                    <div id="curved-corner-bottomleft"></div>
                                    </div>
                                    <div className="curved-corner-star">
                                    <div id="curved-corner-topright"></div>
                                    <div id="curved-corner-topleft"></div>
                                    </div>
                                </div>

                                <div id="star-7">
                                    <div className="curved-corner-star">
                                    <div id="curved-corner-bottomright"></div>
                                    <div id="curved-corner-bottomleft"></div>
                                    </div>
                                    <div className="curved-corner-star">
                                    <div id="curved-corner-topright"></div>
                                    <div id="curved-corner-topleft"></div>
                                    </div>
                                </div>
                            </div>

                            {/* From Uiverse.io by Lakshay-art */}
                            <div className="section-banner-earth">
                                <div id="star-1">
                                    <div className="curved-corner-star">
                                    <div id="curved-corner-bottomright"></div>
                                    <div id="curved-corner-bottomleft"></div>
                                    </div>
                                    <div className="curved-corner-star">
                                    <div id="curved-corner-topright"></div>
                                    <div id="curved-corner-topleft"></div>
                                    </div>
                                </div>

                                <div id="star-2">
                                    <div className="curved-corner-star">
                                    <div id="curved-corner-bottomright"></div>
                                    <div id="curved-corner-bottomleft"></div>
                                    </div>
                                    <div className="curved-corner-star">
                                    <div id="curved-corner-topright"></div>
                                    <div id="curved-corner-topleft"></div>
                                    </div>
                                </div>

                                <div id="star-3">
                                    <div className="curved-corner-star">
                                    <div id="curved-corner-bottomright"></div>
                                    <div id="curved-corner-bottomleft"></div>
                                    </div>
                                    <div className="curved-corner-star">
                                    <div id="curved-corner-topright"></div>
                                    <div id="curved-corner-topleft"></div>
                                    </div>
                                </div>

                                <div id="star-4">
                                    <div className="curved-corner-star">
                                    <div id="curved-corner-bottomright"></div>
                                    <div id="curved-corner-bottomleft"></div>
                                    </div>
                                    <div className="curved-corner-star">
                                    <div id="curved-corner-topright"></div>
                                    <div id="curved-corner-topleft"></div>
                                    </div>
                                </div>

                                <div id="star-5">
                                    <div className="curved-corner-star">
                                    <div id="curved-corner-bottomright"></div>
                                    <div id="curved-corner-bottomleft"></div>
                                    </div>
                                    <div className="curved-corner-star">
                                    <div id="curved-corner-topright"></div>
                                    <div id="curved-corner-topleft"></div>
                                    </div>
                                </div>

                                <div id="star-6">
                                    <div className="curved-corner-star">
                                    <div id="curved-corner-bottomright"></div>
                                    <div id="curved-corner-bottomleft"></div>
                                    </div>
                                    <div className="curved-corner-star">
                                    <div id="curved-corner-topright"></div>
                                    <div id="curved-corner-topleft"></div>
                                    </div>
                                </div>

                                <div id="star-7">
                                    <div className="curved-corner-star">
                                    <div id="curved-corner-bottomright"></div>
                                    <div id="curved-corner-bottomleft"></div>
                                    </div>
                                    <div className="curved-corner-star">
                                    <div id="curved-corner-topright"></div>
                                    <div id="curved-corner-topleft"></div>
                                    </div>
                                </div>
                            </div>


                            <div className='title-container'>
                                <h1 className="title">
                                    Star Wars Reborn <span className="subtitle">All the Star Wars data you‘ve ever wanted!</span>
                                </h1>
                            </div>

                            <div className="death-star">
                                <div className="wrapper">
                                    <div className="lng"></div>
                                    <div className="lng"></div>
                                    <div className="lng"></div>
                                    <div className="lng"></div>
                                    <div className="trench"></div>
                                    <div className="weapon"></div>
                                </div>
                            </div>

                            <div className='card-grid'>
                                {characters.map((char) => (
                                    <div key={char.name} className="character-card">
                                        <div className="image-wrapper">
                                            <img src={char.image} alt={char.name} loading="lazy" decoding="async" />
                                        </div>
                                        <div className="info">
                                            <h2>{char.name}</h2>
                                            <p><strong>Gender:</strong> {normalizeValue(char.gender)}</p>
                                            <p><strong>Height:</strong> {normalizeValue(char.height)}</p>
                                            <p><strong>Mass:</strong> {normalizeValue(char.mass)}</p>
                                            <p><strong>Hair Color:</strong> {normalizeValue(char.hair_color)}</p>
                                            <p><strong>Skin Color:</strong> {normalizeValue(char.skin_color)}</p>
                                            <p><strong>Eye Color:</strong> {normalizeValue(char.eye_color)}</p>
                                            <div className="button-container">
                                                {/* From Uiverse.io by StealthWorm */}
                                                <button type="button" className="btn" onClick={() => {
                                                    setOpen(true);
                                                    setCharacter(char);
                                                }}>
                                                    <strong>See more</strong>
                                                    <div id="container-stars">
                                                        <div id="stars"></div>
                                                    </div>

                                                    <div id="glow">
                                                        <div className="circle"></div>
                                                        <div className="circle"></div>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="pagination-buttons">
                                {page > 1 && (
                                    <button onClick={() => goToPreviousPage()}>
                                        Previous
                                    </button>
                                )}
                                <span style={{ margin: "0 1rem" }}>Page {page}</span>
                                {/* {page < totalPages && ( */}
                                    <button onClick={() => goToNextPage()}>Next</button>
                                {/* )} */}
                            </div>
                            
                        </div>
                    )}
                </div>
                <InfoModal
                    isOpen={open}
                    onClose={() => setOpen(false)}
                    character={character}
                />
            </div>
        </div>
    );
    
}

export default HomePage;