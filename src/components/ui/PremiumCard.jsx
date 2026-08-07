import { motion } from "framer-motion";

export default function PremiumCard({
  children,
  className = "",
  hover = true,
  ...props
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -6 } : {}}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className={`premium-card ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
