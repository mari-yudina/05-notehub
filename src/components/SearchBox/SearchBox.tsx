import css from "./SearchBox.module.css";

const SearchBox = () => {
  return (
    <div>
      <input
        className={css.input}
        type="text"
        placeholder="Search notes"
      />
    </div>
  );
};

export default SearchBox;
