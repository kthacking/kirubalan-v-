import React, { useEffect, useState, useRef, useCallback } from "react";
import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import App from "./App.tsx";
import "./index.css";
import { fetchAssetsMap } from "./assetsMap.ts";
import foxLogo from "./assets/redfox-logo.jpg";

const RootComponent = () => {
    const [loaded, setLoaded] = useState(false);
    const [settled, setSettled] = useState(false);
    const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        fetchAssetsMap().finally(() => {
            setLoaded(true);
        });
    }, []);

    // Once loaded, find the placeholder in the navbar and read its position
    useEffect(() => {
        if (!loaded) return;
        // Give DOM a frame to paint HeroSection
        const raf = requestAnimationFrame(() => {
            const target = document.getElementById("fox-logo-slot");
            if (target) {
                setTargetRect(target.getBoundingClientRect());
            }
        });
        return () => cancelAnimationFrame(raf);
    }, [loaded]);

    // After the move animation finishes, reveal navbar fox and remove overlay
    const handleAnimationComplete = useCallback(() => {
        if (loaded && targetRect) {
            // Reveal the static navbar fox image
            const staticImg = document.getElementById("fox-logo-static");
            if (staticImg) {
                (staticImg as HTMLElement).style.opacity = "1";
            }
            // Remove the animated overlay on next frame for seamless handoff
            requestAnimationFrame(() => setSettled(true));
        }
    }, [loaded, targetRect]);

    // Calculate animation values
    const getAnimateProps = () => {
        if (!loaded || !targetRect) {
            // Loading state: centered, large
            return {
                position: "fixed" as const,
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
                width: 192, // w-48
                height: "auto" as const,
                borderRadius: 0,
            };
        }
        // Settled: go to navbar slot position
        return {
            position: "fixed" as const,
            top: targetRect.top,
            left: targetRect.left,
            x: 0,
            y: 0,
            width: targetRect.width,     // 32px (w-8)
            height: targetRect.height,   // 32px (h-8)
            borderRadius: 9999,
        };
    };

    const animProps = getAnimateProps();

    return (
        <>
            {/* Fox logo overlay — fullscreen during loading, then moves to navbar */}
            {!settled && (
                <>
                    {/* White backdrop during loading */}
                    {!loaded && (
                        <div
                            style={{
                                position: "fixed",
                                inset: 0,
                                zIndex: 9999,
                                background: "#ffffff"
                            }}
                        />
                    )}
                    <motion.img
                        ref={imgRef}
                        src={foxLogo}
                        alt="REDFOX"
                        initial={{
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            x: "-50%",
                            y: "-50%",
                            width: 192,
                            borderRadius: 0,
                        }}
                        animate={animProps}
                        transition={{
                            duration: loaded && targetRect ? 1 : 0,
                            ease: "easeInOut",
                        }}
                        onAnimationComplete={handleAnimationComplete}
                        style={{
                            zIndex: 10000,
                            objectFit: "contain",
                            pointerEvents: "none",
                            mixBlendMode: "multiply",
                        }}
                    />
                </>
            )}

            {/* App always renders underneath so HeroSection mounts its placeholder */}
            <App />
        </>
    );
};

createRoot(document.getElementById("root")!).render(<RootComponent />);
