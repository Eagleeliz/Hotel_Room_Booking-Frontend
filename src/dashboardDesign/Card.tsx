import React, { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg p-6 transition hover:shadow-pink-400 hover:scale-105 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
