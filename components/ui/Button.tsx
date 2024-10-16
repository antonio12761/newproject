import React from "react";
import { Loader2 } from "lucide-react"; // Importa l'icona di caricamento da Lucide React

interface ButtonProps {
  label: string;
  isLoading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset"; // Opzioni per il tipo di pulsante
}

const Button: React.FC<ButtonProps> = ({
  label,
  isLoading = false,
  disabled = false,
  type = "button", // Il tipo di pulsante predefinito è "button"
}) => {
  return (
    <button
      type={type}
      disabled={disabled || isLoading} // Disabilita il pulsante se è in caricamento o disabilitato
      className={`flex items-center justify-center w-full px-4 py-2 text-white rounded transition-colors duration-300 
        ${
          isLoading || disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
    >
      {isLoading ? (
        <Loader2 className="animate-spin mr-2" /> // Mostra l'icona di caricamento se isLoading è true
      ) : null}
      {label}
    </button>
  );
};

export default Button;
