import React, { useState } from "react";

function Projects({_setFolder}) {
  const [data, setData] = useState("")

  function _handleSubmit(w) {
    w.preventDefault()
    _setFolder(data);
  }

  return (
    <div className="wrapper-projects">
      <section className="wrapper-projects-add">
        <span className="material-symbols-outlined projects-item">chevron_right</span>
        <h2 className="wrapper-projects-item projects-item">Projects</h2>
        <span id="project-item-add" className="material-symbols-outlined projects-item">add</span>
      </section>
      
      <details>
        <summary>school stuff</summary>
        <p>Collection one</p>
        <p className="add-collection">Add Collection</p>
        <form onSubmit={_handleSubmit}>
        <input onChange={(e)=>setData(e.target.value)}></input>
        </form>
      </details>
    </div>
  );
}

export default Projects;