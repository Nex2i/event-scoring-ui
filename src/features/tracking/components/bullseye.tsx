import { FC, useRef, useEffect, useState } from 'react';
import * as Styled from '../tracking.styles';

interface BullseyeProps {
  onClick: (value: number) => void;
}

const strokeWidth = 2;
export const Bullseye: FC<BullseyeProps> = ({ onClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(100); // Default size

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        setSize(containerWidth);
      }
    };

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const rings = [
    { score: 10, color: 'white' },
    { score: 8, color: 'black' },
    { score: 6, color: 'blue' },
    { score: 4, color: 'red' },
    { score: 2, color: 'yellow' },
  ];

  const maxRadius = size / 2;
  const ringWidth = maxRadius / rings.length;

  const handleRingClick = (score: number) => {
    onClick(score);
  };

  const viewBoxSize = size + strokeWidth * 2;

  return (
    <Styled.BullsEyeContainer ref={containerRef}>
      <svg width="100%" height="100%" viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}>
        {rings.map((ring, index) => (
          <Styled.BullsEyeRing
            key={index}
            cx={size / 2 + strokeWidth}
            cy={size / 2 + strokeWidth}
            r={maxRadius - index * ringWidth}
            fill={ring.color}
            stroke="black"
            strokeWidth={strokeWidth}
            onClick={() => handleRingClick(ring.score)}
          />
        ))}
      </svg>
    </Styled.BullsEyeContainer>
  );
};
