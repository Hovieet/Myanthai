import { motion, AnimatePresence } from "framer-motion";
import { svg } from "../../assets/assets";
import { useState, useEffect, useRef } from "react";
import { pins } from "../../assets/branches";

const viewBoxWidth = 1000;
const viewBoxHeight = 570;

export default function Map() {
  const [hoveredPin, setHoveredPin] = useState(null);
  const [selectedPin, setSelectedPin] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mapRef.current && !mapRef.current.contains(event.target)) {
        setSelectedPin(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={mapRef}>
      {/* Map */}
      <svg.map className="w-full max-w-md md:max-w-lg lg:max-w-xl h-auto mx-auto" />

      {/* Pins */}
      {pins.map((pin, index) => {
        const left = (pin.x / viewBoxWidth) * 100 + "%";
        const top = (pin.y / viewBoxHeight) * 100 + "%";

        return (
          <motion.div
            key={index}
            className="absolute"
            style={{ left, top }}
            onHoverStart={() => setHoveredPin(index)}
            onHoverEnd={() => setHoveredPin(null)}
            onClick={() => setSelectedPin(selectedPin === index ? null : index)}
            whileHover={{ y: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <svg.pin className="size-6 md:size-8 lg:size-10 pin z-20" />

            {hoveredPin === index && selectedPin !== index && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute bottom-full left-1/2 -translate-x-1/2 px-2 py-1 text-sm outline bg-white text-black rounded shadow-lg whitespace-nowrap z-30"
              >
                <h1>{pin.name}</h1>
              </motion.div>
            )}
          </motion.div>
        );
      })}

      <AnimatePresence>
        {selectedPin !== null && (
          <motion.div
            key={selectedPin}
            className="absolute z-50 bg-white shadow-lg rounded p-4 w-84"
            style={{
              left: (pins[selectedPin].x / viewBoxWidth) * 100 + "%",
              top: (pins[selectedPin].y / viewBoxHeight) * 100 + "%",
              transform: "translate(-50%, -120%)",
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="flex justify-between items-start">
              <h2 className="font-bold text-black mb-1">
                {pins[selectedPin].name}
              </h2>
              <button
                onClick={() => setSelectedPin(null)}
                className="text-black font-bold text-xl leading-none ml-2 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <p className="text-sm text-gray-800">
              <span className="font-bold">Adresa: </span>
              {pins[selectedPin].adresa}
            </p>
            <p className="text-sm text-gray-800">
              <span className="font-bold">Kontakt: </span>
              {pins[selectedPin].tel}
            </p>
            <p className="text-sm text-gray-800">
              <span className="font-bold">E-mail: </span>
              {pins[selectedPin].email}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
