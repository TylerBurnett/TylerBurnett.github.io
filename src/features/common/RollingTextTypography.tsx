import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface RollingTextTypographyProps {
	text: string;
	delay?: number;
	duration?: number;
}

function RollingTextTypography({ text, delay = 0, duration = 0.5 }: RollingTextTypographyProps) {
	const controls = useAnimation();
	const { ref, inView } = useInView({ triggerOnce: true });

	useEffect(() => {
		if (inView) {
			controls.start((i) => variants.visible(i));
		}
	}, [controls, inView]);

	const variants = {
		hidden: {
			opacity: 0,
			rotateX: 90,
			y: 20,
		},
		visible: (i: number) => ({
			opacity: 1,
			rotateX: 0,
			y: 0,
			transition: {
				delay: i * 0.05 + delay,
				duration: duration,
				type: "spring" as const,
				stiffness: 100,
			},
		}),
	};

	return (
		<div ref={ref} style={{ display: "inline-block" }}>
			{Array.from(text).map((char, index) => (
				<motion.span
					// biome-ignore lint/suspicious/noArrayIndexKey: This is the unique key
					key={index}
					custom={index}
					variants={variants}
					initial="hidden"
					animate={controls}
					style={{
						display: "inline-block",
						perspective: "1000px",
						transformStyle: "preserve-3d",
					}}
				>
					{char === " " ? "\u00A0" : char}
				</motion.span>
			))}
		</div>
	);
}

export default RollingTextTypography;
