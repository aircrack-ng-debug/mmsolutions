import React from 'react';
import { Link } from 'react-router-dom'; // Link für die Navigation zurück importieren

// Hinweis: Um die Schriftarten 'Inter' (für den Haupttext) und 'Playfair Display' (für Überschrift/Keywords) zu verwenden,
// füge diese Links in den <head> deiner index.html ein:
// <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
// <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet">


const AboutPage = () => {
    return (
        <div className="min-h-screen bg-black text-white font-sans flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
            {/* Container vergrößert und dynamisch angepasst */}
            <div className="max-w-full sm:max-w-5xl lg:max-w-6xl mx-auto text-center"> {/* max-w-full, sm:max-w-5xl, lg:max-w-6xl hinzugefügt */}
                {/* Überschrift mit Playfair Display Font */}
                <h1 className="text-4xl sm:text-5xl font-bold mb-8 font-playfair"> {/* font-playfair Klasse hinzugefügt */}
                    About <span className="animated-gradient-text">M&M Solutions</span>
                </h1>

                {/* Der gesamte Text in einem Absatz mit hervorgehobenen Keywords */}
                {/* Der gesamte Absatz ist jetzt fett, hat eine größere Grundschriftgröße und ist im Blocksatz ausgerichtet */}
                {/* Der Haupttext verwendet weiterhin font-sans (Inter) */}
                <p className="text-xl sm:text-2xl text-white font-bold leading-relaxed text-justify font-sans"> {/* text-xl sm:text-2xl für größere Grundschrift */}
                    We are Marius and Maurice, two Business Informatics specialists driven by a shared
                    {/* Keywords sind größer, kursiv und unterstrichen, mit minimalem horizontalem Margin und Playfair Display Font */}
                    <span className="text-3xl sm:text-4xl italic underline mx-0.5 font-playfair"> {/* mx-0.5 für minimalen Abstand */}
                        PASSION
                    </span> for Marketing and E-Commerce. Our
                    mission is clear: to empower businesses and help them achieve
                    <span className="text-3xl sm:text-4xl italic underline mx-0.5 font-playfair"> {/* mx-0.5 für minimalen Abstand */}
                        SUCCESS
                    </span> on TikTok Shop. Coming from an Informatics background, we
                    are deeply connected to
                    <span className="text-3xl sm:text-4xl italic underline mx-0.5 font-playfair"> {/* mx-0.5 für minimalen Abstand */}
                        DATA
                    </span> and
                    <span className="text-3xl sm:text-4xl italic underline mx-0.5 font-playfair"> {/* mx-0.5 für minimalen Abstand */}
                        ANALYTICS
                    </span>,
                    which is the secret to our success. We possess the knowledge and skills to leverage data effectively
                    to
                    <span className="text-3xl sm:text-4xl italic underline mx-0.5 font-playfair"> {/* mx-0.5 für minimalen Abstand */}
                        BOOST
                    </span> our clients'
                    <span className="text-3xl sm:text-4xl italic underline mx-0.5 font-playfair"> {/* mx-0.5 für minimalen Abstand */}
                        REVENUE
                    </span> -
                    and we do it with complete transparency. Furthermore, our commitment to working
                    <span className="text-3xl sm:text-4xl italic underline mx-0.5 font-playfair"> {/* mx-0.5 für minimalen Abstand */}
                        FAIRLY
                    </span> and
                    <span className="text-3xl sm:text-4xl italic underline mx-0.5 font-playfair"> {/* mx-0.5 für minimalen Abstand */}
                        RELIABLY
                    </span>
                    sets us apart. We believe in building strong, trustworthy partnerships.
                </p>


                {/* Link zurück zur Startseite */}
                <div className="mt-12">
                    <Link to="/" className="text-cyan-400 hover:underline text-lg font-semibold">Back to Homepage</Link>
                </div>
            </div>
            {/* Inline-Style-Tag für benutzerdefinierte CSS-Animationen (kopiert von App.jsx) */}
            <style>
                {`
          /* Klasse für den animierten Farbverlauf-Texteffekt */
          .animated-gradient-text {
            background: linear-gradient(270deg, #00ffff, #ff00ff, #00ffff);
            background-size: 600% 600%;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shimmer 6s ease infinite;
          }

          /* Keyframes für die Shimmer-Animation */
          @keyframes shimmer {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          /* Definition der Schriftklassen für Tailwind */
          .font-playfair {
              font-family: 'Playfair Display', serif;
          }
          /* font-sans (Inter) ist bereits in tailwind.config.js definiert */
        `}
            </style>
        </div>
    );
};

export default AboutPage;
