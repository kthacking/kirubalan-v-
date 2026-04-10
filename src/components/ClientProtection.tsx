import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const ClientProtection = () => {
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const showPopup = (msg: string) => {
      setPopupMessage(msg);
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setPopupMessage(null);
      }, 2000);
    };

    // 1. Disable Right Click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      showPopup("⚠️ Right-click is disabled on this website");
    };

    // 2. Block DevTools Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.key === "F12") {
        e.preventDefault();
        showPopup("🚫 Developer tools are restricted");
      }
      // Ctrl+Shift+I (Windows/Linux) or Cmd+Option+I (Mac)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "i") {
        e.preventDefault();
        showPopup("🚫 Developer tools are restricted");
      }
      // Ctrl+Shift+J (Windows/Linux) or Cmd+Option+J (Mac)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "j") {
        e.preventDefault();
        showPopup("🚫 Developer tools are restricted");
      }
      // Ctrl+U (Windows/Linux) or Cmd+U (Mac) - View Source
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "u") {
        e.preventDefault();
        showPopup("🚫 Developer tools are restricted");
      }
    };

    // 3. Disable Text Selection, Copy, and Drag
    const preventAction = (e: Event) => {
      e.preventDefault();
    };

    // Add event listeners
    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);
    
    // Disable text selection
    document.addEventListener("selectstart", preventAction);
    document.addEventListener("copy", preventAction);
    document.addEventListener("dragstart", preventAction);

    // Console warning
    console.log("%cStop trying to inspect 😉", "color: #ff0000; font-size: 20px; font-weight: bold; font-family: sans-serif;");

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("selectstart", preventAction);
      document.removeEventListener("copy", preventAction);
      document.removeEventListener("dragstart", preventAction);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <AnimatePresence>
      {popupMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{
            position: "fixed",
            bottom: "2rem",
            left: "50%",
            marginLeft: "-max-content", // To center it without using translate which might conflict with motion
            transform: "translateX(-50%)",
            backgroundColor: "rgba(15, 23, 42, 0.85)", // Dark slate glass
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            color: "white",
            padding: "12px 24px",
            borderRadius: "9999px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)",
            zIndex: 99999,
            pointerEvents: "none",
            fontFamily: "inherit",
          }}
        >
          <span style={{ fontWeight: 500, fontSize: "14px", letterSpacing: "0.5px" }}>
            {popupMessage}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
