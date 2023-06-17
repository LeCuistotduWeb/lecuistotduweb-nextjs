import React from 'react';
import useIntersectionObserver from '../../hooks/useIntersectionObserver'

const SectionAnimation = ({options, children}) => {
  const elementRef = useIntersectionObserver(
      (entries) => {
      entries.forEach((entry) => {
          if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          entry.target.style.transition = 'opacity 1s, transform 1s';
          }
      });
      },
      { threshold: 0.5, ...options }
  );

  return (
    <div 
      ref={elementRef}
      style={{ opacity: 0, transform: 'translateY(20px)' }}
    >
      {children}
    </div>
  )
}

export default SectionAnimation