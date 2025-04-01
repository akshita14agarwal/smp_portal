import { useState } from "react";
import axios from "axios";

const ViewNotes = () => {
    const [subject, setSubject] = useState("");
    const [notes, setNotes] = useState([]);

    const fetchNotes = async () => {
        const res = await axios.get(`http://localhost:5000/api/notes/view?subject=${subject}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setNotes(res.data);
    };

    return (
        <div>
            <h2>View Notes</h2>
            <select onChange={(e) => setSubject(e.target.value)}>
                <option value="">All Subjects</option>
                <option value="Math">Math</option>
                <option value="Physics">Physics</option>
                <option value="CS">Computer Science</option>
            </select>
            <button onClick={fetchNotes}>View Notes</button>

            <ul>
                {notes.map((note) => (
                    <li key={note._id}>
                        <h3>{note.title}</h3>
                        <p>Subject: {note.subject}</p>
                        <p>Uploaded by: {note.uploadedBy?.name || "Unknown"}</p>
                        <a href={`http://localhost:5000/${note.filePath}`} target="_blank" rel="noopener noreferrer">
                            📄 View PDF
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewNotes;
