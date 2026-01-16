'use client';

import { useState } from 'react';
import Link from 'next/link';
import css from "./NotesPage.module.css";
import { useDebounce } from 'use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import type { NoteTag } from '@/types/note';

const PER_PAGE = 12;

type Props = {
  tag?: NoteTag;
};

function NotesClient({ tag }: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, debouncedSearch, tag ?? 'all'],
    queryFn: () =>
      fetchNotes(
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

        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong...</p>}

      {notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}

export default NotesClient;