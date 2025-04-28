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
const ShoppingBag = ({ className }) => ( // ShoppingBag Icon (Platzhalter)
    <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
);
// Mock Icon für Performance Dashboard (Chart/Trending Up)
const TrendingUpIcon = ({ className }) => (
    <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);
// Mock Icon für Creator Partnership (Users)
const UsersIcon = ({ className }) => (
    <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M12 7a4 4 0 110-5.292A4 4 0 0112 7z" />
    </svg>
);


// Hilfsfunktion für Intersection Observer Logik
const useIntersectionObserver = (options) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const currentElement = elementRef.current; // Kopie für Cleanup
        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(currentElement); // Beobachtung stoppen
            }
        }, options);

        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [options]); // Abhängigkeit von Optionen

    return [elementRef, isVisible];
};


// Hauptkomponente HomePage
export default function HomePage() {
    // URL für das Frame-Hintergrundbild (Abschnitt 1 & 3)
    const frameBgUrl = "https://raw.githubusercontent.com/aircrack-ng-debug/Imagehosting/refs/heads/main/frame_edit.png";
    // URL für das zweite Frame-Hintergrundbild (Abschnitt 2)
    const frameBgUrl2 = "https://raw.githubusercontent.com/aircrack-ng-debug/Imagehosting/refs/heads/main/frame_edit_2.png";
    // URL für das Logo
    const logoUrl = "https://raw.githubusercontent.com/aircrack-ng-debug/Imagehosting/refs/heads/main/Logo_mm_solutions.png";


    // Observer-Optionen für alle Abschnitte
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Auslösen, wenn 10% sichtbar sind
    };

    // Intersection Observer für Performance-Abschnitt
    const [performanceSectionRef, isPerformanceVisible] = useIntersectionObserver(observerOptions);
    // Intersection Observer für TikTok-Abschnitt
    const [tiktokSectionRef, isTikTokVisible] = useIntersectionObserver(observerOptions);
    // Intersection Observer für Creator-Abschnitt
    const [creatorSectionRef, isCreatorVisible] = useIntersectionObserver(observerOptions);

    // State für das Kontaktformular
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        userType: '', // 'seller' or 'creator'
        tiktokHandle: '',
        websiteOrTiktok: '', // Kombiniertes Feld für Seller
        message: ''
    });
    const [submissionStatus, setSubmissionStatus] = useState(null); // 'submitting', 'success', 'error', null

    // Handler für Änderungen in den Formularfeldern
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handler für Änderungen bei den Radio-Buttons
    const handleUserTypeChange = (e) => {
        const newUserType = e.target.value;
        setFormData(prevState => ({
            ...prevState,
            userType: newUserType,
            // Felder zurücksetzen, wenn Typ geändert wird
            tiktokHandle: newUserType === 'seller' ? '' : prevState.tiktokHandle,
            websiteOrTiktok: newUserType === 'creator' ? '' : prevState.websiteOrTiktok
        }));
    };

    // Handler für das Absenden des Formulars mit Fetch
    const handleSubmit = async (e) => {
        e.preventDefault(); // Standard-Submit verhindern
        setSubmissionStatus('submitting'); // Status auf "sendet" setzen

        // Daten für Formspree vorbereiten (nur relevante Felder senden)
        const dataToSend = { ...formData };
        if (formData.userType === 'creator') {
            delete dataToSend.websiteOrTiktok; // Entferne leeres Seller-Feld
        } else if (formData.userType === 'seller') {
            delete dataToSend.tiktokHandle; // Entferne leeres Creator-Feld
        }

        try {
            const response = await fetch("https://formspree.io/f/mrbqbvvl", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json', // Wichtig für AJAX-Verarbeitung durch Formspree
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend) // Daten als JSON senden
            });

            if (response.ok) {
                setSubmissionStatus('success'); // Status auf Erfolg setzen
                // Formular zurücksetzen
                setFormData({ name: '', email: '', userType: '', tiktokHandle: '', websiteOrTiktok: '', message: '' });
                // Nach 2 Sekunden Status zurücksetzen, um Formular wieder anzuzeigen
                setTimeout(() => {
                    setSubmissionStatus(null);
                }, 2000); // 2000 Millisekunden = 2 Sekunden
            } else {
                // Versuchen, die Fehlermeldung von Formspree zu bekommen
                const errorData = await response.json();
                throw new Error(errorData.errors ? errorData.errors.map(err => err.message).join(', ') : 'Fehler beim Senden.');
            }
        } catch (error) {
            setSubmissionStatus('error');
            console.error("Fehler beim Senden des Formulars:", error);
            alert(`Fehler beim Senden: ${error.message}`); // Fehlermeldung anzeigen (könnte auch im UI sein)
            // Status zurücksetzen, damit Nutzer es erneut versuchen kann
            setTimeout(() => {
                setSubmissionStatus(null);
            }, 3000);
        }
    };


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

          /* --- CSS für Logo-Würfel-Animation --- */
          .logo-cube-container {
            perspective: 1000px; /* Perspektive für 3D-Effekt */
            width: 50px; /* Breite anpassen */
            height: 30px; /* Höhe anpassen */
          }

          .logo-cube {
            width: 100%;
            height: 100%;
            position: relative;
            transform-style: preserve-3d;
            animation: rotateCube 5s infinite ease-in-out; /* Animation anwenden */
          }

          .logo-cube-face {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden; /* Rückseite nicht anzeigen */
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem; /* 2xl */
            font-weight: bold;
          }

          .logo-cube-front {
            /* Vorderseite (Logo) */
            transform: translateZ(15px); /* Halbe Höhe nach vorne */
          }

          .logo-cube-back {
            /* Rückseite (Text) */
            transform: rotateY(180deg) translateZ(15px); /* Um 180 Grad drehen und nach "vorne" (jetzt hinten) */
            color: white; /* Textfarbe */
          }

          .logo-cube-face img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
          }

          /* Keyframes für die Würfelrotation */
          @keyframes rotateCube {
            0%, 40% { /* Startposition, 2s Pause */
              transform: translateZ(-15px) rotateY(0deg);
            }
            50%, 90% { /* Drehen, 2s Pause */
              transform: translateZ(-15px) rotateY(-180deg);
            }
            100% { /* Zurückdrehen */
              transform: translateZ(-15px) rotateY(-360deg);
            }
          }
          /* --- Ende CSS für Logo-Würfel-Animation --- */
        `}
            </style>

            {/* Header Section */}
            {/* Relative Positionierung, Padding unten für die Linie */}
            <div className="relative flex justify-between items-center pt-10 pb-10 px-4 sm:px-6 lg:px-8">
                {/* Logo/Markenname Container mit Animation */}
                <div className="flex items-center gap-2"> {/* Flex Container für Würfel und "SOLUTIONS" */}
                    <div className="logo-cube-container">
                        <div className="logo-cube">
                            <div className="logo-cube-face logo-cube-front">
                                <img src={logoUrl} alt="M&M Logo" />
                            </div>
                            <div className="logo-cube-face logo-cube-back">
                                M&M
                            </div>
                        </div>
                    </div>
                    <span className="text-2xl font-bold text-neutral-400">SOLUTIONS</span> {/* "SOLUTIONS" daneben */}
                </div>

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

            {/* Abschnitt 1: Performance Fokus */}
            {/* Äußerer Container mit vertikalem Padding */}
            {/* Ref und Animationsklassen hinzugefügt */}
            <div
                ref={performanceSectionRef} // Ref für diesen Abschnitt
                className={`py-10 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out ${ // Basisklassen + Transition, py-20 zu py-10 geändert
                    isPerformanceVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10' // Bedingte Klassen für Animation
                }`}
            >
                {/* Grid-Container mit Frame-Hintergrund und Innen-Padding */}
                <div
                    className="relative md:grid md:grid-cols-2 md:gap-16 items-center max-w-6xl mx-auto p-16" // Padding hinzugefügt (p-16)
                    style={{
                        backgroundImage: `url('${frameBgUrl}')`, // Erstes Frame-Bild
                        backgroundSize: '100% 100%', // Streckt das Bild auf die Containergröße
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    {/* Linke Spalte: Text */}
                    <div className="mb-10 md:mb-0">
                        {/* Titel mit Icon */}
                        <div className="flex items-center gap-3 mb-4">
                            <TrendingUpIcon className="text-cyan-400 w-8 h-8 flex-shrink-0" />
                            <h2 className="text-4xl font-bold">Drive Real Results</h2>
                        </div>
                        <p className="text-neutral-300 text-lg mb-6">
                            We focus on performance marketing that delivers measurable revenue growth.
                            Our strategies are optimized for conversion and a clear ROI for your business.
                        </p>
                        {/* Optional: Button hinzufügen */}
                        {/* <Button className="bg-white text-black hover:bg-neutral-200 font-semibold">Explore Performance</Button> */}
                    </div>

                    {/* Rechte Spalte: Dashboard-Inhalt */}
                    <div>
                        {/* Titel zentriert */}
                        <div className="relative z-10 flex justify-center mb-1">
                            <h3 className="text-xl font-semibold">Measurable Revenue Boost</h3>
                        </div>

                        {/* Container für Bild */}
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

            {/* Abschnitt 2: TikTok Shop Fokus */}
            {/* Äußerer Container mit vertikalem Padding */}
            {/* Ref und Animationsklassen hinzugefügt */}
            <div
                ref={tiktokSectionRef} // Ref für diesen Abschnitt
                className={`py-10 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out ${ // Basisklassen + Transition, py-20 zu py-10 geändert
                    isTikTokVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10' // Bedingte Klassen für Animation
                }`}
            >
                {/* Grid-Container mit Frame-Hintergrund und Innen-Padding */}
                <div
                    className="relative md:grid md:grid-cols-2 md:gap-16 items-center max-w-6xl mx-auto p-16" // Padding hinzugefügt (p-16)
                    style={{
                        backgroundImage: `url('${frameBgUrl2}')`, // NEUES Frame-Bild für diesen Abschnitt
                        backgroundSize: '100% 100%', // Streckt das Bild auf die Containergröße
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    {/* Linke Spalte: Text */}
                    <div className="mb-10 md:mb-0">
                        {/* Titel mit Icon */}
                        <div className="flex items-center gap-3 mb-4">
                            <ShoppingBag className="text-cyan-400 w-8 h-8 flex-shrink-0" /> {/* Icon geändert */}
                            <h2 className="text-4xl font-bold">TikTok Shop Experts</h2> {/* Titel geändert */}
                        </div>
                        <p className="text-neutral-300 text-lg mb-6">
                            We specialize in TikTok Shop, leveraging seamless integration for direct conversions.
                            Tap into this rapidly growing platform with our targeted strategies.
                        </p> {/* Text geändert */}
                        {/* Optional: Button hinzufügen */}
                        {/* <Button className="bg-white text-black hover:bg-neutral-200 font-semibold">Explore TikTok Shop</Button> */}
                    </div>

                    {/* Rechte Spalte: Dashboard-Inhalt */}
                    <div>
                        {/* Titel zentriert */}
                        <div className="relative z-10 flex justify-center mb-1">
                            <h3 className="text-xl font-semibold">Seamless TikTok Integration</h3> {/* Titel geändert */}
                        </div>

                        {/* Container für Bild */}
                        <div className="relative">
                            {/* NEUES Bild für TikTok Shop */}
                            <img
                                src="https://raw.githubusercontent.com/aircrack-ng-debug/Imagehosting/refs/heads/main/Seemless.png" // NEUE Bild-URL
                                alt="Seamless TikTok Shop Integration Graphic" // Alt-Text angepasst
                                className="w-full rounded-lg" // Nimmt die Breite des Containers ein
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://placehold.co/600x400/171717/525252?text=TikTok+Shop+Graphic"; // Platzhalter
                                    e.target.alt = "Placeholder for TikTok Shop Graphic";
                                }}
                            />
                        </div>
                        {/* Subtext */}
                        <p className="text-center text-neutral-400 text-sm mt-2 whitespace-nowrap">
                            Direct Sales on a Booming Platform {/* Subtext geändert */}
                        </p>
                    </div>
                </div>
            </div>

            {/* Abschnitt 3: Creator Partnership */}
            {/* Äußerer Container mit vertikalem Padding */}
            {/* Ref und Animationsklassen hinzugefügt */}
            <div
                ref={creatorSectionRef} // Ref für diesen Abschnitt
                className={`py-10 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ease-out ${ // Basisklassen + Transition
                    isCreatorVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10' // Bedingte Klassen für Animation
                }`}
            >
                {/* Grid-Container mit Frame-Hintergrund und Innen-Padding */}
                <div
                    className="relative md:grid md:grid-cols-2 md:gap-16 items-center max-w-6xl mx-auto p-16" // Padding hinzugefügt (p-16)
                    style={{
                        backgroundImage: `url('${frameBgUrl}')`, // Erstes Frame-Bild wiederverwenden
                        backgroundSize: '100% 100%', // Streckt das Bild auf die Containergröße
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    {/* Linke Spalte: Text */}
                    <div className="mb-10 md:mb-0">
                        {/* Titel mit Icon */}
                        <div className="flex items-center gap-3 mb-4">
                            <UsersIcon className="text-cyan-400 w-8 h-8 flex-shrink-0" /> {/* Icon geändert */}
                            <h2 className="text-4xl font-bold">Empowering Creators</h2> {/* Titel geändert */}
                        </div>
                        <p className="text-neutral-300 text-lg mb-6">
                            We build strong, transparent partnerships with creators. Benefit from fair commission structures and dedicated support to grow your influence and earnings.
                        </p> {/* Text geändert */}
                        {/* Optional: Button hinzufügen */}
                        {/* <Button className="bg-white text-black hover:bg-neutral-200 font-semibold">Become a Partner</Button> */}
                    </div>

                    {/* Rechte Spalte: Dashboard-Inhalt */}
                    <div>
                        {/* Titel zentriert */}
                        <div className="relative z-10 flex justify-center mb-1">
                            <h3 className="text-xl font-semibold">Fair & Supportive Partnership</h3> {/* Titel geändert */}
                        </div>

                        {/* Container für Bild */}
                        <div className="relative">
                            {/* NEUES Bild für Creator Partnership */}
                            <img
                                src="https://raw.githubusercontent.com/aircrack-ng-debug/Imagehosting/refs/heads/main/fair%26supportive.png" // NEUE Bild-URL
                                alt="Fair and Supportive Creator Partnership Graphic" // Alt-Text angepasst
                                className="w-full rounded-lg" // Nimmt die Breite des Containers ein
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://placehold.co/600x400/171717/525252?text=Creator+Graphic"; // Platzhalter
                                    e.target.alt = "Placeholder for Creator Graphic";
                                }}
                            />
                        </div>
                        {/* Subtext */}
                        <p className="text-center text-neutral-400 text-sm mt-2 whitespace-nowrap">
                            Grow Together with Transparent Collaboration {/* Subtext geändert */}
                        </p>
                    </div>
                </div>
            </div>


            {/* === Features Section entfernt === */}


            {/* Neuer Abschnitt: Kontaktformular */}
            <div className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto relative min-h-[500px]"> {/* Relative Position & Mindesthöhe für Platz */}
                    <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>

                    {/* Thank You Message Container */}
                    {/* Bedingte Klassen für Sichtbarkeit und Positionierung */}
                    <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out pointer-events-none ${ // pointer-events-none hinzugefügt
                        submissionStatus === 'success' ? 'opacity-100 z-20' : 'opacity-0 hidden' // hidden hinzugefügt, wenn nicht success
                    }`}>
                        <h3 className="text-4xl font-bold animated-gradient-text text-center">
                            Thank You!
                        </h3>
                    </div>

                    {/* Formular Container */}
                    {/* Bedingte Klassen für Sichtbarkeit */}
                    <div className={`transition-opacity duration-500 ease-in-out ${
                        submissionStatus === 'success' ? 'opacity-0 invisible' : 'opacity-100 visible' // invisible/visible hinzugefügt
                    }`}>
                        <form
                            onSubmit={handleSubmit} // onSubmit Handler hinzugefügt
                            className="space-y-6"
                        >
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name" // Name-Attribut ist wichtig
                                    id="name"
                                    required
                                    value={formData.name} // value hinzugefügt
                                    onChange={handleInputChange} // onChange hinzugefügt
                                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                                    placeholder="Ihr Name"
                                    disabled={submissionStatus === 'submitting'} // Deaktivieren während Senden
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email" // Name-Attribut ist wichtig
                                    id="email"
                                    required
                                    value={formData.email} // value hinzugefügt
                                    onChange={handleInputChange} // onChange hinzugefügt
                                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                                    placeholder="Ihre Email-Adresse"
                                    disabled={submissionStatus === 'submitting'}
                                />
                            </div>

                            {/* User Type (Radio Buttons) */}
                            <fieldset disabled={submissionStatus === 'submitting'}>
                                <legend className="block text-sm font-medium text-neutral-300 mb-2">Ich bin...</legend>
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center">
                                        <input
                                            id="creator"
                                            name="userType" // Gleicher Name für Radio-Gruppe
                                            type="radio"
                                            value="creator"
                                            checked={formData.userType === 'creator'} // State für bedingte Anzeige & Wert
                                            onChange={handleUserTypeChange} // State aktualisieren
                                            className="h-4 w-4 text-cyan-600 border-neutral-600 focus:ring-cyan-500"
                                        />
                                        <label htmlFor="creator" className="ml-2 block text-sm text-neutral-300">Creator</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="seller"
                                            name="userType" // Gleicher Name für Radio-Gruppe
                                            type="radio"
                                            value="seller"
                                            checked={formData.userType === 'seller'} // State für bedingte Anzeige & Wert
                                            onChange={handleUserTypeChange} // State aktualisieren
                                            className="h-4 w-4 text-cyan-600 border-neutral-600 focus:ring-cyan-500"
                                        />
                                        <label htmlFor="seller" className="ml-2 block text-sm text-neutral-300">Seller</label>
                                    </div>
                                </div>
                            </fieldset>

                            {/* Conditional Field: TikTok Handle (for Creator) */}
                            {formData.userType === 'creator' && (
                                <div>
                                    <label htmlFor="tiktokHandle" className="block text-sm font-medium text-neutral-300 mb-1">TikTok @</label>
                                    <input
                                        type="text"
                                        name="tiktokHandle" // Name-Attribut
                                        id="tiktokHandle"
                                        required
                                        value={formData.tiktokHandle} // value hinzugefügt
                                        onChange={handleInputChange} // onChange hinzugefügt
                                        className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                                        placeholder="Ihr TikTok @ Name"
                                        disabled={submissionStatus === 'submitting'}
                                    />
                                </div>
                            )}

                            {/* Conditional Field: TikTok Handle or Website (for Seller) */}
                            {formData.userType === 'seller' && (
                                <div>
                                    <label htmlFor="websiteOrTiktok" className="block text-sm font-medium text-neutral-300 mb-1">TikTok @ oder Website</label>
                                    <input
                                        type="text"
                                        name="websiteOrTiktok" // Angepasster Name
                                        id="websiteOrTiktok"
                                        required
                                        value={formData.websiteOrTiktok} // value hinzugefügt
                                        onChange={handleInputChange} // onChange hinzugefügt
                                        className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                                        placeholder="Ihr TikTok @ oder Ihre Website URL"
                                        disabled={submissionStatus === 'submitting'}
                                    />
                                </div>
                            )}

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-1">Nachricht</label>
                                <textarea
                                    name="message" // Name-Attribut
                                    id="message"
                                    rows={4}
                                    value={formData.message} // value hinzugefügt
                                    onChange={handleInputChange} // onChange hinzugefügt
                                    className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                                    placeholder="Ihre Nachricht an uns..."
                                    disabled={submissionStatus === 'submitting'}
                                />
                            </div>

                            {/* Submit Button */}
                            <div>
                                {/* Button löst jetzt den handleSubmit Handler aus */}
                                <Button
                                    type="submit"
                                    className={`w-full bg-white text-black hover:bg-neutral-200 font-semibold ${submissionStatus === 'submitting' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={submissionStatus === 'submitting'} // Button während Senden deaktivieren
                                >
                                    {submissionStatus === 'submitting' ? 'Senden...' : 'Nachricht Senden'}
                                </Button>
                            </div>
                            {/* Fehlermeldung im UI anzeigen */}
                            {submissionStatus === 'error' && <p className="text-red-500 text-center mt-4">Fehler beim Senden der Nachricht. Bitte versuchen Sie es erneut.</p>}
                        </form>
                    </div>
                </div>
            </div>


            {/* Call to Action Section (Beibehalten) */}
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
