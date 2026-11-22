
import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatList
} from 'react-native';

import { useRouter, useFocusEffect } from 'expo-router';
import { useAuth } from '../Context/AuthContext';
import { getNotes, deleteNote } from '../Storage/NoteStorage';
import { Note } from '../Types/Note';

export default function Home() {

    const router = useRouter();
    const { user, logout } = useAuth();

    const [notes, setNotes] = useState<Note[]>([]);
    const [searchText, setSearchText] = useState('');
    const [sortOrder, setSortOrder] = useState('newest');

    // Load the logged-in user's notes
    const loadNotes = async () => {
        try {
            const allNotes = await getNotes();

            const userNotes = allNotes.filter(
                (note) => note.userId === user?.id
            );

            setNotes(userNotes);
        } catch (error) {
            console.log('Error loading notes:', error);
        }
    };

    // Refresh notes whenever Home opens
    useFocusEffect(
        useCallback(() => {
            loadNotes();
        }, [user])
    );

    // Delete a note
    const handleDelete = async (id: string) => {
        try {
            await deleteNote(id);

            setNotes((currentNotes) =>
                currentNotes.filter((note) => note.id !== id)
            );
        } catch (error) {
            console.log('Error deleting note:', error);
        }
    };

    // Search notes by title or content
    const filteredNotes = notes.filter((note) => {
        const search = searchText.toLowerCase();

        return (
            note.title.toLowerCase().includes(search) ||
            note.content.toLowerCase().includes(search)
        );
    });

    // Sort notes by date added
    const sortedNotes = [...filteredNotes].sort((a, b) => {
        if (sortOrder === 'oldest') {
            return new Date(a.dateAdded).getTime() -
                new Date(b.dateAdded).getTime();
        }

        return new Date(b.dateAdded).getTime() -
            new Date(a.dateAdded).getTime();
    });

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

            {/* Search bar */}
            <TextInput
                style={styles.searchInput}
                placeholder="Search your notes..."
                value={searchText}
                onChangeText={setSearchText}
            />

            {/* Sorting options */}
            <View style={styles.sortContainer}>
                <Text style={styles.sortLabel}>Sort by date:</Text>

                <View style={styles.sortButtons}>
                    <TouchableOpacity
                        style={[
                            styles.sortButton,
                            sortOrder === 'newest' && styles.activeSortButton
                        ]}
                        onPress={() => setSortOrder('newest')}
                    >
                        <Text style={[
                            styles.sortButtonText,
                            sortOrder === 'newest' && styles.activeSortText
                        ]}>
                            Newest First
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.sortButton,
                            sortOrder === 'oldest' && styles.activeSortButton
                        ]}
                        onPress={() => setSortOrder('oldest')}
                    >
                        <Text style={[
                            styles.sortButtonText,
                            sortOrder === 'oldest' && styles.activeSortText
                        ]}>
                            Oldest First
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {sortedNotes.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyTitle}>
                        {searchText ? 'No matching notes' : 'No notes yet'}
                    </Text>

                    <Text style={styles.emptyText}>
                        {searchText
                            ? 'Try searching with another word.'
                            : 'Start by adding your first note.'}
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={sortedNotes}
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

                            <View style={styles.noteActions}>
                                <TouchableOpacity
                                    onPress={() => router.push({
                                        pathname: '/EditNote',
                                        params: { id: item.id }
                                    })}
                                >
                                    <Text style={styles.editButton}>
                                        Edit Note
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => handleDelete(item.id)}
                                >
                                    <Text style={styles.deleteButton}>
                                        Delete Note
                                    </Text>
                                </TouchableOpacity>
                            </View>

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
        marginBottom: 15
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold'
    },
    searchInput: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E1E5EC',
        borderRadius: 10,
        padding: 14,
        fontSize: 15,
        marginBottom: 20
    },
    sortContainer: {
        marginBottom: 15
    },
    sortLabel: {
        color: '#243B55',
        fontWeight: 'bold',
        marginBottom: 10
    },
    sortButtons: {
        flexDirection: 'row',
        gap: 10
    },
    sortButton: {
        paddingVertical: 9,
        paddingHorizontal: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#526D9B',
        backgroundColor: '#FFFFFF'
    },
    activeSortButton: {
        backgroundColor: '#526D9B'
    },
    sortButtonText: {
        color: '#526D9B',
        fontWeight: 'bold'
    },
    activeSortText: {
        color: '#FFFFFF'
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
    },
    noteActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5
    },
    editButton: {
        color: '#526D9B',
        fontWeight: 'bold'
    },
});
