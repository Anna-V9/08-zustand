'use client';

import { fetchNoteById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import css from "./NoteDetails.module.css";

export default function NoteDetailsClient() {
    const params = useParams<{ id: string }>();
    const id = params?.id;

    const {
        data: note,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id!),
        enabled: Boolean(id),
        refetchOnMount: false,
    });

    if (isLoading) return <p>Loading, please wait...</p>;

    if (error || !note) return <p>Something went wrong.</p>;

    const formattedDate = note.updatedAt
        ? `Updated at: ${note.updatedAt}`
        : `Created at: ${note.createdAt}`;
    
    return (
        <div className={css.container}>
            <div className={css.item}>
                <div className={css.header}>
                    <h2>{note.title}</h2>
                </div>
                <p className={css.content}>{note.content}</p>
                <p className={css.date}>{formattedDate}</p>
            </div>
        </div>
    );
}