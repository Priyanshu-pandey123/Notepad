


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newGroup, setNewGroup] = useState({ name: '', color: '#FFFFFF' });

  useEffect(() => {
    axios.get('http://localhost:8000/groups')
      .then(response => setGroups(response.data))
      .catch(error => console.error(error));
  }, []);

  const createGroup = () => {
    if (newGroup.name.trim()) {
      axios.post('http://localhost:8000/groups', newGroup)
        .then(response => {
          setGroups([...groups, response.data]);
          setShowModal(false);
          setNewGroup({ name: '', color: '#FFFFFF' });
        })
        .catch(error => console.error(error));
    }
  };

  const getGroupIcon = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('');
  };

  return (
    <div className="w-full md:w-1/4 bg-white border-2 border-black p-4 md:border-r flex flex-col h-screen">
      <div className="flex-grow overflow-y-auto">
        {groups.map(group => (
          <Link to={`/group/${group._id}`} key={group._id}>
            <div className="flex items-center p-2 rounded mb-2 cursor-pointer" style={{ backgroundColor: group.color }}>
              <div className="w-10 h-10 flex items-center justify-center bg-white text-black font-bold rounded-full mr-2">
                {getGroupIcon(group.name)}
              </div>
              <span className="text-black font-medium">{group.name}</span>
            </div>
          </Link>
        ))}
      </div>

    <div className=' flex justify-end'>
    <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white rounded-full w-14 h-14 ">
        +
      </button>
    </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white p-4 rounded shadow-md w-11/12 md:w-1/3" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg mb-4">Create New Group</h2>
            <input
              type="text"
              placeholder="Group Name"
              className="border p-2 w-full mb-2"
              value={newGroup.name}
              onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
            />
            <div className="flex space-x-2 mb-4">
              {['#FF5252', '#FF4081', '#E040FB', '#7C4DFF', '#536DFE', '#448AFF', '#40C4FF'].map(color => (
                <button
                  key={color}
                  onClick={() => setNewGroup({ ...newGroup, color })}
                  style={{ backgroundColor: color }}
                  className={`w-8 h-8 rounded-full ${newGroup.color === color ? 'ring-2 ring-black' : ''}`}
                />
              ))}
            </div>
            <div className="flex justify-end">
              <button
                onClick={createGroup}
                className="bg-blue-500 text-white py-2 px-4 rounded mr-2">
                Create
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="py-2 px-4 rounded border">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupList;


