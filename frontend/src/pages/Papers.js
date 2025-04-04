import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewPreviousPapers = () => {
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    const fetchPapers = async () => {
        try{
      const res = await axios.get('/api/papers');
      setPapers(res.data);
    } catch(err){
        console.error('Failed to fetch papers:', err);
    };
}
    fetchPapers();
  }, []);



  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📄 Previous Year Papers</h2>
      {papers.length === 0 ? (
        <p>No papers uploaded yet.</p>
      ) : (
        <ul className="space-y-4">
          {papers.map((paper) => (
            <li
              key={paper._id}
              className="p-4 border rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{paper.title}</p>
                <p className="text-sm text-gray-600">
                  Uploaded by: {paper.uploadedBy?.name || 'Unknown'}
                </p>
              </div>
              <a
                href={`/${paper.fileUrl.replace(/\\/g, '/')}`} // handling Windows slashes
                download
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Download
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewPreviousPapers;
