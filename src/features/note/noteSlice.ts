import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchNotes,updateNoteAsync,deleteNoteAsync,addNoteAsync } from "./noteThunks";


export interface Note {
    id: number,
    title: string,
    content: string,
}


interface NotesState {
    notes: Note[],
    loading: boolean,
    error: string | null
}


const initialState: NotesState = {
    notes: [],
    loading: false,
    error: null,
}

const noteSlice = createSlice({
    name: "name",
    initialState,
    reducers: {
        addNote: (state, action: PayloadAction<Note>) => {
            state.notes = [...state.notes, action.payload]
            //state.notes.push(action.payload)
        },
        updateNote: (state, action: PayloadAction<Note>) => {
        const index = state.notes.findIndex(note => note.id === action.payload.id);
         if (index !== -1) {
          state.notes[index] = action.payload;
         }
        },
        deleteNote: (state, action: PayloadAction<number>) => {
        state.notes = state.notes.filter(note => note.id !== action.payload);
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
         state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
         state.error = action.payload;
        }
    },
    extraReducers: (builder) => {
        //fetchNotes
         builder.addCase(fetchNotes.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchNotes.fulfilled, (state, action) => {
               state.notes = action.payload;
            state.loading = false;
            state.error = null;
        });
        builder.addCase(fetchNotes.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        }); 

        // Handle addNoteAsync
        builder.addCase(addNoteAsync.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addNoteAsync.fulfilled, (state, action) => {
            state.notes.push(action.payload);
            state.loading = false;
            state.error = null;
        });
        builder.addCase(addNoteAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Handle updateNoteAsync
        builder.addCase(updateNoteAsync.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateNoteAsync.fulfilled, (state, action) => {
            const index = state.notes.findIndex(note => note.id === action.payload.id);
            if (index !== -1) {
                state.notes[index] = action.payload;
            }
            state.loading = false;
            state.error = null;
        });
        builder.addCase(updateNoteAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Handle deleteNoteAsync
        builder.addCase(deleteNoteAsync.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteNoteAsync.fulfilled, (state, action) => {
            state.notes = state.notes.filter(note => note.id !== action.payload);
            state.loading = false;
            state.error = null;
        });
        builder.addCase(deleteNoteAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    }
})

export const { addNote, updateNote, deleteNote, setLoading, setError } = noteSlice.actions;
export default noteSlice.reducer;