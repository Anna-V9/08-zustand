'use client';

import Link from "next/link";
import css from "./NoteClient.module.css";

export default function NotesClient() {
  return (
    <div className={css.header}>
      <Link href="/notes/action/create" className={css.createButton}>
        Create note
      </Link>
    </div>
  );
}
