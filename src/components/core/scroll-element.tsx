'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface ScrollElementProps {
    children: React.ReactNode;
    className?: string;
    viewport?: {
        amount?: number;
        margin?: string;
        once?: boolean;
    };
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
}

function ScrollElement({
    children,
    className,
    viewport = { amount: 0.3, margin: '0px 0px -200px 0px', once: true },
    delay = 0,
    direction = 'down',
}: ScrollElementProps) {
    // Définir les animations en fonction de la direction
    let initial = {};

    if (direction === 'up') {
        initial = { y: 100, opacity: 0, filter: 'blur(10px)' };
    } else if (direction === 'down') {
        initial = { y: -100, opacity: 0, filter: 'blur(10px)' };
    } else if (direction === 'left') {
        initial = { x: 100, opacity: 0, filter: 'blur(10px)' };
    } else if (direction === 'right') {
        initial = { x: -100, opacity: 0, filter: 'blur(10px)' };
    }

    return (
        <motion.div
            initial={initial}
            whileInView={{
                x: 0,
                y: 0,
                opacity: 1,
                filter: 'blur(0px)',
                transition: {
                    duration: 0.5,
                    ease: 'easeOut',
                    delay,
                },
            }}
            viewport={viewport}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default ScrollElement;
