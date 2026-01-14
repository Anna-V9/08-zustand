import axios from "axios";
import type { Note, NoteTag } from "../types/note";

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const BASE_URL = "https://notehub-public.goit.study/api/notes";

export interface NotesResponse{
    notes: Note[];
    totalPages: number;
}

export interface CreateNotePayload{
    title: string;
    content?: string;
    tag: NoteTag;
}

export interface DeleteNoteResponse{
    note: Note;
}

export async function fetchNotes(
page: number, perPage: number, search?: string, tag?: NoteTag ): Promise<NotesResponse> {
    const response = await axios.get<NotesResponse>(
        BASE_URL, {
        params: {
            page,
            perPage,
            search,
            ...(tag ? { tag }:{}),
        },
        headers: {
            Authorization: `Bearer ${myKey}`,
        }
    });
    return response.data;
}

export async function createNote(payload:CreateNotePayload):Promise<Note> {
    const response = await axios.post<Note>(
        BASE_URL, payload, {
        headers: {
            Authorization: `Bearer ${myKey}`,
        }
    });
    return response.data;
}

export async function deleteNote(noteId:string):Promise<Note> {
    const response = await axios.delete<DeleteNoteResponse>(
        `${BASE_URL}/${noteId}`, {
        headers: {
            Authorization: `Bearer ${myKey}`,
        }
    });
    return response.data.note;
};

export async function fetchNoteById(noteId:string):Promise<Note> {
    const response = await axios.get<Note>(
        `${BASE_URL}/${noteId}`, {
        headers: {
            Authorization: `Bearer ${myKey}`,
        },
    }
    );

    return response.data;
}