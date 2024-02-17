import { FC, useRef, useEffect, useState } from 'react';
import { BullseyeRing } from '@/types/models/tracker/tracker.type';
import * as Styled from '../tracking.styles';

interface BullseyeProps {
  onClick: (value: number) => void;
  activeTargetId?: string;
  rings: BullseyeRing[];
}

const strokeWidth = 2;
export const Bullseye: FC<BullseyeProps> = ({ onClick, rings }) => {
  if (!rings) return <p>Getting Target Rings</p>;

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
            onClick={() => handleRingClick(ring.value)}
          />
        ))}
      </svg>
    </Styled.BullsEyeContainer>
  );
};
