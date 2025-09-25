import React from "react";
import Image from "next/image";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string;
  iconWidth?: number;
  iconHeight?: number;
}

const Button = ({
  variant = "primary" as ButtonVariant,
  size = "lg" as ButtonSize,
  icon,
  iconWidth = 22,
  iconHeight = 17,
  className = "",
  children,
  disabled = false,
  ...props
}: ButtonProps) => {
  const baseClasses =
    "font-semibold rounded-2xl flex items-center justify-center gap-3 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      "bg-[#33E5B0] hover:bg-[#2DD4A0] text-[#21211F] focus:ring-[#33E5B0]",
    secondary:
      "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400",
  };

  const sizeClasses: Record<ButtonSize, string> = {
    sm: "text-sm w-32 h-10 px-4 py-2",
    md: "text-lg w-48 h-12 px-6 py-3",
    lg: "text-[25px] w-[278px] h-[78px] px-8 py-4",
  };

  const sizeClassesWithoutWidth = sizeClasses[size].replace(/w-\[?\w+\]?/, "");
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClassesWithoutWidth} ${className}`;

  return (
    <button {...props} className={combinedClasses} disabled={disabled}>
      {children}
      {icon && (
        <Image src={icon} alt="Icon" width={iconWidth} height={iconHeight} />
      )}
    </button>
  );
};

export default Button;
