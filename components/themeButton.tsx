'use client';

import { useThemeContext } from "@/context/ThemeContext";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {}

const ThemeButton: React.FC<Props> = () => {
  const { theme, toggleTheme } = useThemeContext();
  const src = theme === "light" ? "/images/icon-moon.svg" : "/images/icon-sun.svg";

  return (
    <button onClick={toggleTheme}>
      <img src={src} alt="themeIcon" />
    </button>
  );
};

export default ThemeButton;
