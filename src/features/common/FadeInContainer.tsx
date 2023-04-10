import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

interface FadeInContainerProps {
  children?: React.ReactElement;
  delay?: number;
  duration?: number;
}

export default function FadeInContainer(props: FadeInContainerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const controls = useAnimation();
  const isInView = React.useState(false);

  const variants = {
    visible: {
      transition: {
        delay: props.delay ?? 0,
        duration: props.duration ?? 0,
      },
      opacity: 1,
    },
    hidden: { opacity: 0 },
  };

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView, variants]);

  return (
    <motion.span ref={ref} variants={variants} animate={controls} initial="hidden">
      {props.children}
    </motion.span>
  );
}
