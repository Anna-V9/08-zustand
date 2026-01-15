"use client";

import { useState, useEffect } from "react";
import css from "./NoteForm.module.css";
import { useNoteStore, DraftNote } from "@/lib/store/noteStore";
import { useRouter } from "next/navigation";

interface NoteFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ onSuccess, onCancel }) => {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteStore();

  
  const [form, setForm] = useState<DraftNote>(draft);

  
  useEffect(() => {
    setDraft(form);
  }, [form, setDraft]);

  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      
      await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      clearDraft(); 
      onSuccess?.();
      router.back(); 
    } catch (err) {
      console.error("Failed to create note", err);
    }
  };

  
  const handleCancel = () => {
    onCancel?.();
    router.back();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          minLength={3}
          maxLength={50}
          className={css.input}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={form.content}
          onChange={handleChange}
          rows={8}
          maxLength={500}
          className={css.textarea}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          value={form.tag}
          onChange={handleChange}
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={handleCancel}>
          Cancel
        </button>

        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
};

export default NoteForm;