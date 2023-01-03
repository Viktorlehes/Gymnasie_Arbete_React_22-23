import React from "react";
import { Form, useActionData } from "react-router-dom";
import Popup from "reactjs-popup";

export function AddCollection() {
  const errors = useActionData();

  return (
    <Popup
      trigger={
        <button className="collection-add-button">
          <span
            id="project-item-add"
            className="material-symbols-outlined projects-item"
          >
            add
          </span>
        </button>
      }
      position="right top"
    >
      {
        <Form method="post">
          <input
            type="text"
            name="collectionName"
            className="form-control"
            placeholder="Collection Name"
          />
          {errors?.collectionName && (
            <p className="error-message">{errors.collectionName} </p>
          )}
          <button
            type="submit"
            className="add-collection"
            name="intent"
            value="new"
          >
            Add Collection
          </button>
        </Form>
      }
    </Popup>
  );
}
