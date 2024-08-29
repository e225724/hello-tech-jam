"use client";

import React, { useState } from "react";

// Starのプロパティの型定義
interface StarProps {
  filled: boolean;
  onClick: () => void;
}

const StarRating: React.FC<{ totalStars?: number }> = ({ totalStars = 5 }) => {
  const [rating, setRating] = useState<number>(0);

  const handleClick = (index: number) => {
    setRating(index + 1);
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
