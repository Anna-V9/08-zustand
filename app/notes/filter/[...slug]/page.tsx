import { fetchNotes } from "@/lib/api";
import type { NoteTag } from "@/types/note";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotesClient from "./Notes.client";

const PER_PAGE = 12;

type Props = {
    params: Promise<{ slug: string[] }>;
}

export default async function NotesByTag({params}:Props) {
    const { slug } = await params;
    const value = slug[0] ?? "all";
    const tag: NoteTag | undefined = value === "all" ? undefined : (value as NoteTag);
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["notes", 1, "", tag ?? "all"],
        queryFn: () => fetchNotes(1, PER_PAGE, undefined, tag),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient tag={tag}/>
        </HydrationBoundary>
    )
}