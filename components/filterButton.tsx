import { Filter } from "@/types/Filter";
import clsx from "clsx";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  filter: Filter;
  text: string;
}

const FilterButton: React.FC<Props> = ({ filter, onClick, text }) => {
  return (
    <button
      className={clsx([
        "font-semibold",
        filter === text.toLowerCase()
          ? "text-primary-bright-blue hover:underline"
          : "dark:hover:text-dark-light-grayish-blue-hover text-light-dark-grayish-blue hover:text-light-very-dark-grayish-blue",
      ])}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default FilterButton;
