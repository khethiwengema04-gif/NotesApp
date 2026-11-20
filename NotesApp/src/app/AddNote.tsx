
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../Context/AuthContext';
import { addNote } from '../Storage/NoteStorage';
import { Note } from '../Types/Note';

export default function AddNote() {

    const router = useRouter();
    const { user } = useAuth();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('Personal');

    const handleSaveNote = async () => {

        if (!content.trim()) {
            Alert.alert('Error', 'Please enter your note');
            return;
        }

        if (!user) {
            Alert.alert('Error', 'Please login first');
            return;
        }

        const newNote: Note = {
            id: Date.now().toString(),
            userId: user.id,
            title: title.trim(),
            content: content.trim(),
            category: category,
            dateAdded: new Date().toISOString()
        };

        try {
            await addNote(newNote);

            Alert.alert('Success', 'Your note has been saved');

            router.replace('/Home');

        } catch (error) {
            Alert.alert('Error', 'Could not save your note');
        }
    };

    return (
        <View style={styles.container}>

            <Text style={styles.heading}>Add New Note</Text>

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
                onPress={handleSaveNote}
            >
                <Text style={styles.saveButtonText}>Save Note</Text>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        backgroundColor: '#F8F9FC'
    },
    heading: {
        fontSize: 27,
        fontWeight: 'bold',
        color: '#243B55',
        marginBottom: 25
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#243B55',
        marginBottom: 10
    },
    input: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DDD',
        marginBottom: 20
    },
    textArea: {
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DDD',
        height: 150,
        marginBottom: 20
    },
    categories: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30
    },
    categoryButton: {
        paddingVertical: 12,
        paddingHorizontal: 18,
        borderRadius: 20,
        backgroundColor: '#E5EAF2'
    },
    selectedCategory: {
        backgroundColor: '#526D9B'
    },
    categoryText: {
        color: '#243B55',
        fontWeight: 'bold'
    },
    selectedText: {
        color: '#FFFFFF'
    },
    saveButton: {
        backgroundColor: '#526D9B',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center'
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold'
    },
    cancelButton: {
        padding: 15,
        alignItems: 'center'
    },
    cancelText: {
        color: '#526D9B',
        fontWeight: 'bold'
    }
});
