import { useDebouncedCallback } from "use-debounce";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  searchValue: string;
  onChange: (searchValue: string) => void;
}

const SearchBox = ({ searchValue, onChange }: SearchBoxProps) => {
  const debouncedChange = useDebouncedCallback((value: string) => {
    onChange(value);
  }, 1000);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedChange(e.target.value);
  };

  return (
    <div>
      <input
        className={css.input}
        type="text"
        placeholder="Search notes"
        defaultValue={searchValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBox;
