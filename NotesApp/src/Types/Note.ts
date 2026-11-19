
export interface Note {
    id: string;
    userId: string;
    title: string;
    content: string;
    category: string;
    dateAdded: string;
    dateEdited?: string;
}
