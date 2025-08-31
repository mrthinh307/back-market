import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: number;
  filledColor?: string;
  emptyColor?: string;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxRating = 5,
  size = 14,
  filledColor = 'text-black-400',
  emptyColor = 'text-gray-300',
}) => {
  const stars = [];

  for (let i = 1; i <= maxRating; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(
        <Star key={i} size={size} className={`${filledColor} fill-current`} />,
      );
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      const fillPercentage = (rating % 1) * 100;
      stars.push(
        <div key={i} className='relative'>
          <Star size={size} className={emptyColor} />
          <div
            className='absolute inset-0 overflow-hidden'
            style={{ width: `${fillPercentage}%` }}
          >
            <Star size={size} className={`${filledColor} fill-current`} />
          </div>
        </div>,
      );
    } else {
      stars.push(<Star key={i} size={size} className={emptyColor} />);
    }
  }

  return <div className='flex items-center space-x-1'>{stars}</div>;
};

export default RatingStars;
