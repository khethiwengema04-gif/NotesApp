
import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Alert
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useAuth } from '../Context/AuthContext';
import { getNotes, deleteNote } from '../Storage/NoteStorage';
import { Note } from '../Types/Note';

export default function Home() {

    const router = useRouter();
    const { user, logout } = useAuth();

    const [notes, setNotes] = useState<Note[]>([]);

    // Load the logged-in user's notes
    const loadNotes = async () => {
        const allNotes = await getNotes();

        const userNotes = allNotes.filter(
            (note) => note.userId === user?.id
        );

        setNotes(userNotes);
    };

    // Refresh notes whenever Home opens
    useFocusEffect(
        useCallback(() => {
            loadNotes();
        }, [user])
    );

    // Delete a note
    const handleDelete = (id: string) => {
        Alert.alert(
            'Delete Note',
            'Are you sure you want to delete this note?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        await deleteNote(id);
                        loadNotes();
                    }
                }
            ]
        );
    };

    // Logout
    const handleLogout = async () => {
        await logout();
        router.replace('/Login');
    };

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>My Notes</Text>
                    <Text style={styles.subtitle}>
                        Hello, {user?.username}!
                    </Text>
                </View>

                <TouchableOpacity onPress={handleLogout}>
                    <Text style={styles.logout}>Logout</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => router.push('/AddNote')}
            >
                <Text style={styles.addButtonText}>+ Add New Note</Text>
            </TouchableOpacity>

            {notes.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyTitle}>No notes yet</Text>
                    <Text style={styles.emptyText}>
                        Start by adding your first note.
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={notes}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.noteCard}>

                            <Text style={styles.noteTitle}>
                                {item.title || 'Untitled Note'}
                            </Text>

                            <Text style={styles.noteContent}>
                                {item.content}
                            </Text>

                            <Text style={styles.category}>
                                {item.category}
                            </Text>

                            <Text style={styles.date}>
                                Added: {new Date(item.dateAdded).toLocaleDateString()}
                            </Text>

                            <TouchableOpacity
                                onPress={() => handleDelete(item.id)}
                            >
                                <Text style={styles.deleteButton}>Delete Note</Text>
                            </TouchableOpacity>

                        </View>
                    )}
                />
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F8F9FC'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
        marginTop: 20
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#243B55'
    },
    subtitle: {
        fontSize: 15,
        color: '#777',
        marginTop: 5
    },
    logout: {
        color: '#526D9B',
        fontWeight: 'bold'
    },
    addButton: {
        backgroundColor: '#526D9B',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold'
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyTitle: {
        fontSize: 21,
        fontWeight: 'bold',
        color: '#243B55'
    },
    emptyText: {
        color: '#777',
        marginTop: 8
    },
    noteCard: {
        backgroundColor: '#FFFFFF',
        padding: 18,
        borderRadius: 12,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#E1E5EC'
    },
    noteTitle: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#243B55',
        marginBottom: 8
    },
    noteContent: {
        fontSize: 15,
        color: '#555',
        marginBottom: 12
    },
    category: {
        color: '#526D9B',
        fontWeight: 'bold',
        marginBottom: 8
    },
    date: {
        color: '#888',
        fontSize: 12,
        marginBottom: 12
    },
    deleteButton: {
        color: '#D9534F',
        fontWeight: 'bold'
    }
});
