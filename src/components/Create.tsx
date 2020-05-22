import React, { useState, Fragment, useReducer } from "react";

const Create = () => {
  const [formValues, setFormValues] = useState({});
  const [dynamicValues, setDynamicValues] = useReducer(
    (state: any, newState: any) => ({ ...state, ...newState }),
    {}
  );
  const [newFields, setNewFields] = useState<any>([]);

  const addField = () => {
    setNewFields([
      ...newFields,
      <div className="samerow-fields new-field">
        <div className="form-control">
          <label htmlFor="fieldName">Field name</label>
          <input
            required
            id="fieldName"
            type="text"
            placeholder="Enter the field's name"
            name="field-name"
            onChange={onChangeHandlerDynamicField}
          />
        </div>
        <div className="form-control">
          <label htmlFor="fieldValue">Value</label>
          <input
            id="fieldValue"
            type="text"
            placeholder="Enter the field's value"
            name="field-value"
            onChange={onChangeHandlerDynamicField}
          />
        </div>
      </div>
    ]);
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    await fetch(
      "https://7qd991098a.execute-api.us-east-1.amazonaws.com/dev/documents",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...formValues, ...dynamicValues })
      }
    );
  };

  const onChangeHandlerStaticField = (event: any) => {
    const e = event;
    event.persist();
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const onChangeHandlerDynamicField = (event: any) => {
    const e = event;
    event.persist();

    if (e.target.name === "field-value") {
      const keyValue = e.currentTarget.parentElement.previousElementSibling.children[1].value.toLowerCase();
      if (keyValue !== "") {
        setDynamicValues({
          [keyValue]: e.target.value
        });
      }
    }
  };

  return (
    <>
      <div className="alert">
        <p>
          <b>Note:</b> If you use the same ID twice the original document will
          be overwritten
        </p>
      </div>
      <div className="form-container">
        <button className="btn-add" onClick={addField}>
          Add Field
        </button>
        <form onSubmit={submitHandler}>
          <div className="samerow-fields">
            <div className="form-control documentId">
              <label htmlFor="documentId">Document ID</label>
              <input
                required
                id="documentId"
                type="text"
                placeholder="Enter a document ID"
                name="id"
                onChange={onChangeHandlerStaticField}
              />
            </div>
            <div className="form-control documentName">
              <label htmlFor="documentName">Document name</label>
              <input
                required
                id="documentName"
                type="text"
                placeholder="Enter a document name"
                name="name"
                onChange={onChangeHandlerStaticField}
              />
            </div>
          </div>
          {newFields.length !== 0 &&
            newFields.map((field: any, idx: number) => (
              <Fragment key={idx}>{field}</Fragment>
            ))}
          <button className="btn-create-document" type="submit">
            Create Document
          </button>
        </form>
      </div>
    </>
  );
};

export default Create;
