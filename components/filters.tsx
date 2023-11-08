import { Filter } from "@/types/Filter";
import FilterButton from "./filterButton";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  filter: Filter,
  setFilter: (filter: Filter) => void
}

const Filters: React.FC<Props> = ({ filter, setFilter }) => {
  return (
    <>
      <FilterButton
        filter={filter}
        onClick={() => setFilter("all")}
        text="All"
      />
      <FilterButton
        filter={filter}
        onClick={() => setFilter("active")}
        text="Active"
      />
      <FilterButton
        filter={filter}
        onClick={() => setFilter("completed")}
        text="Completed"
      />
    </>
  );
};

export default Filters;
