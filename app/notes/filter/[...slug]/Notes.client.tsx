'use client';

import { useState } from 'react'
import css from "./NotesPage.module.css"
import { useDebounce } from 'use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes} from '@/lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import type { NoteTag } from '@/types/note';

const PER_PAGE = 12;

type Props = {
  tag?: NoteTag;
};

function NotesClient({tag}: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {data, isLoading, isError} = useQuery({
    queryKey: ["notes", page, debouncedSearch, tag ?? "all"],
    queryFn: () => fetchNotes(
      page,
      PER_PAGE,
      debouncedSearch || undefined,
      tag
    ),
    placeholderData: keepPreviousData,
  });
  
  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
      <div className={css.app}>
	    <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        {totalPages > 1 &&
          (<Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />)}
		  <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
      </button>
        </header>
        
        {isLoading && <p>Loading...</p>}
        {isError && <p>Something went wrong...</p>}

        {notes.length > 0 && (
        <NoteList
          notes={notes}
        />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
</div>
  )
}

export default NotesClient;