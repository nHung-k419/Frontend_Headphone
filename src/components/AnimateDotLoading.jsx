import { motion } from "framer-motion";

const WaveLoader = () => {
  const wave = {
    animate: {
      transition: {
        staggerChildren: 0.1,
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  };

  const dot = {
    animate: {
      y: [0, -6, 0],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  };

  return (
    <motion.div variants={wave} animate="animate" className="flex space-x-1 justify-between items-center">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          variants={dot}
          className="w-1 h-1 bg-white rounded-full"
        />
      ))}
    </motion.div>
  );
};

export default WaveLoader;
