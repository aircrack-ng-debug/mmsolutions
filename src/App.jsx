import React, { useState, useEffect, useRef } from "react";

// Mock Button Komponente
const Button = ({ className, children, ...props }) => (
    <button className={`px-6 py-3 rounded-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 ${className}`} {...props}>
        {children}
    </button>
);

// Mock Icon Komponenten
const MockIcon = ({ className }) => <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
const PlayIcon = ({ className }) => <MockIcon className={className} />;
const ShoppingBag = ({ className }) => (
    <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
);
const TrendingUpIcon = ({ className }) => (
    <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);
const UsersIcon = ({ className }) => (
    <svg className={`w-6 h-6 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M12 7a4 4 0 110-5.292A4 4 0 0112 7z" />
    </svg>
);


// Hilfsfunktion für Intersection Observer Logik (beibehalten)
const useIntersectionObserver = (options) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const currentElement = elementRef.current;
        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
                setIsVisible(true);
                if (currentElement) {
                    observer.unobserve(currentElement); // Beobachtung stoppen
                }
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
    // URLs
    const frameBgUrl = "https://raw.githubusercontent.com/aircrack-ng-debug/Imagehosting/refs/heads/main/frame_edit.png";
    const frameBgUrl2 = "https://raw.githubusercontent.com/aircrack-ng-debug/Imagehosting/refs/heads/main/frame_edit_2.png";
    const logoUrl = "https://raw.githubusercontent.com/aircrack-ng-debug/Imagehosting/refs/heads/main/Logo_mm_solutions.png";

    // State für Hero Animation (wird einmal nach Mount gesetzt)
    const [isHeroVisible, setIsHeroVisible] = useState(false);

    useEffect(() => {
        // Trigger Hero animation after a short delay
        const timer = setTimeout(() => {
            setIsHeroVisible(true);
        }, 200); // Kurze Verzögerung nach dem Rendern

        return () => clearTimeout(timer); // Cleanup
    }, []); // Leeres Array = läuft nur einmal nach dem initialen Rendern


    // Observer-Optionen für alle Abschnitte (Zurückgesetzt auf Original)
    const observerOptions = {
        root: null,
        rootMargin: '0px', // Standard-Margin
        threshold: 0.1 // Auslösen, wenn 10% sichtbar sind
    };

    // Intersection Observer für alle scroll-animierten Abschnitte
    const [performanceSectionRef, isPerformanceVisible] = useIntersectionObserver(observerOptions);
    const [tiktokSectionRef, isTikTokVisible] = useIntersectionObserver(observerOptions);
    const [creatorSectionRef, isCreatorVisible] = useIntersectionObserver(observerOptions);
    const [contactSectionRef, isContactVisible] = useIntersectionObserver(observerOptions);
    const [ctaSectionRef, isCtaVisible] = useIntersectionObserver(observerOptions);
    const [footerRef, isFooterVisible] = useIntersectionObserver(observerOptions);


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
            tiktokHandle: newUserType === 'seller' ? '' : prevState.tiktokHandle,
            websiteOrTiktok: newUserType === 'creator' ? '' : prevState.websiteOriktok
        }));
    };

    // Handler für das Absenden des Formulars mit Fetch
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionStatus('submitting');

        const dataToSend = { ...formData };
        if (formData.userType === 'creator') {
            delete dataToSend.websiteOrTiktok;
        } else if (formData.userType === 'seller') {
            delete dataToSend.tiktokHandle;
        }

        try {
            const response = await fetch("https://formspree.io/f/mrbqbvvl", { // Deine Formspree-ID hier einfügen
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });

            if (response.ok) {
                setSubmissionStatus('success');
                setFormData({ name: '', email: '', userType: '', tiktokHandle: '', websiteOrTiktok: '', message: '' });
                setTimeout(() => {
                    setSubmissionStatus(null);
                }, 3000); // Längere Anzeige der Erfolgsmeldung
            } else {
                const errorData = await response.json();
                const errorMessage = errorData.errors ? errorData.errors.map(err => err.message).join(', ') : 'Unbekannter Fehler.';
                throw new Error(errorMessage);
            }
        } catch (error) {
            setSubmissionStatus('error');
            console.error("Fehler beim Senden des Formulars:", error);
            // alert(`Fehler beim Senden: ${error.message}`); // Alert entfernen, falls nicht gewünscht
            setTimeout(() => {
                setSubmissionStatus(null);
            }, 5000); // Fehlermeldung länger anzeigen
        }
    };


    return (
        <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
            {/* Inline-Style-Tag für benutzerdefinierte CSS-Animationen */}
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

          /* --- CSS für Logo-Würfel-Animation --- */
          .logo-cube-container {
            perspective: 1000px;
            width: 50px;
            height: 30px;
          }

          .logo-cube {
            width: 100%;
            height: 100%;
            position: relative;
            transform-style: preserve-3d;
            animation: rotateCube 5s infinite ease-in-out;
          }

          .logo-cube-face {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem; /* 2xl */
            font-weight: bold;
          }

          .logo-cube-front {
            transform: translateZ(15px);
          }

          .logo-cube-back {
            transform: rotateY(180deg) translateZ(15px);
            color: white;
          }

          .logo-cube-face img {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
          }

          /* Keyframes für die Würfelrotation */
          @keyframes rotateCube {
            0%, 40% {
              transform: translateZ(-15px) rotateY(0deg);
            }
            50%, 90% {
              transform: translateZ(-15px) rotateY(-180deg);
            }
            100% {
              transform: translateZ(-15px) rotateY(-360deg);
            }
          }
          /* --- Ende CSS für Logo-Würfel-Animation --- */
        `}
            </style>

            {/* Header Section */}
            <div className="relative flex justify-between items-center pt-10 pb-10 px-4 sm:px-6 lg:px-8">
                {/* Logo/Markenname Container mit Animation */}
                <div className={`flex items-center gap-2 transition-all duration-700 ease-out ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
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
                    <span className="text-2xl font-bold text-neutral-400">SOLUTIONS</span>
                </div>

                {/* Get Started Button */}
                <Button className={`bg-neutral-800 text-white hover:bg-neutral-700 transition-all duration-700 ease-out ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>Get Started</Button>

                {/* Gradient-Trennlinie */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-black/0 via-neutral-500/60 to-black/0"></div>
            </div>

            {/* Hero und Bild Sektion */}
            <div className="relative h-[80vh] mb-20">
                {/* Waves Bild Section */}
                <img
                    src="https://raw.githubusercontent.com/aircrack-ng-debug/Imagehosting/refs/heads/main/Waves.png"
                    alt="Waves Banner"
                    className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src="https://placehold.co/1920x1080/000000/333333?text=Image+Load+Error";
                        e.target.alt="Placeholder Banner";
                    }}
                />

                {/* Hero Text Section */}
                <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 flex flex-col justify-start items-center h-full pt-32">
                    {/* Hauptüberschrift - mit Initialanimation */}
                    <h1 className={`text-7xl font-bold transition-all duration-700 ease-out ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>M&M Solutions</h1>
                    {/* Unterüberschrift - mit Initialanimation und Verzögerung */}
                    <h2 className={`text-3xl mt-4 animated-gradient-text transition-all duration-700 ease-out delay-200 ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>Your Partner for professional E-Commerce Marketing</h2>
                    {/* Learn More Button Container - mit Initialanimation und Verzögerung */}
                    <div className={`mt-8 transition-all duration-700 ease-out delay-400 ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <Button className="bg-neutral-800 hover:bg-neutral-700">Learn More</Button>
                    </div>
                </div>
            </div>

            {/* Abschnitt 1: Performance Fokus */}
            {/* Scroll-triggered animation changed to fade-only */}
            <div
                ref={performanceSectionRef}
                className={`py-10 px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ease-out ${ // Nur opacity transition
                    isPerformanceVisible ? 'opacity-100' : 'opacity-0' // Nur opacity ändern
                }`}
            >
                <div
                    className="relative md:grid md:grid-cols-2 md:gap-16 items-center max-w-6xl mx-auto p-16"
                    style={{
                        backgroundImage: `url('${frameBgUrl}')`,
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    {/* Linke Spalte: Text */}
                    <div className="mb-10 md:mb-0">
                        <div className="flex items-center gap-3 mb-4">
                            <TrendingUpIcon className="text-cyan-400 w-8 h-8 flex-shrink-0" />
                            <h2 className="text-4xl font-bold">Drive Real Results</h2>
                        </div>
                        <p className="text-neutral-300 text-lg mb-6">
                            We focus on performance marketing that delivers measurable revenue growth.
                            Our strategies are optimized for conversion and a clear ROI for your business.
                        </p>
                    </div>

                    {/* Rechte Spalte: Dashboard-Inhalt */}
                    <div>
                        <div className="relative z-10 flex justify-center mb-1">
                            <h3 className="text-xl font-semibold">Measurable Revenue Boost</h3>
                        </div>
                        <div className="relative">
                            {/* Performance Bild - mit animation triggered by section visibility */}
                            <img
                                src="https://raw.githubusercontent.com/aircrack-ng-debug/Imagehosting/refs/heads/main/p_dashboard.png"
                                alt="Performance Dashboard Graphic without border"
                                className={`w-full rounded-lg transition-opacity duration-700 ease-out delay-300 ${ // Nur opacity & delay
                                    isPerformanceVisible ? 'opacity-100' : 'opacity-0' // Nur opacity ändern
                                }`}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://placehold.co/600x400/171717/525252?text=Performance+Graphic";
                                    e.target.alt = "Placeholder for Performance Graphic";
                                }}
                            />
                        </div>
                        <p className="text-center text-neutral-400 text-sm mt-2 whitespace-nowrap">
                            Focus on Conversion & ROI
                        </p>
                    </div>
                </div>
            </div>

            {/* Abschnitt 2: TikTok Shop Fokus */}
            {/* Scroll-triggered animation changed to fade-only */}
            <div
                ref={tiktokSectionRef}
                className={`py-10 px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ease-out ${ // Nur opacity transition
                    isTikTokVisible ? 'opacity-100' : 'opacity-0' // Nur opacity ändern
                }`}
            >
                <div
                    className="relative md:grid md:grid-cols-2 md:gap-16 items-center max-w-6xl mx-auto p-16"
                    style={{
                        backgroundImage: `url('${frameBgUrl2}')`,
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    {/* Linke Spalte: Text */}
                    <div className="mb-10 md:mb-0">
                        <div className="flex items-center gap-3 mb-4">
                            <ShoppingBag className="text-cyan-400 w-8 h-8 flex-shrink-0" />
                            <h2 className="text-4xl font-bold">TikTok Shop Experts</h2>
                        </div>
                        <p className="text-neutral-300 text-lg mb-6">
                            We specialize in TikTok Shop, leveraging seamless integration for direct conversions.
                            Tap into this rapidly growing platform with our targeted strategies.
                        </p>
                    </div>

                    {/* Rechte Spalte: Dashboard-Inhalt */}
                    <div>
                        <div className="relative z-10 flex justify-center mb-1">
                            <h3 className="text-xl font-semibold">Seamless TikTok Integration</h3>
                        </div>
                        <div className="relative">
                            {/* NEUES Bild für TikTok Shop - mit animation triggered by section visibility */}
                            <img
                                src="https://raw.githubusercontent.com/aircrack-ng-debug/Imagehosting/refs/heads/main/Seemless.png"
                                alt="Seamless TikTok Shop Integration Graphic"
                                className={`w-full rounded-lg transition-opacity duration-700 ease-out delay-300 ${ // Nur opacity & delay
                                    isTikTokVisible ? 'opacity-100' : 'opacity-0' // Nur opacity ändern
                                }`}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://placehold.co/600x400/171717/525252?text=TikTok+Shop+Graphic";
                                    e.target.alt = "Placeholder for TikTok Shop Graphic";
                                }}
                            />
                        </div>
                        <p className="text-center text-neutral-400 text-sm mt-2 whitespace-nowrap">
                            Direct Sales on a Booming Platform
                        </p>
                    </div>
                </div>
            </div>

            {/* Abschnitt 3: Creator Partnership */}
            {/* Scroll-triggered animation changed to fade-only */}
            <div
                ref={creatorSectionRef}
                className={`py-10 px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ease-out ${ // Nur opacity transition
                    isCreatorVisible ? 'opacity-100' : 'opacity-0' // Nur opacity ändern
                }`}
            >
                <div
                    className="relative md:grid md:grid-cols-2 md:gap-16 items-center max-w-6xl mx-auto p-16"
                    style={{
                        backgroundImage: `url('${frameBgUrl}')`,
                        backgroundSize: '100% 100%',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    {/* Linke Spalte: Text */}
                    <div className="mb-10 md:mb-0">
                        <div className="flex items-center gap-3 mb-4">
                            <UsersIcon className="text-cyan-400 w-8 h-8 flex-shrink-0" />
                            <h2 className="text-4xl font-bold">Empowering Creators</h2>
                        </div>
                        <p className="text-neutral-300 text-lg mb-6">
                            We build strong, transparent partnerships with creators. Benefit from fair commission structures and dedicated support to grow your influence and earnings.
                        </p>
                    </div>

                    {/* Rechte Spalte: Dashboard-Inhalt */}
                    <div>
                        <div className="relative z-10 flex justify-center mb-1">
                            <h3 className="text-xl font-semibold">Fair & Supportive Partnership</h3>
                        </div>
                        <div className="relative">
                            {/* NEUES Bild für Creator Partnership - mit animation triggered by section visibility */}
                            <img
                                src="https://raw.githubusercontent.com/aircrack-ng-debug/Imagehosting/refs/heads/main/fair%26supportive.png"
                                alt="Fair and Supportive Creator Partnership Graphic"
                                className={`w-full rounded-lg transition-opacity duration-700 ease-out delay-300 ${ // Nur opacity & delay
                                    isCreatorVisible ? 'opacity-100' : 'opacity-0' // Nur opacity ändern
                                }`}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://placehold.co/600x400/171717/525252?text=Creator+Graphic";
                                    e.target.alt = "Placeholder for Creator Graphic";
                                }}
                            />
                        </div>
                        <p className="text-center text-neutral-400 text-sm mt-2 whitespace-nowrap">
                            Grow Together with Transparent Collaboration
                        </p>
                    </div>
                </div>
            </div>

            {/* Neuer Abschnitt: Kontaktformular */}
            {/* Scroll-triggered animation changed to fade-only */}
            <div
                ref={contactSectionRef}
                className={`py-20 px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ease-out ${ // Nur opacity transition
                    isContactVisible ? 'opacity-100' : 'opacity-0' // Nur opacity ändern
                }`}
            >
                <div className="max-w-2xl mx-auto relative min-h-[500px]">
                    <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>

                    {/* Thank You Message Container */}
                    <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out pointer-events-none ${
                        submissionStatus === 'success' ? 'opacity-100 z-20' : 'opacity-0 hidden'
                    }`}>
                        {submissionStatus === 'success' && (
                            <h3 className="text-4xl font-bold animated-gradient-text text-center">
                                Thank You!
                            </h3>
                        )}
                    </div>

                    {/* Formular Container */}
                    <div className={`transition-opacity duration-500 ease-in-out ${
                        submissionStatus === 'success' ? 'opacity-0 invisible' : 'opacity-100 visible'
                    }`}>
                        {submissionStatus !== 'success' && (
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-1">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="Ihr Name"
                                        disabled={submissionStatus === 'submitting'}
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="Ihre Email-Adresse"
                                        disabled={submissionStatus === 'submitting'}
                                    />
                                </div>

                                {/* User Type (Radio Buttons) */}
                                <fieldset disabled={submissionStatus === 'submitting'} className="disabled:opacity-50 disabled:cursor-not-allowed">
                                    <legend className="block text-sm font-medium text-neutral-300 mb-2">Ich bin...</legend>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center">
                                            <input
                                                id="creator"
                                                name="userType"
                                                type="radio"
                                                value="creator"
                                                checked={formData.userType === 'creator'}
                                                onChange={handleUserTypeChange}
                                                className="h-4 w-4 text-cyan-600 border-neutral-600 focus:ring-cyan-500"
                                            />
                                            <label htmlFor="creator" className="ml-2 block text-sm text-neutral-300">Creator</label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                id="seller"
                                                name="userType"
                                                type="radio"
                                                value="seller"
                                                checked={formData.userType === 'seller'}
                                                onChange={handleUserTypeChange}
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
                                            name="tiktokHandle"
                                            id="tiktokHandle"
                                            required
                                            value={formData.tiktokHandle}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
                                            name="websiteOrTiktok"
                                            id="websiteOrTiktok"
                                            required
                                            value={formData.websiteOrTiktok}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                            placeholder="Ihr TikTok @ oder Ihre Website URL"
                                            disabled={submissionStatus === 'submitting'}
                                        />
                                    </div>
                                )}

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-1">Nachricht</label>
                                    <textarea
                                        name="message"
                                        id="message"
                                        rows={4}
                                        required
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="Ihre Nachricht an uns..."
                                        disabled={submissionStatus === 'submitting'}
                                    />
                                </div>

                                {/* Submit Button */}
                                <div>
                                    <Button
                                        type="submit"
                                        className={`w-full bg-white text-black hover:bg-neutral-200 font-semibold ${submissionStatus === 'submitting' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        disabled={submissionStatus === 'submitting'}
                                    >
                                        {submissionStatus === 'submitting' ? 'Senden...' : 'Nachricht Senden'}
                                    </Button>
                                </div>
                                {/* Fehlermeldung im UI anzeigen */}
                                {submissionStatus === 'error' && <p className="text-red-500 text-center mt-4">Fehler beim Senden der Nachricht. Bitte versuchen Sie es erneut.</p>}
                            </form>
                        )}
                    </div>
                </div>
            </div>


            {/* Call to Action Section */}
            {/* Scroll-triggered animation changed to fade-only */}
            <div
                ref={ctaSectionRef}
                className={`text-center mt-20 mb-10 px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ease-out ${ // Nur opacity transition
                    isCtaVisible ? 'opacity-100' : 'opacity-0' // Nur opacity ändern
                }`}
            >
                <h2 className="text-3xl font-bold">Drive Sales on TikTok</h2>
                <p className="mt-2 text-neutral-400">Partner with us to promote your products</p>
                <Button className="mt-6 bg-white text-black hover:bg-neutral-200 font-semibold">Get Started</Button>
            </div>

            {/* Footer Section */}
            {/* Scroll-triggered animation changed to fade-only */}
            <footer
                ref={footerRef}
                className={`text-center mt-20 pt-10 border-t border-neutral-800 px-4 sm:px-6 lg:px-8 pb-10 transition-opacity duration-1000 ease-out ${ // Nur opacity transition
                    isFooterVisible ? 'opacity-100' : 'opacity-0' // Nur opacity ändern
                }`}
            >
                <p className="text-neutral-500 text-sm">© {new Date().getFullYear()} M&M Solutions. All rights reserved.</p>
                {/* Fügen Sie hier Social-Media-Links oder andere Footer-Inhalte hinzu */}
            </footer>

        </div>
    );
}