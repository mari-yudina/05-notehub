import { useState } from "react";
import css from "./SearchBox.module.css";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";

const SearchBox = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    },
    1000
  );

  const { data, isLoading } = useQuery({
    queryKey: ["notes", searchValue],
    queryFn: () => {
      console.log("HTTP request..", searchValue);
    },
  });

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
