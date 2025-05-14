import React from 'react';
import { Link } from 'react-router-dom';

// Für einen authentischeren "digitalen" Look könntest du eine Monospace-Schriftart importieren.
// Z.B. in deiner index.html: <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Press+Start+2P&display=swap" rel="stylesheet">
// Und dann in Tailwind Config erweitern oder direkt im CSS verwenden.
// Für dieses Beispiel verwenden wir die Standard-Sans-Serif-Schrift von Tailwind und Monospace-Fallback.

const AboutPage = () => {
    const textParagraphs = [
        "We are Marius and Maurice, two Business Informatics specialists driven by a shared PASSION for Marketing and E-Commerce.",
        "Our mission is clear: to empower businesses and help them achieve SUCCESS on TikTok Shop. Coming from an Informatics background, we are deeply connected to DATA and ANALYTICS, which is the secret to our success.",
        "We possess the knowledge and skills to leverage data effectively to BOOST our clients' REVENUE - and we do it with complete transparency.",
        "Furthermore, our commitment to working FAIRLY and RELIABLY sets us apart. We believe in building strong, trustworthy partnerships."
    ];

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <style>
                {`
                @keyframes flicker {
                    0%, 18%, 22%, 25%, 53%, 57%, 100% {
                        opacity: 1;
                        text-shadow:
                            0 0 4px #00aeff,
                            0 0 10px #00aeff,
                            0 0 20px #00aeff,
                            0 0 40px #0077ff,
                            0 0 80px #0077ff;
                    }
                    20%, 24%, 55% {
                        opacity: 0.6;
                        text-shadow: none;
                    }
                }

                @keyframes glitch-line {
                    0% { transform: translateY(-2px) scaleY(1.02); }
                    10% { transform: translateY(1px) scaleY(1); }
                    20% { transform: translateY(-1px) scaleY(1.01); }
                    30% { transform: translateY(2px) scaleY(0.99); }
                    40% { transform: translateY(-2px) scaleY(1); }
                    50% { transform: translateY(0px) scaleY(1.02); }
                    60% { transform: translateY(1px) scaleY(0.98); }
                    70% { transform: translateY(-1px) scaleY(1); }
                    80% { transform: translateY(2px) scaleY(1.01); }
                    90% { transform: translateY(-1px) scaleY(0.99); }
                    100% { transform: translateY(0px) scaleY(1); }
                }
                
                @keyframes scanline {
                    0% { background-position: 0 0; }
                    100% { background-position: 0 100px; } /* Adjust 100px for scanline speed/density */
                }

                .hologram-text-container {
                    perspective: 800px; /* Für den 3D-Effekt des Textes */
                    width: 100%;
                    max-width: 700px; /* Breite des Hologramms */
                }

                .hologram-text {
                    font-family: 'Orbitron', 'Press Start 2P', monospace, sans-serif; /* Spezifische Sci-Fi/Pixel Schriftarten */
                    color: #00d9ff; /* Helles Cyan */
                    font-size: clamp(0.9rem, 2.5vw, 1.25rem); /* Responsive Schriftgröße */
                    line-height: 1.8;
                    text-align: justify;
                    transform: rotateX(15deg) rotateY(-3deg) skewX(-3deg); /* Leichte 3D-Perspektive */
                    animation: flicker 3s infinite linear;
                    position: relative; /* Für Pseudo-Elemente (Scanlines, Glitch) */
                    padding: 20px;
                    border: 1px solid rgba(0, 217, 255, 0.2);
                    box-shadow: 0 0 15px rgba(0, 217, 255, 0.3), inset 0 0 10px rgba(0, 217, 255, 0.2);
                    background-color: rgba(0, 25, 50, 0.1); /* Sehr dunkler, leicht bläulicher Hintergrund */
                }

                .hologram-text::before { /* Scanlines */
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-image: linear-gradient(
                        0deg,
                        transparent 50%,
                        rgba(0, 174, 255, 0.1) 50%
                    );
                    background-size: 100% 4px; /* Dicke der Scanlines */
                    animation: scanline 0.2s linear infinite;
                    pointer-events: none;
                    z-index: 1;
                }
                
                .hologram-paragraph {
                    margin-bottom: 1.5em;
                    animation: glitch-line 7s infinite steps(1, end); /* Steps für abgehackten Glitch */
                }
                .hologram-paragraph:nth-child(2n) {
                    animation-delay: -0.3s; /* Verschiedene Delays für unregelmäßigen Glitch */
                }
                 .hologram-paragraph:nth-child(3n) {
                    animation-delay: -0.7s;
                }


                .hologram-title {
                    font-size: clamp(1.8rem, 5vw, 2.8rem);
                    color: #fff;
                    text-shadow: 0 0 5px #00aeff, 0 0 15px #00aeff, 0 0 30px #00aeff;
                    margin-bottom: 1.5em;
                    text-align: center;
                    font-weight: 700;
                    letter-spacing: 0.1em;
                }

                .back-link-hologram {
                    margin-top: 40px;
                    padding: 10px 20px;
                    color: #00d9ff;
                    border: 1px solid #00d9ff;
                    border-radius: 4px;
                    text-decoration: none;
                    font-family: 'Orbitron', 'Press Start 2P', monospace, sans-serif;
                    transition: all 0.3s ease;
                    box-shadow: 0 0 5px #00d9ff, inset 0 0 3px #00d9ff;
                }
                .back-link-hologram:hover {
                    background-color: rgba(0, 217, 255, 0.2);
                    color: #fff;
                    box-shadow: 0 0 15px #00d9ff, inset 0 0 8px #00d9ff;
                    text-shadow: 0 0 5px #fff;
                }

                /* Optional: Basis für das Hologramm (vereinfacht) */
                .hologram-base {
                    width: 200px;
                    height: 20px;
                    background-color: #1a2c3a;
                    margin: 0 auto 5px auto; /* Abstand zum Text */
                    border-radius: 50% / 100%;
                    border-bottom-left-radius: 0;
                    border-bottom-right-radius: 0;
                    box-shadow: 0 0 10px #00aeff;
                    position: relative;
                }
                .hologram-base::before { /* Leuchteffekt der Basis */
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 80px;
                    height: 80px;
                    background: radial-gradient(circle, rgba(0,174,255,0.5) 0%, rgba(0,174,255,0) 60%);
                    transform: translate(-50%, -80%); /* Positioniert das Licht über der Basis */
                    filter: blur(5px);
                }

                `}
            </style>

            <div className="hologram-text-container">
                {/* Optionale Hologramm-Basis */}
                {/* <div className="hologram-base"></div> */}

                <div className="hologram-text">
                    <h1 className="hologram-title">ABOUT US</h1>
                    {textParagraphs.map((paragraph, index) => (
                        <p key={index} className="hologram-paragraph">
                            {paragraph.split(' ').map((word, wordIndex) => {
                                const isUpperCase = word === word.toUpperCase() && word.length > 2; // Hebt nur längere Wörter in Großbuchstaben hervor
                                return (
                                    <span key={wordIndex} className={isUpperCase ? 'font-bold text-cyan-300' : ''}>
                                        {word}{' '}
                                    </span>
                                );
                            })}
                        </p>
                    ))}
                </div>
            </div>

            <Link to="/" className="back-link-hologram">
                Back to Homepage
            </Link>

            <footer className="mt-12 text-center">
                <p className="text-neutral-600 text-xs" style={{ fontFamily: "monospace" }}>
                    © {new Date().getFullYear()} MM Solutions. Transmission End.
                </p>
            </footer>
        </div>
    );
};

export default AboutPage;
