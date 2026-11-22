
import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList
} from 'react-native';

import {
    useRouter,
    useLocalSearchParams,
    useFocusEffect
} from 'expo-router';

import { useAuth } from '../Context/AuthContext';
import { getNotes, deleteNote } from '../Storage/NoteStorage';
import { Note } from '../Types/Note';

export default function CategoryNotes() {

    const router = useRouter();

    const { category } = useLocalSearchParams<{
        category: string;
    }>();

    const { user } = useAuth();

    const [notes, setNotes] = useState<Note[]>([]);

    // Load notes belonging to the selected category
    const loadNotes = async () => {
        try {
            const allNotes = await getNotes();

            const categoryNotes = allNotes.filter(
                (note) =>
                    note.userId === user?.id &&
                    note.category === category
            );

            setNotes(categoryNotes);

        } catch (error) {
            console.log('Error loading category notes:', error);
        }
    };

    // Refresh the page whenever it opens
    useFocusEffect(
        useCallback(() => {
            loadNotes();
        }, [user, category])
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

    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.backButton}>← Back</Text>
                </TouchableOpacity>

                <Text style={styles.title}>{category} Notes</Text>
            </View>

            {notes.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyTitle}>
                        No {category} notes yet
                    </Text>

                    <Text style={styles.emptyText}>
                        Notes added to this category will appear here.
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
        marginTop: 25,
        marginBottom: 25
    },
    backButton: {
        color: '#526D9B',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 20
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#243B55'
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
        marginTop: 8,
        textAlign: 'center'
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
    date: {
        color: '#888',
        fontSize: 12,
        marginBottom: 12
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
    deleteButton: {
        color: '#D9534F',
        fontWeight: 'bold'
    }
});
