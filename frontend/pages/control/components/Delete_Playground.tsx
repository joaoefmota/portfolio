import { PlaygroundProps, PropsAuth } from "@/types/ProjectInfoProps";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface DeleteProps {
  playgroundData: PlaygroundProps[];
  authToken: string;
}

export default function Delete_Playground({
  authToken,
  playgroundData,
}: DeleteProps) {
  const [playgroundId, setPlaygroundId] = useState<string>("");
  const [projectName, setProjectName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    axios
      .delete(`http://localhost:5005/api/playground-nr/?id=${playgroundId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((result) => {
        if (result === undefined) {
          console.error("No data was submited");
        }
        setIsSubmitted(true);
      })
      .catch((error) => {
        if (error) {
          console.error("error", error);
        }
      });
  };

  const handleId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setPlaygroundId(selectedId);
    console.log(
      "find Name",
      playgroundData.find((info) => info.playground_id === selectedId)?.name
    );
    setProjectName(
      playgroundData.find((info) => info.playground_id === selectedId)?.name ||
        ""
    );
  };

  useEffect(() => {
    console.log("playgroundId", playgroundId);
    console.log("projectName", projectName);
    console.log("playgroundData", playgroundData);
  }, [playgroundData, playgroundId, projectName]);

  return (
    <article>
      <h2 className="title text-center">Delete a Playground</h2>
      <div className="flex flex-row flex-wrap justify-center items-center gap-5">
        <select title="playground_id" value={playgroundId} onChange={handleId}>
          <option value="">---</option>
          {playgroundData && playgroundData.map((info) => (
            <option key={info.playground_id} value={info.playground_id}>
              {info.playground_id}
            </option>
          ))}
        </select>
        {playgroundId && (
          <>
            <button type="button" onClick={handleSubmit}>
              Submit
            </button>
          </>
        )}
      </div>
      {isSubmitted && (
        <div
          className={"w-fit mx-auto mt-1 py-4 px-6  rounded-3xl bg-slate-700 "}
        >
          <p
            className={
              "text-white text-center sm:text-xl md:text-2xl xl:text-2xl"
            }
          >
            Playground Sumbitted ✔
          </p>
          <p
            className={
              "text-white text-center sm:text-xl md:text-2xl xl:text-2xl"
            }
          >
            You are awesome!
          </p>
        </div>
      )}
    </article>
  );
}

/*

      {playgroundData &&
        playgroundData.map((info) => {
          return (
            <button
              type="button"
              key={info.playground_id}
              onClick={() =>
                handleId({ target: { value: info.playground_id.toString() } })
              }
            >
              {info.playground_id}
            </button>
          );
        })}

*/
