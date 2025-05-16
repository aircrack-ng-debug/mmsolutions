import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Link } from 'react-router-dom';
import AboutPage from './AboutPage';

// Lokale Bilder und Video importieren
import frameBgUrlLocal from './images/frame_edit.png';
import frameBgUrl2Local from './images/frame_edit_2.png';
import logoUrlLocal from './images/Logo_mm_solutions.png';
import heroVideoUrlLocalWebm from './images/Hero_Section_Video.webm'; // .webm Video
import performanceDashboardUrlLocal from './images/p_dashboard.png';
import tiktokShopIntegrationUrlLocal from './images/Seemless.png';
import creatorPartnershipUrlLocal from './images/fair&supportive.png';

// Preloader Komponente mit Holo-Design
const Preloader = ({ progress, isVisible }) => (
    <div
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        // Hoher z-index, um sicherzustellen, dass er über allem liegt
    >
        <div className="w-1/2 max-w-md mx-auto mb-4 bg-neutral-800 rounded-full h-2.5 overflow-hidden"> {/* Etwas dunklerer Hintergrund für den Balken */}
            <div
                className="h-full rounded-full holo-progress-bar" // Eigene Klasse für Holo-Styling
                style={{ width: `${progress}%` }}
            ></div>
        </div>
        {isVisible && progress < 100 && ( // Text nur anzeigen, wenn Preloader sichtbar ist und lädt
            <p className="text-sm holo-loading-text">Loading Experience... {progress}%</p>
        )}
    </div>
);


// Button Komponente (unverändert)
const Button = ({ className, children, ...props }) => (
    <button
        className={`px-6 py-2.5 text-sm sm:px-8 sm:py-3 rounded-full font-semibold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 bg-transparent border border-neutral-500 hover:bg-neutral-800 hover:border-neutral-400 ${className}`}
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

// Hilfsfunktion für Intersection Observer Logik (unverändert)
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
                    observer.unobserve(currentElement);
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
    }, [options]);

    return [elementRef, isVisible];
};

// Hauptkomponente HomePage
const HomePage = () => {
    const frameBgUrl = frameBgUrlLocal;
    const frameBgUrl2 = frameBgUrl2Local;
    const logoUrl = logoUrlLocal;
    const heroVideoUrl = heroVideoUrlLocalWebm;

    const [isHeroVisible, setIsHeroVisible] = useState(false);
    const [showPreloader, setShowPreloader] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [showContent, setShowContent] = useState(false);

    const videoRef = useRef(null);

    useEffect(() => {
        const heroAnimTimer = setTimeout(() => setIsHeroVisible(true), 200);

        let progressInterval = null;
        let hidePreloaderTimeout = null;
        let showContentTimeout = null;
        let videoLoadFallbackTimeout = null;

        const currentVideo = videoRef.current;

        const completeLoadingAndShowContent = (showBrieflyAt100 = false) => {
            clearInterval(progressInterval);

            if (showBrieflyAt100) {
                setLoadingProgress(100);
                setShowPreloader(true); // Sicherstellen, dass Preloader für den 100%-Moment sichtbar ist

                hidePreloaderTimeout = setTimeout(() => {
                    setShowPreloader(false); // Startet Ausblenden des Preloaders (CSS transition: 500ms)
                    showContentTimeout = setTimeout(() => {
                        setShowContent(true); // Startet Einblenden des Inhalts (CSS transition: 1000ms)
                    }, 500); // Diese Zeit sollte der Opacity-Transition-Dauer des Preloaders entsprechen
                }, 300); // Kurze Anzeige von 100% (z.B. 300ms)
            } else {
                setShowPreloader(false); // Preloader nicht (oder nicht mehr) anzeigen
                setShowContent(true);    // Inhalt direkt einblenden
            }
        };

        const handleVideoCanPlay = () => {
            clearTimeout(videoLoadFallbackTimeout);
            completeLoadingAndShowContent(showPreloader); // Nur 100% anzeigen, wenn Preloader schon sichtbar war
        };

        if (currentVideo) {
            if (currentVideo.readyState >= 4) { // HAVE_ENOUGH_DATA
                completeLoadingAndShowContent(false);
            } else {
                // Nur Preloader anzeigen, wenn Video tatsächlich laden muss
                setShowPreloader(true);
                progressInterval = setInterval(() => {
                    setLoadingProgress(prev => (prev < 90 ? prev + 10 : prev)); // Etwas schnellerer Fortschritt
                }, 100);

                currentVideo.addEventListener('canplaythrough', handleVideoCanPlay);
                currentVideo.addEventListener('error', () => { // Fehlerbehandlung für Video
                    console.error("Video loading error.");
                    handleVideoCanPlay(); // Ladevorgang abschließen, um Blockade zu verhindern
                });


                videoLoadFallbackTimeout = setTimeout(() => {
                    if (currentVideo.readyState < 4) {
                        console.warn("Video loading fallback timeout reached. Forcing content display.");
                        handleVideoCanPlay();
                    }
                }, 10000); // 10 Sekunden Timeout
            }
        } else {
            console.warn("Video reference not found initially.");
            completeLoadingAndShowContent(false);
        }

        return () => {
            clearTimeout(heroAnimTimer);
            clearInterval(progressInterval);
            clearTimeout(hidePreloaderTimeout);
            clearTimeout(showContentTimeout);
            clearTimeout(videoLoadFallbackTimeout);
            if (currentVideo) {
                currentVideo.removeEventListener('canplaythrough', handleVideoCanPlay);
                currentVideo.removeEventListener('error', handleVideoCanPlay); // Auch Error-Listener entfernen
            }
        };
    }, []);


    // Intersection Observer Logik (unverändert)
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
    const [performanceSectionRef, isPerformanceVisible] = useIntersectionObserver(observerOptions);
    const [tiktokSectionRef, isTikTokVisible] = useIntersectionObserver(observerOptions);
    const [creatorSectionRef, isCreatorVisible] = useIntersectionObserver(observerOptions);
    const [contactSectionRef, isContactVisible] = useIntersectionObserver(observerOptions);
    const [ctaSectionRef, isCtaVisible] = useIntersectionObserver(observerOptions);
    const [footerRef, isFooterVisible] = useIntersectionObserver(observerOptions);

    // Formular-State und Handler (unverändert)
    const [formData, setFormData] = useState({ name: '', email: '', userType: '', tiktokHandle: '', websiteOrTiktok: '', message: '' });
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const handleInputChange = (e) => { const { name, value } = e.target; setFormData(prevState => ({ ...prevState, [name]: value })); };
    const handleUserTypeChange = (e) => { const newUserType = e.target.value; setFormData(prevState => ({ ...prevState, userType: newUserType, tiktokHandle: newUserType === 'seller' ? '' : prevState.tiktokHandle, websiteOrTiktok: newUserType === 'creator' ? '' : prevState.websiteOrTiktok })); };
    const handleSubmit = async (e) => {
        e.preventDefault(); setSubmissionStatus('submitting');
        const dataToSend = { ...formData };
        if (formData.userType === 'creator') delete dataToSend.websiteOrTiktok;
        else if (formData.userType === 'seller') delete dataToSend.tiktokHandle;
        try {
            const response = await fetch("https://formspree.io/f/mrbqbvvl", { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(dataToSend) });
            if (response.ok) { setSubmissionStatus('success'); setFormData({ name: '', email: '', userType: '', tiktokHandle: '', websiteOrTiktok: '', message: '' }); setTimeout(() => setSubmissionStatus(null), 3000); }
            else { const errorData = await response.json(); const errorMessage = errorData.errors ? errorData.errors.map(err => err.message).join(', ') : 'Unknown error.'; throw new Error(errorMessage); }
        } catch (error) { setSubmissionStatus('error'); console.error("Error submitting form:", error); setTimeout(() => setSubmissionStatus(null), 5000); }
    };

    return (
        <>
            {/* Globale Styles für Body-Hintergrund und Holo-Effekte */}
            <style>
                {`
                  body {
                    background-color: #000; /* Verhindert weißen Flash initial */
                  }
                  .holo-progress-bar {
                    background-color: #00d9ff; /* Holo blue from AboutPage */
                    box-shadow: 0 0 5px #00d9ff, 0 0 10px #00d9ff, inset 0 0 3px rgba(255,255,255,0.5);
                    animation: holo-flicker 2.5s ease-in-out infinite;
                    transition: width 0.2s ease-linear; /* Sanfterer Fortschritt des Balkens */
                  }
                  @keyframes holo-flicker {
                    0%, 100% { opacity: 1; box-shadow: 0 0 5px #00d9ff, 0 0 10px #00d9ff, 0 0 15px #00aeff, inset 0 0 3px rgba(255,255,255,0.5); }
                    50% { opacity: 0.7; box-shadow: 0 0 8px #00d9ff, 0 0 18px #00d9ff, 0 0 30px #00aeff, inset 0 0 5px rgba(255,255,255,0.7); }
                  }
                  .holo-loading-text {
                    color: #00d9ff;
                    text-shadow: 0 0 4px #00aeff, 0 0 6px #00aeff;
                    font-family: 'Orbitron', 'Press Start 2P', monospace, sans-serif; /* Optional: Holo Font */
                  }

                  /* Bestehende Animationen */
                  .animated-gradient-text { background: linear-gradient(270deg, #00ffff, #ff00ff, #00ffff); background-size: 600% 600%; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; animation: shimmer 6s ease infinite; }
                  @keyframes shimmer { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
                  .logo-cube-container { perspective: 1000px; width: 36px; height: 36px; }
                  .logo-cube { width: 100%; height: 100%; position: relative; transform-style: preserve-3d; animation: rotateCubeMobile 5s infinite ease-in-out; }
                  .logo-cube-face { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; }
                  .logo-cube-front { transform: translateZ(18px); }
                  .logo-cube-back { transform: rotateY(180deg) translateZ(18px); color: white; }
                  .logo-cube-face img { max-width: 100%; max-height: 100%; object-fit: contain; }
                  @keyframes rotateCubeMobile { 0%, 40% { transform: translateZ(-18px) rotateY(0deg); } 50%, 90% { transform: translateZ(-18px) rotateY(-180deg); } 100% { transform: translateZ(-18px) rotateY(-360deg); } }
                  @media (min-width: 640px) { .logo-cube-container { width: 50px; height: 50px; } .logo-cube { animation-name: rotateCubeDesktop; } .logo-cube-front { transform: translateZ(25px); } .logo-cube-back { transform: rotateY(180deg) translateZ(25px); } @keyframes rotateCubeDesktop { 0%, 40% { transform: translateZ(-25px) rotateY(0deg); } 50%, 90% { transform: translateZ(-25px) rotateY(-180deg); } 100% { transform: translateZ(-25px) rotateY(-360deg); } } }
                `}
            </style>

            <Preloader progress={loadingProgress} isVisible={showPreloader} />

            <div className={`min-h-screen bg-black text-white font-sans overflow-x-hidden transition-opacity duration-1000 ease-in-out ${showContent ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                {/* Wenn nicht sichtbar, auch keine Maus-Events (pointer-events-none), um sicherzustellen, dass der Preloader klickbar ist, falls er noch teilweise sichtbar ist */}

                {/* Header Section (unverändert) */}
                <div className="relative flex justify-between items-center pt-6 pb-6 px-4 sm:pt-8 sm:pb-8 sm:px-6 lg:px-8">
                    <div className={`flex items-center gap-1 sm:gap-2 transition-all duration-700 ease-out ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <div className="logo-cube-container"><div className="logo-cube"><div className="logo-cube-face logo-cube-front"><img src={logoUrl} alt="M&M Logo" /></div><div className="logo-cube-face logo-cube-back">MM</div></div></div>
                        <span className="text-lg sm:text-xl lg:text-2xl font-bold text-neutral-400">SOLUTIONS</span>
                    </div>
                    <a href="#contact-form-section" className={`inline-block px-4 py-2 text-sm sm:px-6 sm:py-2.5 lg:px-8 lg:py-3 rounded-full font-semibold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 bg-transparent border border-neutral-500 text-white hover:bg-neutral-800 hover:border-neutral-400 transition-all duration-700 ease-out ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>Get Started</a>
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-black/0 via-neutral-500/60 to-black/0"></div>
                </div>

                {/* Hero und Bild Sektion */}
                <div className="relative h-screen mb-20">
                    <video ref={videoRef} src={heroVideoUrl} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-40">
                        Your browser does not support the video tag.
                    </video>
                    <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 flex flex-col justify-start items-center h-full pt-48">
                        <h1 className={`text-5xl sm:text-7xl font-semibold transition-all duration-700 ease-out ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>Maurice & Marius Solutions.</h1>
                        <h2 className={`text-xl sm:text-2xl mt-4 text-neutral-400 transition-all duration-700 ease-out delay-200 ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>Your Partner for professional E-Commerce Marketing</h2>
                        <div className={`mt-8 transition-all duration-700 ease-out delay-400 ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                            <Link to="/about" className="inline-block px-6 py-2.5 text-sm sm:px-8 sm:py-3 rounded-full font-semibold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 bg-transparent border border-neutral-500 text-white hover:bg-neutral-800 hover:border-neutral-400">Learn More</Link>
                        </div>
                    </div>
                </div>

                {/* Abschnitt 1: Performance Fokus (unverändert) */}
                <div ref={performanceSectionRef} className={`py-10 px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ease-out ${isPerformanceVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="relative flex flex-col items-center w-full max-w-xs mx-auto p-6 py-10 rounded-3xl md:grid md:grid-cols-2 md:gap-16 md:p-16 md:max-w-6xl md:rounded-none md:py-16 bg-center bg-no-repeat" style={{ backgroundImage: `url('${frameBgUrl}')`, backgroundSize: '100% 100%' }}>
                        <div className="w-full order-1 md:order-2 flex flex-col items-center">
                            <div className="relative mt-0 md:mt-0"><img src={performanceDashboardUrlLocal} alt="Leistungs-Dashboard Grafik" className="w-full max-w-[160px] sm:max-w-[200px] md:max-w-none mx-auto rounded-lg md:w-3/4 lg:w-full" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/171717/525252?text=Performance+Graphic"; e.target.alt = "Placeholder for Performance Graphic"; }}/></div>
                            <div className="hidden md:block text-center mt-2"><h3 className="text-xl font-semibold">Measurable Revenue Boost</h3><p className="text-neutral-400 text-sm mt-1">Focus on Conversion & ROI</p></div>
                        </div>
                        <div className="w-full order-2 md:order-1 mt-8 md:mt-0 text-center md:text-left">
                            <div className="flex flex-col items-center md:flex-row md:items-center gap-2 md:gap-3 mb-3 md:mb-4"><TrendingUpIcon className="text-cyan-400 w-7 h-7 md:w-8 md:h-8 flex-shrink-0" /><h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Drive Real Results</h2></div>
                            <p className="text-neutral-300 text-sm sm:text-base md:text-lg">We focus on performance marketing that delivers measurable revenue growth. Our strategies are optimized for conversion and a clear ROI for your business.</p>
                        </div>
                    </div>
                </div>

                {/* Abschnitt 2: TikTok Shop Fokus (unverändert) */}
                <div ref={tiktokSectionRef} className={`py-10 px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ease-out ${isTikTokVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="relative flex flex-col items-center w-full max-w-xs mx-auto p-6 py-10 rounded-3xl md:grid md:grid-cols-2 md:gap-16 md:p-16 md:max-w-6xl md:rounded-none md:py-16 bg-center bg-no-repeat" style={{ backgroundImage: `url('${frameBgUrl2}')`, backgroundSize: '100% 100%' }}>
                        <div className="w-full order-1 md:order-1 flex flex-col items-center">
                            <div className="relative mt-0 md:mt-0"><img src={tiktokShopIntegrationUrlLocal} alt="Nahtlose TikTok Shop Integration Grafik" className="w-full max-w-[160px] sm:max-w-[200px] md:max-w-none mx-auto rounded-lg md:w-3/4 lg:w-full" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/171717/525252?text=TikTok+Shop+Graphic"; e.target.alt = "Placeholder for TikTok Shop Graphic"; }}/></div>
                            <div className="hidden md:block text-center mt-2"><h3 className="text-xl font-semibold">Seamless TikTok Integration</h3><p className="text-neutral-400 text-sm mt-1">Direct Sales on a Booming Platform</p></div>
                        </div>
                        <div className="w-full order-2 md:order-2 mt-8 md:mt-0 text-center md:text-left">
                            <div className="flex flex-col items-center md:flex-row md:items-center gap-2 md:gap-3 mb-3 md:mb-4"><ShoppingBag className="text-cyan-400 w-7 h-7 md:w-8 md:h-8 flex-shrink-0" /><h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">TikTok Shop Experts</h2></div>
                            <p className="text-neutral-300 text-sm sm:text-base md:text-lg">We specialize in TikTok Shop, leveraging seamless integration for direct conversions. Tap into this rapidly growing platform with our targeted strategies.</p>
                        </div>
                    </div>
                </div>

                {/* Abschnitt 3: Creator Partnership (unverändert) */}
                <div ref={creatorSectionRef} className={`py-10 px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ease-out ${isCreatorVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="relative flex flex-col items-center w-full max-w-xs mx-auto p-6 py-10 rounded-3xl md:grid md:grid-cols-2 md:gap-16 md:p-16 md:max-w-6xl md:rounded-none md:py-16 bg-center bg-no-repeat" style={{ backgroundImage: `url('${frameBgUrl}')`, backgroundSize: '100% 100%' }}>
                        <div className="w-full order-1 md:order-2 flex flex-col items-center">
                            <div className="relative mt-0 md:mt-0"><img src={creatorPartnershipUrlLocal} alt="Faire und unterstützende Creator-Partnerschaft Grafik" className="w-full max-w-[160px] sm:max-w-[200px] md:max-w-none mx-auto rounded-lg md:w-3/4 lg:w-full" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/171717/525252?text=Creator+Graphic"; e.target.alt = "Placeholder for Creator Graphic"; }}/></div>
                            <div className="hidden md:block text-center mt-2"><h3 className="text-xl font-semibold">Fair & Supportive Partnership</h3><p className="text-neutral-400 text-sm mt-1">Grow Together with Transparent Collaboration</p></div>
                        </div>
                        <div className="w-full order-2 md:order-1 mt-8 md:mt-0 text-center md:text-left">
                            <div className="flex flex-col items-center md:flex-row md:items-center gap-2 md:gap-3 mb-3 md:mb-4"><UsersIcon className="text-cyan-400 w-7 h-7 md:w-8 md:h-8 flex-shrink-0" /><h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Empowering Creators</h2></div>
                            <p className="text-neutral-300 text-sm sm:text-base md:text-lg">We build strong, transparent partnerships with creators. Benefit from fair commission structures and dedicated support to grow your influence and earnings.</p>
                        </div>
                    </div>
                </div>

                {/* Kontaktformular (unverändert) */}
                <div id="contact-form-section" ref={contactSectionRef} className={`py-20 px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ease-out ${isContactVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="max-w-2xl mx-auto relative min-h-[500px]">
                        <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
                        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out pointer-events-none ${submissionStatus === 'success' ? 'opacity-100 z-20' : 'opacity-0 hidden'}`}>{submissionStatus === 'success' && <h3 className="text-4xl font-bold animated-gradient-text text-center">Thank You!</h3>}</div>
                        <div className={`transition-opacity duration-500 ease-in-out ${submissionStatus === 'success' ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>
                            {submissionStatus !== 'success' && (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div><label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-1">Name</label><input type="text" name="name" id="name" required value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed" placeholder="Your Name" disabled={submissionStatus === 'submitting'} /></div>
                                    <div><label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-1">Email</label><input type="email" name="email" id="email" required value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed" placeholder="Your Email Address" disabled={submissionStatus === 'submitting'} /></div>
                                    <fieldset disabled={submissionStatus === 'submitting'} className="disabled:opacity-50 disabled:cursor-not-allowed"><legend className="block text-sm font-medium text-neutral-300 mb-2">I am...</legend><div className="flex items-center space-x-4"><div className="flex items-center"><input id="creator" name="userType" type="radio" value="creator" checked={formData.userType === 'creator'} onChange={handleUserTypeChange} className="h-4 w-4 text-cyan-600 border-neutral-600 focus:ring-cyan-500" /><label htmlFor="creator" className="ml-2 block text-sm text-neutral-300">Creator</label></div><div className="flex items-center"><input id="seller" name="userType" type="radio" value="seller" checked={formData.userType === 'seller'} onChange={handleUserTypeChange} className="h-4 w-4 text-cyan-600 border-neutral-600 focus:ring-cyan-500" /><label htmlFor="seller" className="ml-2 block text-sm text-neutral-300">Seller</label></div></div></fieldset>
                                    {formData.userType === 'creator' && (<div><label htmlFor="tiktokHandle" className="block text-sm font-medium text-neutral-300 mb-1">TikTok @</label><input type="text" name="tiktokHandle" id="tiktokHandle" required value={formData.tiktokHandle} onChange={handleInputChange} className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed" placeholder="Your TikTok @ Handle" disabled={submissionStatus === 'submitting'} /></div>)}
                                    {formData.userType === 'seller' && (<div><label htmlFor="websiteOrTiktok" className="block text-sm font-medium text-neutral-300 mb-1">TikTok @ or Website</label><input type="text" name="websiteOrTiktok" id="websiteOrTiktok" required value={formData.websiteOrTiktok} onChange={handleInputChange} className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed" placeholder="Your TikTok @ or Website URL" disabled={submissionStatus === 'submitting'} /></div>)}
                                    <div><label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-1">Message</label><textarea name="message" id="message" rows={4} required value={formData.message} onChange={handleInputChange} className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed" placeholder="Your message to us..." disabled={submissionStatus === 'submitting'} /></div>
                                    <div><Button type="submit" className={`w-full bg-white text-black hover:bg-neutral-600 hover:text-white border-neutral-300 hover:border-neutral-400 font-semibold ${submissionStatus === 'submitting' ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={submissionStatus === 'submitting'}>{submissionStatus === 'submitting' ? 'Sending...' : 'Send Message'}</Button></div>
                                    {submissionStatus === 'error' && <p className="text-red-500 text-center mt-4">Error sending message. Please try again.</p>}
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                {/* Call to Action Section (unverändert) */}
                <div ref={ctaSectionRef} className={`text-center mt-20 mb-10 px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ease-out ${isCtaVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <h2 className="text-3xl font-bold">Drive Sales on TikTok</h2>
                    <p className="mt-2 text-neutral-400">Partner with us to promote your products</p>
                    <a href="#contact-form-section" className="mt-6 inline-block bg-white text-black hover:bg-neutral-200 font-semibold px-6 py-2.5 text-sm sm:px-8 sm:py-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 border border-neutral-300 hover:border-neutral-400">Get Started</a>
                </div>

                {/* Footer Section (unverändert) */}
                <footer ref={footerRef} className={`text-center mt-20 pt-10 border-t border-neutral-800 px-4 sm:px-6 lg:px-8 pb-10 transition-opacity duration-1000 ease-out ${isFooterVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <p className="text-neutral-500 text-sm">© {new Date().getFullYear()} MM Solutions. All rights reserved.</p>
                </footer>
            </div>
        </>
    );
};

// Hauptkomponente App, die die Routen verwaltet (unverändert) hier ist eine änderung
export default function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
        </Routes>
    );
}
