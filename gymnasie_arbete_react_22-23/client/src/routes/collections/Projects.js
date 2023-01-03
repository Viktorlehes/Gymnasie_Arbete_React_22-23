import React from "react";
import { Link, Form } from "react-router-dom";
import { AddCollection } from "./NewCollection";
import Popup from "reactjs-popup";

export function Projects({ collections }) {
  return (
    <div className="wrapper-projects">
      <section className="wrapper-projects-add">
        <h2 className="wrapper-projects-item projects-item">Projects</h2>
        <AddCollection />
      </section>

      <ul>
        {collections.map(({ folder_name, _id }) => {
          return (
            <li className="projects-item collection-item-wrapper" key={_id}>
              <Link to={`/home/${_id}`}>{folder_name}</Link>
              <div className="todo-button-wrapper">
                <Popup
                  trigger={
                    <button className="collection-add-button">
                      <span className="material-symbols-outlined projects-item">
                        edit
                      </span>
                    </button>
                  }
                  position="right top"
                >
                  {
                    <Form method="post">
                      <input type={"hidden"} name="folderId" value={_id} />
                      <input
                        type="text"
                        name="newCollectionName"
                        placeholder="Edit collection here!"
                        className="form-control"
                      />
                      <button
                        type="submit"
                        name="intent"
                        value="edit"
                        className="edit-todo"
                      >
                        Update
                      </button>
                    </Form>
                  }
                </Popup>

                <Form method="post">
                  <input type={"hidden"} name="folderId" value={_id} />
                  <button
                    type="submit"
                    name="intent"
                    value="remove"
                    className="remove-todo"
                  >
                    <span className="material-symbols-outlined projects-item">
                      close
                    </span>
                  </button>
                </Form>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
