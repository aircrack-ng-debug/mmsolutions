import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Link } from 'react-router-dom'; // Importiere Routes, Route und Link
import AboutPage from './AboutPage'; // Importiere die AboutPage Komponente aus ihrer Datei

// Lokale Bilder und Video importieren
// Stelle sicher, dass diese Dateien im Ordner 'src/images/' vorhanden sind
import frameBgUrlLocal from './images/frame_edit.png';
import frameBgUrl2Local from './images/frame_edit_2.png';
import logoUrlLocal from './images/Logo_mm_solutions.png';
import heroVideoUrlLocal from './images/Hero_Section_Video.mp4'; // Video auch aus images/
import performanceDashboardUrlLocal from './images/p_dashboard.png';
import tiktokShopIntegrationUrlLocal from './images/Seemless.png'; // Beachte den Dateinamen "Seemless.png"
import creatorPartnershipUrlLocal from './images/fair&supportive.png'; // Beachte den Dateinamen "fair&supportive.png"


// Button Komponente - Überarbeitet: text-white aus Basis-Styles entfernt für bessere Überschreibbarkeit
const Button = ({ className, children, ...props }) => (
    <button
        className={`px-6 py-2.5 text-sm sm:px-8 sm:py-3 rounded-full font-semibold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 bg-transparent border border-neutral-500 hover:bg-neutral-800 hover:border-neutral-400 ${className}`} // text-white hier entfernt
        {...props}
    >
        {children}
    </button>
);


// Mock Icon Komponenten (unverändert)
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
const HomePage = () => {
    // URLs wurden durch importierte lokale Pfade ersetzt
    const frameBgUrl = frameBgUrlLocal;
    const frameBgUrl2 = frameBgUrl2Local;
    const logoUrl = logoUrlLocal;
    const heroVideoUrl = heroVideoUrlLocal;

    // State für Hero Animation (wird einmal nach Mount gesetzt) (unverändert)
    const [isHeroVisible, setIsHeroVisible] = useState(false);

    useEffect(() => {
        // Trigger Hero animation after a short delay
        const timer = setTimeout(() => {
            setIsHeroVisible(true);
        }, 200); // Kurze Verzögerung nach dem Rendern

        return () => clearTimeout(timer); // Cleanup
    }, []); // Leeres Array = läuft nur einmal nach dem initialen Rendern


    // Observer-Optionen für alle Abschnitte (Zurückgesetzt auf Original) (unverändert)
    const observerOptions = {
        root: null,
        rootMargin: '0px', // Standard-Margin
        threshold: 0.1 // Auslösen, wenn 10% sichtbar sind
    };

    // Intersection Observer für alle scroll-animierten Abschnitte (unverändert)
    const [performanceSectionRef, isPerformanceVisible] = useIntersectionObserver(observerOptions);
    const [tiktokSectionRef, isTikTokVisible] = useIntersectionObserver(observerOptions);
    const [creatorSectionRef, isCreatorVisible] = useIntersectionObserver(observerOptions);
    // Ref für Kontaktformular-Sektion beibehalten für Observer
    const [contactSectionRef, isContactVisible] = useIntersectionObserver(observerOptions);
    const [ctaSectionRef, isCtaVisible] = useIntersectionObserver(observerOptions);
    const [footerRef, isFooterVisible] = useIntersectionObserver(observerOptions);


    // State für das Kontaktformular (unverändert)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        userType: '', // 'seller' or 'creator'
        tiktokHandle: '',
        websiteOrTiktok: '', // Kombiniertes Feld für Seller
        message: ''
    });
    const [submissionStatus, setSubmissionStatus] = useState(null); // 'submitting', 'success', 'error', null

    // Handler für Änderungen in den Formularfeldern (unverändert)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handler für Änderungen bei den Radio-Buttons (unverändert)
    const handleUserTypeChange = (e) => {
        const newUserType = e.target.value;
        setFormData(prevState => ({
            ...prevState,
            userType: newUserType,
            tiktokHandle: newUserType === 'seller' ? '' : prevState.tiktokHandle,
            websiteOrTiktok: newUserType === 'creator' ? '' : prevState.websiteOrTiktok
        }));
    };

    // Handler für das Absenden des Formulars mit Fetch (unverändert)
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
                }, 3000);
            } else {
                const errorData = await response.json();
                const errorMessage = errorData.errors ? errorData.errors.map(err => err.message).join(', ') : 'Unknown error.';
                throw new Error(errorMessage);
            }
        } catch (error) {
            setSubmissionStatus('error');
            console.error("Error submitting form:", error);
            setTimeout(() => {
                setSubmissionStatus(null);
            }, 5000);
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
        
                  /* --- CSS für Logo-Würfel-Animation (Responsive) --- */
                  .logo-cube-container {
                    perspective: 1000px;
                    width: 36px; /* Mobile first: kleiner */
                    height: 36px; /* Mobile first: kleiner */
                  }
        
                  .logo-cube {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    transform-style: preserve-3d;
                    animation: rotateCubeMobile 5s infinite ease-in-out; /* Mobile Animation zuerst */
                  }
        
                  .logo-cube-face {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    backface-visibility: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.25rem; /* Angepasst für kleinere Größe, falls Text im Würfel wäre */
                    font-weight: bold;
                  }
        
                  .logo-cube-front {
                    transform: translateZ(18px); /* Angepasst an 36px Würfel */
                  }
        
                  .logo-cube-back {
                    transform: rotateY(180deg) translateZ(18px); /* Angepasst an 36px Würfel */
                    color: white; 
                  }
        
                  .logo-cube-face img {
                    max-width: 100%;
                    max-height: 100%;
                    object-fit: contain;
                  }
        
                  /* Keyframes für die Würfelrotation (Mobile) */
                  @keyframes rotateCubeMobile {
                    0%, 40% { transform: translateZ(-18px) rotateY(0deg); }
                    50%, 90% { transform: translateZ(-18px) rotateY(-180deg); }
                    100% { transform: translateZ(-18px) rotateY(-360deg); }
                  }
        
                  /* Desktop Anpassungen für Logo Würfel */
                  @media (min-width: 640px) { /* Tailwind 'sm' breakpoint */
                    .logo-cube-container {
                      width: 50px;
                      height: 50px;
                    }
                    .logo-cube {
                      animation-name: rotateCubeDesktop; /* Wechsle zur Desktop-Animation */
                    }
                    .logo-cube-front {
                      transform: translateZ(25px);
                    }
                    .logo-cube-back {
                      transform: rotateY(180deg) translateZ(25px);
                    }
                    /* Keyframes für die Würfelrotation (Desktop) */
                    @keyframes rotateCubeDesktop {
                      0%, 40% { transform: translateZ(-25px) rotateY(0deg); }
                      50%, 90% { transform: translateZ(-25px) rotateY(-180deg); }
                      100% { transform: translateZ(-25px) rotateY(-360deg); }
                    }
                  }
                  /* --- Ende CSS für Logo-Würfel-Animation --- */
                `}
            </style>

            {/* Header Section - Padding angepasst für Mobile */}
            <div className="relative flex justify-between items-center pt-6 pb-6 px-4 sm:pt-8 sm:pb-8 sm:px-6 lg:px-8">
                {/* Logo/Markenname Container mit Animation - Gap und Schriftgröße angepasst */}
                <div className={`flex items-center gap-1 sm:gap-2 transition-all duration-700 ease-out ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="logo-cube-container">
                        <div className="logo-cube">
                            <div className="logo-cube-face logo-cube-front">
                                <img src={logoUrl} alt="M&M Logo" />
                            </div>
                            <div className="logo-cube-face logo-cube-back">
                                MM {/* Geändert von M&M zu MM */}
                            </div>
                        </div>
                    </div>
                    {/* Schriftgröße von SOLUTIONS angepasst */}
                    <span className="text-lg sm:text-xl lg:text-2xl font-bold text-neutral-400">SOLUTIONS</span>
                </div>

                {/* Get Started Button - Neuer Stil, responsive Padding/Textgröße */}
                <a
                    href="#contact-form-section"
                    className={`inline-block px-4 py-2 text-sm sm:px-6 sm:py-2.5 lg:px-8 lg:py-3 rounded-full font-semibold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 bg-transparent border border-neutral-500 text-white hover:bg-neutral-800 hover:border-neutral-400 transition-all duration-700 ease-out ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                    Get Started
                </a>

                {/* Gradient-Trennlinie (unverändert) */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-black/0 via-neutral-500/60 to-black/0"></div>
            </div>

            {/* Hero und Bild Sektion - Höhe auf h-screen geändert */}
            <div className="relative h-screen mb-20"> {/* von h-[80vh] zu h-screen geändert */}
                {/* Waves Video Section */}
                <video
                    src={heroVideoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
                >
                    Your browser does not support the video tag.
                </video>

                {/* Hero Text Section */}
                <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 flex flex-col justify-start items-center h-full pt-48">
                    {/* Hauptüberschrift */}
                    <h1 className={`text-5xl sm:text-7xl font-semibold transition-all duration-700 ease-out ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>Maurice & Marius Solutions</h1>
                    {/* Unterüberschrift */}
                    <h2 className={`text-xl sm:text-2xl mt-4 text-neutral-400 transition-all duration-700 ease-out delay-200 ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>Your Partner for professional E-Commerce Marketing</h2>
                    {/* Learn More Button Container */}
                    <div className={`mt-8 transition-all duration-700 ease-out delay-400 ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        {/* Learn More Button - Neuer Stil, responsive Padding/Textgröße */}
                        <Link
                            to="/about"
                            className="inline-block px-6 py-2.5 text-sm sm:px-8 sm:py-3 rounded-full font-semibold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 bg-transparent border border-neutral-500 text-white hover:bg-neutral-800 hover:border-neutral-400"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>

            {/* Abschnitt 1: Performance Fokus */}
            <div
                ref={performanceSectionRef}
                className={`py-10 px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ease-out ${
                    isPerformanceVisible ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <div
                    className="relative flex flex-col items-center w-full max-w-xs mx-auto p-6 py-10 rounded-3xl
                               md:grid md:grid-cols-2 md:gap-16 md:p-16 md:max-w-6xl md:rounded-none md:py-16
                               bg-center bg-no-repeat" // md:py-16 hinzugefügt für Konsistenz mit Desktop-Padding
                    style={{ backgroundImage: `url('${frameBgUrl}')`, backgroundSize: '100% 100%' }}
                >
                    {/* Bild Container (Mobile: Oben, Desktop: Rechts) */}
                    <div className="w-full order-1 md:order-2 flex flex-col items-center">
                        <div className="relative mt-0 md:mt-0">
                            <img
                                src={performanceDashboardUrlLocal}
                                alt="Leistungs-Dashboard Grafik"
                                className="w-full max-w-[160px] sm:max-w-[200px] md:max-w-none mx-auto rounded-lg md:w-3/4 lg:w-full" // max-w für mobile angepasst
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://placehold.co/600x400/171717/525252?text=Performance+Graphic";
                                    e.target.alt = "Placeholder for Performance Graphic";
                                }}
                            />
                        </div>
                        {/* Desktop-spezifische Texte unter dem Bild */}
                        <div className="hidden md:block text-center mt-2">
                            <h3 className="text-xl font-semibold">Measurable Revenue Boost</h3>
                            <p className="text-neutral-400 text-sm mt-1">Focus on Conversion & ROI</p>
                        </div>
                    </div>

                    {/* Text Container (Mobile: Unten, Desktop: Links) */}
                    <div className="w-full order-2 md:order-1 mt-8 md:mt-0 text-center md:text-left">
                        <div className="flex flex-col items-center md:flex-row md:items-center gap-2 md:gap-3 mb-3 md:mb-4">
                            <TrendingUpIcon className="text-cyan-400 w-7 h-7 md:w-8 md:h-8 flex-shrink-0" />
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Drive Real Results</h2>
                        </div>
                        <p className="text-neutral-300 text-sm sm:text-base md:text-lg">
                            We focus on performance marketing that delivers measurable revenue growth.
                            Our strategies are optimized for conversion and a clear ROI for your business.
                        </p>
                    </div>
                </div>
            </div>

            {/* Abschnitt 2: TikTok Shop Fokus */}
            <div
                ref={tiktokSectionRef}
                className={`py-10 px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ease-out ${
                    isTikTokVisible ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <div
                    className="relative flex flex-col items-center w-full max-w-xs mx-auto p-6 py-10 rounded-3xl
                               md:grid md:grid-cols-2 md:gap-16 md:p-16 md:max-w-6xl md:rounded-none md:py-16
                               bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('${frameBgUrl2}')`, backgroundSize: '100% 100%' }}
                >
                    {/* Bild Container (Mobile: Oben, Desktop: Links) */}
                    <div className="w-full order-1 md:order-1 flex flex-col items-center">
                        <div className="relative mt-0 md:mt-0">
                            <img
                                src={tiktokShopIntegrationUrlLocal}
                                alt="Nahtlose TikTok Shop Integration Grafik"
                                className="w-full max-w-[160px] sm:max-w-[200px] md:max-w-none mx-auto rounded-lg md:w-3/4 lg:w-full" // max-w für mobile angepasst
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://placehold.co/600x400/171717/525252?text=TikTok+Shop+Graphic";
                                    e.target.alt = "Placeholder for TikTok Shop Graphic";
                                }}
                            />
                        </div>
                        {/* Desktop-spezifische Texte unter dem Bild */}
                        <div className="hidden md:block text-center mt-2">
                            <h3 className="text-xl font-semibold">Seamless TikTok Integration</h3>
                            <p className="text-neutral-400 text-sm mt-1">Direct Sales on a Booming Platform</p>
                        </div>
                    </div>
                    {/* Text Container (Mobile: Unten, Desktop: Rechts) */}
                    <div className="w-full order-2 md:order-2 mt-8 md:mt-0 text-center md:text-left">
                        <div className="flex flex-col items-center md:flex-row md:items-center gap-2 md:gap-3 mb-3 md:mb-4">
                            <ShoppingBag className="text-cyan-400 w-7 h-7 md:w-8 md:h-8 flex-shrink-0" />
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">TikTok Shop Experts</h2>
                        </div>
                        <p className="text-neutral-300 text-sm sm:text-base md:text-lg">
                            We specialize in TikTok Shop, leveraging seamless integration for direct conversions.
                            Tap into this rapidly growing platform with our targeted strategies.
                        </p>
                    </div>
                </div>
            </div>

            {/* Abschnitt 3: Creator Partnership */}
            <div
                ref={creatorSectionRef}
                className={`py-10 px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ease-out ${
                    isCreatorVisible ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <div
                    className="relative flex flex-col items-center w-full max-w-xs mx-auto p-6 py-10 rounded-3xl
                               md:grid md:grid-cols-2 md:gap-16 md:p-16 md:max-w-6xl md:rounded-none md:py-16
                               bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('${frameBgUrl}')`, backgroundSize: '100% 100%' }}
                >
                    {/* Bild Container (Mobile: Oben, Desktop: Rechts) */}
                    <div className="w-full order-1 md:order-2 flex flex-col items-center">
                        <div className="relative mt-0 md:mt-0">
                            <img
                                src={creatorPartnershipUrlLocal}
                                alt="Faire und unterstützende Creator-Partnerschaft Grafik"
                                className="w-full max-w-[160px] sm:max-w-[200px] md:max-w-none mx-auto rounded-lg md:w-3/4 lg:w-full" // max-w für mobile angepasst
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://placehold.co/600x400/171717/525252?text=Creator+Graphic";
                                    e.target.alt = "Placeholder for Creator Graphic";
                                }}
                            />
                        </div>
                        {/* Desktop-spezifische Texte unter dem Bild */}
                        <div className="hidden md:block text-center mt-2">
                            <h3 className="text-xl font-semibold">Fair & Supportive Partnership</h3>
                            <p className="text-neutral-400 text-sm mt-1">Grow Together with Transparent Collaboration</p>
                        </div>
                    </div>

                    {/* Text Container (Mobile: Unten, Desktop: Links) */}
                    <div className="w-full order-2 md:order-1 mt-8 md:mt-0 text-center md:text-left">
                        <div className="flex flex-col items-center md:flex-row md:items-center gap-2 md:gap-3 mb-3 md:mb-4">
                            <UsersIcon className="text-cyan-400 w-7 h-7 md:w-8 md:h-8 flex-shrink-0" />
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Empowering Creators</h2>
                        </div>
                        <p className="text-neutral-300 text-sm sm:text-base md:text-lg">
                            We build strong, transparent partnerships with creators. Benefit from fair commission structures and dedicated support to grow your influence and earnings.
                        </p>
                    </div>
                </div>
            </div>

            {/* Neuer Abschnitt: Kontaktformular */}
            <div
                id="contact-form-section"
                ref={contactSectionRef}
                className={`py-20 px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ease-out ${
                    isContactVisible ? 'opacity-100' : 'opacity-0'
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
                                        placeholder="Your Name"
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
                                        placeholder="Your Email Address"
                                        disabled={submissionStatus === 'submitting'}
                                    />
                                </div>

                                {/* User Type (Radio Buttons) */}
                                <fieldset disabled={submissionStatus === 'submitting'} className="disabled:opacity-50 disabled:cursor-not-allowed">
                                    <legend className="block text-sm font-medium text-neutral-300 mb-2">I am...</legend>
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
                                            placeholder="Your TikTok @ Handle"
                                            disabled={submissionStatus === 'submitting'}
                                        />
                                    </div>
                                )}

                                {/* Conditional Field: TikTok Handle or Website (for Seller) */}
                                {formData.userType === 'seller' && (
                                    <div>
                                        <label htmlFor="websiteOrTiktok" className="block text-sm font-medium text-neutral-300 mb-1">TikTok @ or Website</label>
                                        <input
                                            type="text"
                                            name="websiteOrTiktok"
                                            id="websiteOrTiktok"
                                            required
                                            value={formData.websiteOrTiktok}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                            placeholder="Your TikTok @ or Website URL"
                                            disabled={submissionStatus === 'submitting'}
                                        />
                                    </div>
                                )}

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-1">Message</label>
                                    <textarea
                                        name="message"
                                        id="message"
                                        rows={4}
                                        required
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                        placeholder="Your message to us..."
                                        disabled={submissionStatus === 'submitting'}
                                    />
                                </div>

                                {/* Submit Button - Klassen für Textfarbe und Hintergrund sind hier definiert */}
                                <div>
                                    <Button
                                        type="submit"
                                        className={`w-full bg-white text-black hover:bg-neutral-600 hover:text-white border-neutral-300 hover:border-neutral-400 font-semibold ${submissionStatus === 'submitting' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        disabled={submissionStatus === 'submitting'}
                                    >
                                        {submissionStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                                    </Button>
                                </div>
                                {/* Fehlermeldung im UI anzeigen */}
                                {submissionStatus === 'error' && <p className="text-red-500 text-center mt-4">Error sending message. Please try again.</p>}
                            </form>
                        )}
                    </div>
                </div>
            </div>


            {/* Call to Action Section */}
            <div
                ref={ctaSectionRef}
                className={`text-center mt-20 mb-10 px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ease-out ${
                    isCtaVisible ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <h2 className="text-3xl font-bold">Drive Sales on TikTok</h2>
                <p className="mt-2 text-neutral-400">Partner with us to promote your products</p>
                {/* Get Started Button im CTA - Solider Hintergrund, responsive Padding/Textgröße */}
                <a
                    href="#contact-form-section"
                    className="mt-6 inline-block bg-white text-black hover:bg-neutral-200 font-semibold px-6 py-2.5 text-sm sm:px-8 sm:py-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 border border-neutral-300 hover:border-neutral-400"
                >
                    Get Started
                </a>
            </div>

            {/* Footer Section (unverändert) */}
            <footer
                ref={footerRef}
                className={`text-center mt-20 pt-10 border-t border-neutral-800 px-4 sm:px-6 lg:px-8 pb-10 transition-opacity duration-1000 ease-out ${
                    isFooterVisible ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <p className="text-neutral-500 text-sm">© {new Date().getFullYear()} MM Solutions. All rights reserved.</p>
            </footer>

        </div>
    );
};

// Hauptkomponente, die die Routen verwaltet
export default function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
        </Routes>
    );
}
