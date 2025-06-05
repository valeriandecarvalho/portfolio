import { motion } from "motion/react";

const Card = ({ style, text, image, className = "" , containerRef}) => {
  return image && !text ? (
      <motion.img
        className="absolute w-15 cursor-grab"
        src={image}
        style={style}
        whileHover={{ scale: 1.05 }}
        drag
        dragConstraints={containerRef}
        dragElastic={1}>
      </motion.img>
  ) : (
      <motion.div
          className={`absolute px-1 py-4 text-xl text-center rounded-full ring ring-gray-700 font-extralight cursor-grab ${className}`}
          style={style}
          whileHover={{ scale: 1.05 }}
          drag
          dragConstraints={containerRef}
          dragElastic={1}
      >
        {text}
      </motion.div>
  );
};

export default Card;
