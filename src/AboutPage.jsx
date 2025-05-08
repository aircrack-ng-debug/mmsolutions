import React from 'react';
import { Link } from 'react-router-dom'; // Link für die Navigation zurück importieren

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-black text-white font-sans flex items-center justify-center">
            <div className="text-center p-8">
                <h1 className="text-4xl font-bold mb-4">Über uns</h1>
                <p className="text-neutral-300 text-lg">
                    Hier kommt der Inhalt über M&M Solutions hin.
                    Wir können über unsere Geschichte, Mission, Team etc. sprechen.
                </p>
                {/* Optional: Link zurück zur Startseite */}
                <div className="mt-8">
                    <Link to="/" className="text-cyan-400 hover:underline">Zur Startseite</Link>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
