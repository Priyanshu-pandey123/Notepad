
import React from 'react';
import GroupList from './components/GroupList';
import NoteList from './components/NoteList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col md:flex-row h-screen bg-gray-200">
        <GroupList />
        <main className="flex-1">
          <Routes>
            <Route path="/group/:groupId" element={<NoteList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
