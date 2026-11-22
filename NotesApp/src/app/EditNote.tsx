
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

    // Save updated note
    const handleUpdate = async () => {

        if (!content.trim()) {
            Alert.alert('Error', 'Please enter your note');
            return;
        }

        if (!note) {
            Alert.alert('Error', 'Note not found');
            return;
        }

        const updatedNote: Note = {
            ...note,
            title: title.trim(),
            content: content.trim(),
            category: category,
            dateEdited: new Date().toISOString()
        };

        try {
            await updateNote(updatedNote);

            Alert.alert('Success', 'Note updated successfully');

            router.replace('/Home');

        } catch (error) {
            Alert.alert('Error', 'Could not update note');
        }
    };

    if (!note) {
        return (
            <View style={styles.container}>
                <Text>Loading note...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>

            <Text style={styles.heading}>Edit Note</Text>

            <Text style={styles.label}>Note Title</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter note title"
                value={title}
                onChangeText={setTitle}
            />

            <Text style={styles.label}>Your Note</Text>

            <TextInput
                style={styles.textArea}
                placeholder="Write your note here..."
                value={content}
                onChangeText={setContent}
                multiline
                textAlignVertical="top"
            />

            <Text style={styles.label}>Select Category</Text>

            <View style={styles.categories}>
                {['Work', 'Study', 'Personal'].map((item) => (
                    <TouchableOpacity
                        key={item}
                        style={[
                            styles.categoryButton,
                            category === item && styles.selectedCategory
                        ]}
                        onPress={() => setCategory(item)}
                    >
                        <Text
                            style={[
                                styles.categoryText,
                                category === item && styles.selectedText
                            ]}
                        >
                            {item}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity
                style={styles.saveButton}
                onPress={handleUpdate}
            >
                <Text style={styles.saveButtonText}>Update Note</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => router.back()}
            >
                <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

        </View>
    );
}

