// components/ui/star-rating.tsx
import React, { useState } from "react";

interface StarProps {
  filled: boolean;
  onClick: () => void;
}

interface StarRatingProps {
  onRatingChange: (rating: number) => void;
  totalStars?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  totalStars = 5,
  onRatingChange,
}) => {
  const [rating, setRating] = useState<number>(0);

  const handleClick = (index: number) => {
    const newRating = index + 1;
    setRating(newRating);
    onRatingChange(newRating);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {[...Array(totalStars)].map((_, index) => (
        <Star
          key={index}
          filled={index < rating}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

const Star: React.FC<StarProps> = ({ filled, onClick }) => {
  return (
    <span
      onClick={onClick}
      style={{
        cursor: "pointer",
        fontSize: "2rem",
        color: filled ? "gold" : "lightgray",
      }}
    >
      ★
    </span>
  );
};

export default StarRating;
