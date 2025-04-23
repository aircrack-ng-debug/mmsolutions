import React, { useState, useEffect, useRef } from "react"; // useState, useEffect, useRef importiert

// Mock Button Komponente (Platzhalter)
const Button = ({ className, children, ...props }) => (
    // Grundlegendes Button-Styling mit Tailwind-Klassen
    <button className={`px-4 py-2 rounded ${className}`} {...props}>
        {children}
    </button>
);

// Mock Icon Komponenten (Platzhalter)
const MockIcon = ({ className }) => <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
const PlayIcon = ({ className }) => <MockIcon className={className} />;
const ShoppingBag = ({ className }) => <MockIcon className={className} />;
const Link2 = ({ className }) => <MockIcon className={className} />;
const DollarSign = ({ className }) => <MockIcon className={className} />;
// Mock Icon für das neue Dashboard (Chart/Trending Up)
const TrendingUpIcon = ({ className }) => (
    <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);


// Hauptkomponente HomePage
export default function HomePage() {
    // URL für das Frame-Hintergrundbild
    const frameBgUrl = "https://raw.githubusercontent.com/aircrack-ng-debug/Imagehosting/refs/heads/main/frame_edit.png";

    // Zustand für die Sichtbarkeit des Performance-Abschnitts
    const [isPerformanceVisible, setIsPerformanceVisible] = useState(false);
    // Ref für das Element, das beobachtet werden soll
    const performanceSectionRef = useRef(null);

    // Effekt zum Einrichten des Intersection Observers
    useEffect(() => {
        const sectionElement = performanceSectionRef.current; // Das DOM-Element holen

        // Callback-Funktion für den Observer
        const observerCallback = (entries) => {
            const [entry] = entries; // Wir beobachten nur ein Element
            if (entry.isIntersecting) {
                setIsPerformanceVisible(true); // Zustand auf sichtbar setzen
                observer.unobserve(sectionElement); // Beobachtung beenden, nachdem es sichtbar wurde
            }
        };

        // Observer-Optionen (z.B. wann der Callback ausgelöst wird)
        const observerOptions = {
            root: null, // Beobachtet im Verhältnis zum Viewport
            rootMargin: '0px',
            threshold: 0.1 // Auslösen, wenn 10% des Elements sichtbar sind
        };

        // Observer erstellen
        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Element beobachten, wenn es existiert
        if (sectionElement) {
            observer.observe(sectionElement);
        }

        // Cleanup-Funktion: Beobachtung beenden, wenn Komponente unmounted wird
        return () => {
            if (sectionElement) {
                observer.unobserve(sectionElement);
            }
        };
    }, []); // Leeres Abhängigkeitsarray, damit der Effekt nur einmal beim Mounten läuft


    return (
        // Hauptcontainer: volle Höhe, schwarzer Hintergrund, weißer Text, Sans-Serif-Schriftart
        <div className="min-h-screen bg-black text-white font-sans">
            {/* Inline-Style-Tag für benutzerdefinierte CSS-Animationen */}
            <style>
                {`
          /* Klasse für den animierten Farbverlauf-Texteffekt */
          .animated-gradient-text {
            background: linear-gradient(270deg, #00ffff, #ff00ff, #00ffff); /* Farbverlauf: Cyan zu Magenta und zurück */
            background-size: 600% 600%; /* Größere Hintergrundgröße für flüssige Animation */
            -webkit-background-clip: text; /* Hintergrund auf Textform clippen (für WebKit-Browser) */
            background-clip: text; /* Standard-Clipping-Eigenschaft */
            -webkit-text-fill-color: transparent; /* Textfarbe transparent machen, damit Hintergrund durchscheint */
            animation: shimmer 6s ease infinite; /* Shimmer-Animation anwenden: 6s Dauer, Ease-Timing, Endlosschleife */
          }

          /* Keyframes für die Shimmer-Animation */
          @keyframes shimmer {
            0% { background-position: 0% 50%; } /* Startposition des Farbverlaufs */
            50% { background-position: 100% 50%; } /* Endposition des Farbverlaufs */
            100% { background-position: 0% 50%; } /* Zurück zum Start für nahtlose Schleife */
          }
        `}
            </style>

            {/* Header Section */}
            {/* Relative Positionierung, Padding unten für die Linie */}
            <div className="relative flex justify-between items-center pt-10 pb-10 px-4 sm:px-6 lg:px-8">
                {/* Logo/Markenname */}
                <h1 className="text-white text-2xl font-bold">M&M <span className="text-neutral-400">SOLUTIONS</span></h1>
                {/* Get Started Button */}
                <Button className="bg-neutral-800 text-white hover:bg-neutral-700">Get Started</Button>

                {/* Gradient-Trennlinie */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-black/0 via-neutral-500/60 to-black/0"></div>
            </div>

            {/* Hero und Bild Sektion */}
            {/* Relativer Container, Höhe 80vh */}
            <div
                className="relative h-[80vh] mb-20" // Höhe auf 80vh
            >
                {/* Waves Bild Section */}
                <img
                    src="https://raw.githubusercontent.com/aircrack-ng-debug/Imagehosting/refs/heads/main/Waves.png"
                    alt="Waves Banner"
                    className="absolute inset-0 w-full h-full object-cover z-0 opacity-40" // Deckkraft auf 40% reduziert
                    onError={(e) => {
                        // Fallback, falls Bild nicht lädt
                        e.target.onerror = null;
                        e.target.src="https://placehold.co/1920x1080/000000/333333?text=Bild+Ladefehler"; // Platzhalterbild
                        e.target.alt="Platzhalter Banner";
                    }}
                />

                {/* Hero Text Section */}
                <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 flex flex-col justify-start items-center h-full pt-32">
                    {/* Hauptüberschrift - Größe erhöht */}
                    <h1 className="text-7xl font-bold">M&M Solutions</h1>
                    {/* Unterüberschrift - Größe erhöht */}
                    <h2 className="text-3xl mt-4 animated-gradient-text">Your Partner for professional E-Commerce Marketing</h2>
                    {/* Learn More Button Container */}
                    <div className="mt-8">
                        <Button className="bg-neutral-800 hover:bg-neutral-700">Learn More</Button>
                    </div>
                </div>
            </div>

            {/* Neuer Abschnitt: Performance Fokus */}
            {/* Äußerer Container mit vertikalem Padding */}
            {/* Ref und Animationsklassen hinzugefügt */}
            <div
                ref={performanceSectionRef} // Ref hier binden
                className={`py-20 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out ${ // Basisklassen + Transition
                    isPerformanceVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10' // Bedingte Klassen für Animation
                }`}
            >
                {/* Grid-Container mit Frame-Hintergrund und Innen-Padding */}
                <div
                    className="relative md:grid md:grid-cols-2 md:gap-16 items-center max-w-6xl mx-auto p-16" // Padding hinzugefügt (p-16)
                    style={{
                        backgroundImage: `url('${frameBgUrl}')`,
                        backgroundSize: '100% 100%', // Streckt das Bild auf die Containergröße
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    {/* Linke Spalte: Text */}
                    {/* mb-0 entfernt, da Abstand durch Grid-Gap und Padding geregelt wird */}
                    <div className="mb-10 md:mb-0">
                        {/* Titel jetzt mit Icon */}
                        <div className="flex items-center gap-3 mb-4"> {/* Wrapper für Icon und H2 */}
                            <TrendingUpIcon className="text-cyan-400 w-8 h-8 flex-shrink-0" /> {/* Icon hier eingefügt */}
                            <h2 className="text-4xl font-bold">Drive Real Results</h2> {/* mb-4 zum Wrapper verschoben */}
                        </div>
                        <p className="text-neutral-300 text-lg mb-6">
                            We focus on performance marketing that delivers measurable revenue growth.
                            Our strategies are optimized for conversion and a clear ROI for your business.
                        </p>
                        {/* Optional: Button hinzufügen */}
                        {/* <Button className="bg-white text-black hover:bg-neutral-200 font-semibold">Explore Performance</Button> */}
                    </div>

                    {/* Rechte Spalte: Dashboard-Inhalt */}
                    {/* Styling (Padding, Rand, Hintergrund, Rundung) entfernt, da der äußere Container den Frame bildet */}
                    <div>
                        {/* Titel zentriert */}
                        {/* Padding (px-8) entfernt */}
                        <div className="relative z-10 flex justify-center mb-1">
                            <h3 className="text-xl font-semibold">Measurable Revenue Boost</h3>
                        </div>

                        {/* Container für Bild */}
                        {/* Padding (px-6) entfernt */}
                        <div className="relative">
                            {/* Performance Bild */}
                            <img
                                src="https://raw.githubusercontent.com/aircrack-ng-debug/Imagehosting/refs/heads/main/p_dashboard.png" // Bild ohne transparenten Rand
                                alt="Performance Dashboard Graphic without border"
                                className="w-full rounded-lg" // Nimmt die Breite des Containers ein
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://placehold.co/600x400/171717/525252?text=Performance+Graphic"; // Dunklerer Platzhalter
                                    e.target.alt = "Placeholder for Performance Graphic";
                                }}
                            />
                        </div>
                        {/* Subtext */}
                        <p className="text-center text-neutral-400 text-sm mt-2 whitespace-nowrap">
                            Focus on Conversion & ROI
                        </p>
                    </div>
                </div>
            </div>


            {/* Features Section (Bestehender Abschnitt) */}
            {/* Margin Top hinzugefügt für Abstand zum neuen Abschnitt */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-white px-4 sm:px-6 lg:px-8 mt-20">
                {/* Feature 1: Content Creation */}
                <div className="bg-neutral-900 p-6 rounded-xl flex items-start gap-4 hover:bg-neutral-800 transition-colors duration-300">
                    <PlayIcon className="text-cyan-400 mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-xl mb-1">Content Creation</h3>
                        <p className="text-neutral-400">We produce engaging TikTok videos to showcase products.</p>
                    </div>
                </div>

                {/* Feature 2: Product Selection */}
                <div className="bg-neutral-900 p-6 rounded-xl flex items-start gap-4 hover:bg-neutral-800 transition-colors duration-300">
                    <ShoppingBag className="text-cyan-400 mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-xl mb-1">Product Selection</h3>
                        <p className="text-neutral-400">We choose relevant products from the TikTok Shop marketplace.</p>
                    </div>
                </div>

                {/* Feature 3: Tracking */}
                <div className="bg-neutral-900 p-6 rounded-xl flex items-start gap-4 hover:bg-neutral-800 transition-colors duration-300">
                    <Link2 className="text-cyan-400 mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-xl mb-1">Tracking</h3>
                        <p className="text-neutral-400">We use affiliate links to track clicks and sales.</p>
                    </div>
                </div>

                {/* Feature 4: Performance-Based */}
                <div className="bg-neutral-900 p-6 rounded-xl flex items-start gap-4 hover:bg-neutral-800 transition-colors duration-300">
                    <DollarSign className="text-cyan-400 mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-xl mb-1">Performance-Based</h3>
                        <p className="text-neutral-400">We earn commissions on the sales we generate.</p>
                    </div>
                </div>
            </div>

            {/* Call to Action Section */}
            {/* Padding für Einrückung */}
            <div className="text-center mt-20 mb-10 px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold">Drive Sales on TikTok</h2>
                <p className="mt-2 text-neutral-400">Partner with us to promote your products</p>
                <Button className="mt-6 bg-white text-black hover:bg-neutral-200 font-semibold">Get Started</Button>
            </div>

            {/* Footer Section */}
            {/* Padding für Einrückung */}
            <footer className="text-center mt-20 pt-10 border-t border-neutral-800 px-4 sm:px-6 lg:px-8 pb-10">
                <p className="text-neutral-500 text-sm">&copy; {new Date().getFullYear()} M&M Solutions. All rights reserved.</p>
                {/* Fügen Sie hier Social-Media-Links oder andere Footer-Inhalte hinzu */}
            </footer>

        </div>
    );
}
