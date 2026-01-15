import { fetchNoteById } from "@/lib/api";
import type { Metadata } from "next";
import NoteDetailsClient from "./NoteDetails.client";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = await fetchNoteById(params.id);

  const title = note?.title
    ? `NoteHub - ${note.title}`
    : "NoteHub - Note Details";

  const description = note?.content
    ? note.content.slice(0, 160) + "..."
    : "Detailed view of your note.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://yourdomain.com/notes/${params.id}`,
      images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
    },
  };
}


export default function NoteDetailsPage() {
  return <NoteDetailsClient />;
}