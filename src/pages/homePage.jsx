import { useState, useEffect } from "react";
import { img } from "../assets/assets";
import { aboutText, branchText } from "../assets/text";
import { motion } from "framer-motion";

import SpaNav from "../components/ui/SpaNav";
import Map from "../components/ui/Map";

const images = [img.bg1, img.bg2, img.bg3, img.bg4, img.bg5];

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      <section
        className="h-screen bg-cover bg-center bg-no-repeat relative transition-all duration-700"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      >
        {/* Icon behind H1 */}
        <motion.img
          src={img.myanicon}
          alt="icon"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2/3 opacity-90 z-5 w-40 h-40 md:w-60 md:h-60 pointer-events-none"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60 z-1 pointer-events-none"></div>

        {/* Text */}
        <div className="w-full h-full flex flex-col items-center justify-center text-white z-10 relative text-center">
          <p className="uppercase lg:text-xl text-md font-bold text-white/90">
            Thájské masáže Myan
          </p>
          <h2 className="lg:text-7xl text-4xl text-shadow-lg ">
            Zrelaxujte své tělo a mysl
          </h2>
          <p className="mt-3 lg:text-xl text-md italic text-gray-200 text-shadow-2lg">
            Tradiční thajské masáže jsou víc než jen odpočinek - jsou zážitkem.
          </p>
        </div>

        <div className="absolute bottom-10 w-full flex flex-col items-center z-20">
          <div className="flex justify-center space-x-10 mb-3">
            <button
              onClick={prevSlide}
              className="text-white text-xl px-3 py-1 rounded"
            >
              &#10094;
            </button>
            <button
              onClick={nextSlide}
              className="text-white text-xl px-3 py-1 rounded"
            >
              &#10095;
            </button>
          </div>

          <div className="flex justify-center space-x-3">
            {images.map((_, index) => (
              <span
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  currentIndex === index ? "bg-white" : "bg-gray-400"
                }`}
              ></span>
            ))}
          </div>
        </div>

        {/* Wave SVG */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 z-10">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
              className="fill-current text-[#fdfdfd]"
            ></path>
          </svg>
        </div>
      </section>

      <section className="bg-[#FDFDFD] w-full">
        <SpaNav />
        <div className="w-full flex flex-col lg:flex-row items-center lg:justify-center mt-10 px-4 md:px-8 ">
          <img
            src={img.about}
            alt="aboutus"
            className="w-full max-w-md lg:w-90 rounded-tr-[120px] rounded-bl-[120px] mb-6 lg:mb-0"
          />
          <div className="hidden lg:block w-px bg-gray-300 mx-30 h-100"></div>
          <div className="max-w-xl flex flex-col gap-4 text-center lg:text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-5 text-shadow-lg">
              {aboutText.title}
            </h1>
            <p className="text-lg md:text-xl">{aboutText.intro}</p>
            <p className="text-lg md:text-xl">{aboutText.description}</p>
            <p className="text-lg md:text-xl">{aboutText.closing}</p>
          </div>
        </div>
      </section>
      <div className="relative bottom-0 left-0 w-full overflow-hidden leading-none mt-20">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-24"
        >
          <path
            d="M602.45,3.86h0S572.9,116.24,281.94,120H923C632,116.24,602.45,3.86,602.45,3.86Z"
            className="fill-current text-[#C6AC8F]"
          ></path>
        </svg>
      </div>
      <section className="w-full bg-[#C6AC8F] pb-10">
        <div className="flex flex-col xl:flex-row items-center justify-center gap-10 pt-20">
          <div className="max-w-xl flex flex-col gap-4 text-center xl:text-left">
            <h1 className="text-5xl md:text-5xl lg:text-6xl mb-5 text-gray-900 text-shadow-lg">
              {branchText.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-900">
              {branchText.description}
            </p>
          </div>
          <div className="hidden sm:block">
            <Map />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
