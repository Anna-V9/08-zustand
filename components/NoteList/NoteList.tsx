'use client';
import React from 'react';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Note } from '../../types/note';
import { deleteNote } from '../../lib/api';
import styles from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
  });

  if (!notes.length) return <p>No notes found.</p>;

  return (
    <ul className={styles.list}>
      {notes.map(note => (
        <li key={note.id} className={styles.listItem}>
          <h2 className={styles.title}>{note.title}</h2>

          <p className={styles.content}>{note.content}</p>

          {note.tag && (
            <span className={styles.tag}>{note.tag}</span>
          )}

          <Link
            href={`/notes/${note.id}`}
            className={styles.link}
          >
            View details
          </Link>

          <button
            className={styles.button}
            onClick={() => deleteMutation.mutate(note.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;