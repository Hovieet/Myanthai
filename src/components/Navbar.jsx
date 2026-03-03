import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { branches } from "../assets/branches";
import { svg } from "../assets/assets";
import Button from "./ui/Button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = () => setIsOpen(false);

  /* Scroll Detection */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Lock scroll when menu open */
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="fixed w-full z-50">
      {/* Navbar Bar */}
      <div
        className={`relative flex h-20 justify-between items-center 
        px-4 md:px-6 font-dm-serif text-base md:text-lg
        transition-all duration-500 ease-in-out ${
          scrolled || isOpen
            ? "bg-white/80 backdrop-blur-xl shadow-md text-black"
            : "bg-transparent text-white"
        }`}
      >
        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-4 group z-50"
        >
          <div className="relative w-7 h-5">
            <motion.span
              className="absolute w-full h-0.5 rounded-full"
              animate={{
                backgroundColor: scrolled || isOpen ? "#000" : "#fff",
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 8 : 0,
              }}
              transition={{ duration: 0.3 }}
            />

            <motion.span
              className="absolute w-full h-0.5 rounded-full top-2"
              animate={{
                backgroundColor: scrolled || isOpen ? "#000" : "#fff",
                opacity: isOpen ? 0 : 1,
              }}
              transition={{ duration: 0.2 }}
            />

            <motion.span
              className="absolute w-full h-0.5 rounded-full top-4"
              animate={{
                backgroundColor: scrolled || isOpen ? "#000" : "#fff",
                rotate: isOpen ? -45 : 0,
                y: isOpen ? -8 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <span className="hidden ml-3 md:inline uppercase tracking-widest font-light group-hover:opacity-70 transition">
            Menu
          </span>
        </button>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <svg.myan className="w-16 md:w-24 h-auto" />
        </div>

        <Button className="text-white hidden sm:inline">Rezervace</Button>
      </div>

      {/* Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="relative w-full max-h-[calc(100vh-5rem)] overflow-y-auto 
            bg-black/60 backdrop-blur-md text-white z-20"
          >
            <div className="grid grid-cols-1 md:grid-cols-[60%_40%] h-full">
              {/* LEFT SIDE MENU */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="flex flex-col justify-center 
                px-6 md:px-20 
                gap-6 md:gap-8 
                text-2xl md:text-4xl 
                tracking-widest text-[#C6AC8F] py-10 lg:py-15"
              >
                {[
                  "Úvod",
                  "O nás",
                  "Masáže",
                  "Ceník",
                  "Dárkové poukazy",
                  "Kontakt",
                ].map((item) => (
                  <motion.h1
                    key={item}
                    variants={itemVariants}
                    onClick={closeMenu}
                    className="hover:opacity-70 cursor-pointer"
                  >
                    {item}
                  </motion.h1>
                ))}
              </motion.div>

              {/* RIGHT SIDE BRANCHES */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="bg-[#6f4d38] 
                flex flex-col justify-center items-center 
                gap-8 md:gap-10 
                p-6 md:p-10"
              >
                <motion.h2
                  variants={itemVariants}
                  className="text-2xl md:text-4xl uppercase tracking-widest"
                >
                  Pobočky
                </motion.h2>

                <div className="flex flex-col gap-12 md:gap-20">
                  {branches.map((branch) => (
                    <motion.div
                      key={branch.id}
                      variants={itemVariants}
                      className="flex flex-col items-center text-center gap-1"
                    >
                      <h1 className="uppercase tracking-widest text-xl md:text-3xl font-semibold border-b border-b-white/70">
                        {branch.name}
                      </h1>

                      <div className="text-sm md:text-lg">
                        <p>{branch.address}</p>
                        <p>{branch.email}</p>
                        <p>{branch.open}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </section>
  );
}
