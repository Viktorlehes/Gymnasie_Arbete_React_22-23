import React from "react";
import { Form } from "react-router-dom";
import Popup from "reactjs-popup";

export function AddTodo() {

  return (
    <Popup
      trigger={
        <button className="collection-add-button">
          <p>Add New Todo!</p>
        </button>
      }
      position="right top"
    >
      {
        <Form method="post">
          <input
            type="text"
            name="todoName"
            className="form-control"
            placeholder="Enter your todo here!"
          />
          <button type="submit" name="intent" value="create" className="add-todo">
            Add Todo!
          </button>
        </Form>
      }
    </Popup>
  );
}
