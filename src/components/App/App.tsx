import { keepPreviousData, useQuery } from "@tanstack/react-query";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import { useDebouncedCallback } from "use-debounce";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["notes", page, searchValue],
    queryFn: () => fetchNotes(page, searchValue),
    placeholderData: keepPreviousData,
  });

  // const debouncedChange = useDebouncedCallback(setSearchValue, 1000);
  const debouncedChange = useDebouncedCallback((val: string) => {
    setSearchValue(val);
  }, 1000);

  useEffect(() => {
    setPage(1);
  }, [searchValue]);

  useEffect(() => {
    if (data && data.notes.length === 0) {
      toast.error("No notes available.");
    }
  }, [data]);

  return (
    <div className={css.app}>
      <Toaster position="top-center" />
      <header className={css.toolbar}>
        <SearchBox
          value={searchValue}
          onSearch={debouncedChange}
        />

        {isSuccess && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={page}
            onPageChange={(newPage) => setPage(newPage)}
          />
        )}

        <button
          className={css.button}
          onClick={openModal}
        >
          Create note +
        </button>
      </header>
      {isLoading && <Loader />}

      {data && !isLoading && <NoteList notes={data.notes} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default App;
