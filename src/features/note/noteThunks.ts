import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Note } from './noteSlice';

// Fetch all notes
export const fetchNotes = createAsyncThunk<Note[], void, { rejectValue: string }>(
  'notes/fetchNotes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/notes');
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch notes');
    }
  }
);

// Add a new note
export const addNoteAsync = createAsyncThunk<Note, Note, { rejectValue: string }>(
  'notes/addNote',
  async (newNote, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/notes', newNote);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to add note');
    }
  }
);

// Update an existing note
export const updateNoteAsync = createAsyncThunk<Note, Note, { rejectValue: string }>(
  'notes/updateNote',
  async (updatedNote, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/notes/${updatedNote.id}`, updatedNote);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to update note');
    }
  }
);

// Delete a note
export const deleteNoteAsync = createAsyncThunk<number, number, { rejectValue: string }>(
  'notes/deleteNote',
  async (noteId, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/notes/${noteId}`);
      return noteId;
    } catch (error) {
      return rejectWithValue('Failed to delete note');
    }
  }
);
