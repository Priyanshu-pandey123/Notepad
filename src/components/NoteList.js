import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const NoteList = () => {
  const { groupId } = useParams();
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8000/notes/${groupId}`)
      .then(response => setNotes(response.data))
      .catch(error => console.error(error));
  }, [groupId]);

  const addNote = () => {
    if (newNote.trim()) {
      axios.post('http://localhost:8000/notes', { content: newNote, groupId })
        .then(response => {
          setNotes([...notes, response.data]);
          setNewNote('');
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <div className="flex flex-col h-screen border-2 border-red-500">
      <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
        {notes.map(note => (
          <div key={note._id} className="p-4 border-b">
            <p>{note.content}</p>
            <small className="text-gray-600">{new Date(note.createdAt).toLocaleString()}</small>
          </div>
        ))}
      </div>
      <div className="bg-white p-4 flex items-center justify-between border-t" style={{ boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)' }}>
        <input
          type="text"
          placeholder="Enter your text here..."
          className="border-none outline-none flex-grow p-3 text-gray-600 rounded-lg"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          style={{ backgroundColor: '#f4f4f4' }}
        />
        <button
          onClick={addNote}
          disabled={!newNote.trim()}
          className="ml-2 bg-transparent text-gray-600 p-2 rounded-full"
          style={{ border: 'none', background: 'transparent' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NoteList;


















