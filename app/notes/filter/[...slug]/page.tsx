import type { Metadata } from "next";
import type { NoteTag } from "@/types/note";
import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params;

  const value = slug?.[0] ?? "all";

  const tag: NoteTag | undefined =
    value === "all" ? undefined : (value as NoteTag);

  const title = tag
    ? `NoteHub - Notes filtered by "${tag}"`
    : "NoteHub - All Notes";

  const description = tag
    ? `Viewing notes filtered by "${tag}" in NoteHub.`
    : "Viewing all notes in NoteHub.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://yourdomain.com/notes/filter/${value}`,
      images: [
        "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      ],
    },
  };
}

export default function FilteredNotesPage() {
  return <NotesClient />;
}