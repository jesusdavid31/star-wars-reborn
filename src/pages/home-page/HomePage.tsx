/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

import { useCharacters } from "./hooks/useCharacters"; // importa el hook

// Components
import Galaxy from "../../components/galaxy/Galaxy";

// ESTILOS
import './HomePage.scss';

const HomePage = () => {

    const [page, setPage] = useState(1);

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
        getCharacters(page);
    }, [page]);

    return (
        <div className="home-page">
            <div style={{ width: '100%', height: 'auto', position: 'relative' }}>
                <Galaxy starSpeed={0.2}  speed={0.5} rotationSpeed={0.2} density={0.7} mouseInteraction={false} mouseRepulsion={false} />
                <div className="home-page-container">
                    { loading ? (
                        <div className="spinner">
                            <div className="spinnerin"></div>
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
                                        <img src={char.image} alt={char.name} />
                                        </div>
                                        <div className="info">
                                        <h2>{char.name}</h2>
                                        {/* <p><strong>Species:</strong> {char.species}</p> */}
                                        <p><strong>Gender:</strong> {char.gender}</p>
                                        <p><strong>Height:</strong> {char.height}</p>
                                        <p><strong>Mass:</strong> {char.mass}</p>
                                        <p><strong>Hair Color:</strong> {char.hair_color}</p>
                                        <p><strong>Skin Color:</strong> {char.skin_color}</p>
                                        <p><strong>Eye Color:</strong> {char.eye_color}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="pagination-buttons">
                                <button onClick={() => goToPreviousPage()}>
                                Anterior
                                </button>
                                <span style={{ margin: "0 1rem" }}>Página {page}</span>
                                <button onClick={() => goToNextPage()}>Siguiente</button>
                            </div>
                            
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
    
}

export default HomePage;