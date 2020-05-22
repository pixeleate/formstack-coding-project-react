import React, { useState } from "react";

const Delete = () => {
  const [formValues, setFormValues] = useState({ id: "" });
  const [document, setDocument] = useState({ success: false });

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const result = await fetch(
      `https://7qd991098a.execute-api.us-east-1.amazonaws.com/dev/documents/${
        formValues.id
      }`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const document = await result.json();
    setDocument(document);
  };

  const onChangeHandlerStaticField = (event: any) => {
    const e = event;
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    event.persist();
  };

  return (
    <>
      {document.success && (
        <div className="alert success">
          <p>
            <b>Hooray!</b> the document has been deleted correctly
          </p>
        </div>
      )}
      <div className="form-container">
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="documentId">Document ID</label>
            <input
              id="documentId"
              type="text"
              placeholder="Enter a document ID"
              name="id"
              onChange={onChangeHandlerStaticField}
            />
          </div>
          <button className="btn-delete-document" type="submit">
            Delete Document
          </button>
        </form>
      </div>
    </>
  );
};

export default Delete;
