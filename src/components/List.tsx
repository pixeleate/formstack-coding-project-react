import React, { useState, useEffect } from "react";

const List = () => {
  const [documents, setDocuments] = useState();

  const fetchDocuments = async () => {
    const result = await fetch(
      "https://7qd991098a.execute-api.us-east-1.amazonaws.com/dev/documents",
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    const documents = await result.json();
    setDocuments(documents.items);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="list-container">
      <h3>Available documents</h3>
      <ul>
        {documents &&
          documents.map((document: any, idx: number) => {
            const { name, ...rest } = document;
            return (
              <li key={idx}>
                <div>
                  {document.name}
                  <div>
                    <p>Properties</p>
                    <pre>
                      <code>{JSON.stringify(rest, undefined, 2)}</code>
                    </pre>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default List;
