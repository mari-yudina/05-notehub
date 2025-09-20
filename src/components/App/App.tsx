import { keepPreviousData, useQuery } from "@tanstack/react-query";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";
import { useState } from "react";
import Loader from "../../Loader/Loader";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { data, isLoading } = useQuery({
    queryKey: ["notes", page, perPage],
    queryFn: () => fetchNotes(page, perPage),
    placeholderData: keepPreviousData,
  });
  console.log("data", data);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox />

        {data && (
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

      {data && !isLoading && (
        <NoteList
          notes={data.notes}
          onSelect={() => {}}
        />
      )}
      {isModalOpen && (
        <Modal>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default App;
