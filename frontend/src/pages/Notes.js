import React, { useEffect, useState } from "react";

const ViewNotes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/notes");
        const data = await res.json();
        setNotes(data);
      } catch (err) {
        console.error("Failed to fetch notes:", err);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Available Notes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notes.map((note) => (
          <div key={note._id} className="p-4 border rounded-xl shadow">
            <h3 className="font-semibold text-lg">{note.title}</h3>
            <p className="text-sm text-gray-700 mt-2">{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewNotes;
