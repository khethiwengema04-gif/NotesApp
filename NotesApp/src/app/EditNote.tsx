
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getNotes, updateNote } from '../Storage/NoteStorage';
import { Note } from '../Types/Note';

export default function EditNote() {

    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();

    const [note, setNote] = useState<Note | null>(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('Personal');

    // Load the selected note
    useEffect(() => {
        const loadNote = async () => {
            const notes = await getNotes();

            const selectedNote = notes.find(
                (item) => item.id === id
            );

            if (selectedNote) {
                setNote(selectedNote);
                setTitle(selectedNote.title);
                setContent(selectedNote.content);
                setCategory(selectedNote.category);
            }
        };

        loadNote();
    }, [id]);


