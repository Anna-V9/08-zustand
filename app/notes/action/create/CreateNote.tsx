'use client';

import NoteForm from "@/components/NoteForm/NoteForm";
import css from "../../../page.module.css";
import { useNoteStore } from "@/lib/store/noteStore";

const CreateNoteClient = () => {
  const { draft, clearDraft } = useNoteStore();

  const handleSuccess = async () => {
    await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });

    clearDraft();
  };

  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm onSuccess={handleSuccess} />
      </div>
    </main>
  );
};

export default CreateNoteClient;