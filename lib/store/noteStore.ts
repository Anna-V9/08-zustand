import { create } from "zustand";
import { persist } from "zustand/middleware";

export type DraftNote = {
  title: string;
  content: string;
  tag: string;
};

const initialDraft: DraftNote = {
  title: "",
  content: "",
  tag: "Todo",
};

type NoteStore = {
  draft: DraftNote;
  setDraft: (note: Partial<DraftNote>) => void;
  clearDraft: () => void;
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) =>
        set((state) => ({
          draft: { ...state.draft, ...note },
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft", 
    }
  )
);