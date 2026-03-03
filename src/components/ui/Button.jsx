import { motion } from "framer-motion";

export default function Button({
  children,
  onClick,
  className = "",
  variant = "primary",
}) {
  const variants = {
    primary: "bg-[#C6AC8F] text-black",
    dark: "bg-black text-white",
    outline: "border border-black text-black",
  };

  const fillColors = {
    primary: "bg-[#A07856]",
    dark: "bg-[#C6AC8F]",
    outline: "bg-black",
  };

  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      initial="rest"
      whileHover="hover"
      animate="rest"
      transition={{
        type: "spring",
        stiffness: 600,
        damping: 22,
      }}
      className={`
        relative overflow-hidden px-8 py-3
        rounded-tl-full rounded-br-full
        uppercase tracking-wider text-md
        shadow-md
        ${variants[variant]}
        ${className}
      `}
    >
      {/* Circular Fill */}
      <motion.span
        variants={{
          rest: { scale: 0, y: "100%" },
          hover: { scale: 4, y: "0%" },
        }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className={`
          absolute -bottom-5 left-1/2
          w-20 h-20
          -translate-x-1/2
          rounded-full
          ${fillColors[variant]}
          z-0
        `}
        style={{ originY: 1 }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
