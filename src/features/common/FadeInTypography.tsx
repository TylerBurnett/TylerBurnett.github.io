import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface AnimatedTypographyProps {
	text: string;
	delay?: number;
}

function FadeInTypography(props: AnimatedTypographyProps) {
	const controls = useAnimation();
	const { ref, inView } = useInView({ triggerOnce: true });

	useEffect(() => {
		if (inView) {
			controls.start((i) => variants.visible(i));
		}
	}, [controls, inView]);

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

	return (
		<div ref={ref}>
			{Array.from(props.text).map((char, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: The index is the unique key
				<motion.span key={index} custom={index} variants={variants} initial="hidden" animate={controls}>
					{char}
				</motion.span>
			))}
		</div>
	);
}

export default FadeInTypography;
