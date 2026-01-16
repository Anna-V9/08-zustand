import { Metadata } from "next";
import CreateNoteClient from "./CreateNote";

export const metadata: Metadata = {
  title: "NoteHub - Create Note",
  description: "Create a new note in NoteHub.",
  openGraph: {
    title: "NoteHub - Create Note",
    description: "Create a new note in NoteHub.",
    url: "https://yourdomain.com/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      },
    ],
  },
};

const CreateNotePage = () => {
  return <CreateNoteClient />;
};

export default CreateNotePage;