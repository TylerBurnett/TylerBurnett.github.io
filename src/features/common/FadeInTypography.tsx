import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

interface AnimatedTypographyProps {
  delay?: number;
  text: string;
}

function FadeInTypography(props: AnimatedTypographyProps) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const variants = {
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.05 + (props.delay ?? 0),
        duration: 0.5,
      },
    }),
    hidden: { opacity: 0 },
  };

  const isInView = React.useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start((i) => variants.visible(i));
    }
  }, [controls, isInView, variants]);

  return (
    <div ref={ref}>
      {Array.from(props.text).map((char, index) => (
        <motion.span key={index} custom={index} variants={variants} initial="hidden" animate={controls}>
          {char}
        </motion.span>
      ))}
    </div>
  );
}

export default FadeInTypography;
