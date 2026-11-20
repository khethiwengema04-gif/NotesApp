
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note } from '../Types/Note';

const NOTES_KEY = 'notes';

// Get all notes
export const getNotes = async (): Promise<Note[]> => {
    const notes = await AsyncStorage.getItem(NOTES_KEY);

    return notes ? JSON.parse(notes) : [];
};

// Save notes
export const saveNotes = async (notes: Note[]) => {
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
};

// Add a new note
export const addNote = async (newNote: Note) => {
    const notes = await getNotes();

    notes.push(newNote);

    await saveNotes(notes);
};

// Update an existing note
export const updateNote = async (updatedNote: Note) => {
    const notes = await getNotes();

    const updatedNotes = notes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
    );

    await saveNotes(updatedNotes);
};

// Delete a note
export const deleteNote = async (id: string) => {
    const notes = await getNotes();

    const updatedNotes = notes.filter((note) => note.id !== id);

    await saveNotes(updatedNotes);
};
