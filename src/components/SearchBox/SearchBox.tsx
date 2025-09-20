import type { DebouncedState } from "use-debounce";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onSearch: DebouncedState<(val: string) => void>;
}

const SearchBox = ({ onSearch, value }: SearchBoxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div>
      <input
        className={css.input}
        type="text"
        placeholder="Search notes"
        defaultValue={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBox;
