import {Toolbar, Button, Stack} from "@mui/material";
import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import FadeInTypography from "./FadeInTypography";

const blurAmount = 20;
const blurEaseIn = 1;

interface NavigationProps {
  scrollThreshold?: number;
}

export default function Navigation({ scrollThreshold = 100 }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (latest) => setIsScrolled(latest > scrollThreshold));
  }, [scrollY, scrollThreshold]);

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100, // AppBar z-index
      }}
      initial={{ y: 0, opacity: 1 }}
      animate={{
        backdropFilter: isScrolled ? `blur(${blurAmount}px)` : "blur(0px)",
        WebkitBackdropFilter: isScrolled ? `blur(${blurAmount}px)` : "blur(0px)",
        background: isScrolled ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0)",
      }}
      transition={{
        backdropFilter: { duration: blurEaseIn, ease: "easeIn" },
        WebkitBackdropFilter: { duration: blurEaseIn, ease: "easeIn" },
        background: { duration: blurEaseIn, ease: "easeIn" },
      }}
    >
      <Toolbar sx={{
        justifyContent: "flex-end",
        px: 3,
        minHeight: 64,
        mr: { xs: 2, sm: 4, md: 8, lg: 32, xl: 23.5 }
      }}>
        <Stack pt={3.5} direction="row" spacing={3}>
            <Button size="large" href="https://github.com/TylerBurnett">
                <FadeInTypography delay={0.6} text="Github" />
            </Button>
            <Button size="large" href="https://www.linkedin.com/in/tyler-burnett-35a9a2181/">
                <FadeInTypography delay={0.9} text="Linked In" />
            </Button>
        </Stack>
      </Toolbar>
    </motion.div>
  );
}
