import React, { useState } from "react";

const Get = () => {
  const [formValues, setFormValues] = useState({ id: "" });
  const [document, setDocument] = useState();

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const result = await fetch(
      `https://7qd991098a.execute-api.us-east-1.amazonaws.com/dev/documents/${
        formValues.id
      }`,
      {
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
          <button className="btn-create-document" type="submit">
            Get Document
          </button>
        </form>
        {document && (
          <div className="document">
            {document.item.Item.name}
            <div>
              <p>Properties</p>
              <pre>
                <code>{JSON.stringify(document.item.Item, undefined, 2)}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Get;
