import React from "react";

interface ProjectProps {
  projectData: {
    project_id: number;
  };
}

export default function Delte_Project({ projectData }: ProjectProps) {
  return (
    <article>
      <h2 className="title text-center">Delete Project</h2>
      <form className="grid grid-cols-2 items-center justify-center">
        <div className="flex flex-col items-center">
          <label>Project id:</label>
          <input
            onChange={() => console.log("do something here")}
            placeholder="Project_id: n"
            value={projectData.project_id}
            name="project_id"
            type="text"
          />
        </div>
        <div className="flex flex-col items-center justify center">
          <button
            onClick={() => console.log("do something when submit the form")}
          >
            Submit Project
          </button>
        </div>
      </form>
    </article>
  );
}
