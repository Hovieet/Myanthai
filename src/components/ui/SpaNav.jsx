import { motion } from "framer-motion";
import { spanav } from "../../assets/services";

const SpaNav = () => {
  return (
    <nav className="py-6">
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {spanav.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.li
              key={index}
              className="flex flex-col items-center cursor-pointer "
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="size-20 mb-2" />
              <h1 className="lg:text-2xl text-md font-medium text-gray-700 text-center">
                {item.label}
              </h1>
            </motion.li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SpaNav;
