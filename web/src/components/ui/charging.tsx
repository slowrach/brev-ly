import { motion } from "motion/react";
import charging from "../../assets/charging.svg";

type Props = React.ComponentProps<"img">;

export function Charging({ className }: Props) {
  return (
    <motion.div
      animate={{ rotate: "360deg" }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <img src={charging} alt="ícone de carregamento" className={className} />
    </motion.div>
  );
}
