import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isVisible, setIsVisible] = useState(false);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setPercent(Math.round(latest * 100));
      setIsVisible(latest > 0.01);
    });
  }, [scrollYProgress]);

  return (
    <div
      id="scroll-progress-wrapper"
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 z-[60] h-[3.5px] sm:h-1 bg-gray-100/30 backdrop-blur-2xs pointer-events-none"
    >
      {/* Active Gradient Indicator */}
      <motion.div
        id="scroll-progress-bar"
        className="h-full bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#F97316] origin-left shadow-[0_1px_8px_rgba(217,70,239,0.45)]"
        style={{ scaleX }}
      />

      {/* Subtle indicator pulse glow at the leading edge */}
      {isVisible && percent < 100 && (
        <motion.div
          className="absolute top-0 bottom-0 w-2.5 bg-white/80 rounded-full blur-[2px]"
          style={{
            left: `${percent}%`,
            transform: 'translateX(-50%)'
          }}
        />
      )}
    </div>
  );
};
