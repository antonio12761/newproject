import React from "react";

interface CardProps {
  children: React.ReactNode;
  title: string;
}

const Card: React.FC<CardProps> = ({ children, title }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      {/* Centra la card */}
      <div className="w-full max-w-sm mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Card;
