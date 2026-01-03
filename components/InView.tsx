'use client';

import React, { useRef, useEffect, useState } from 'react';

export default function InView({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    const style = {
        transitionDelay: `${delay}ms`,
    };

    return (
        <div
            ref={ref}
            style={style}
            className={`transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } ${className}`}
        >
            {children}
        </div>
    );
}
