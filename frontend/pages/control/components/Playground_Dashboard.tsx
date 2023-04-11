import React, { useEffect, useRef, useState } from "react";
import Create_Playground from "./Create_Playground";
import axios, { AxiosResponse } from "axios";
import { PlaygroundProps, PropsAuth } from "@/types/ProjectInfoProps";
import Delete_Playground from "./Delete_Playground";

export default function Playground_Dashboard({ authToken }: PropsAuth) {
  const [playgroundData, setPlaygroundData] = useState<PlaygroundProps[]>([]);
  const [playgroundInfo, setPlaygroundInfo] = useState({
    name: "",
    content: "",
    tools: "",
    playground_id: "",
  });
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    axios
      .get(`${APIURL}/api/playground`)
      .then((result: AxiosResponse) => {
        // console.log("result Playground", result.data);
        setPlaygroundData(result.data);
      });
  }, [APIURL]);

  return (
    <div className="flex flex-row">
      <div className="w-96 mx-auto">
        <div className="flex flex-row flex-wrap">
          {playgroundData &&
            playgroundData.map((info) => {
              return (
                <ul key={info.playground_id} className="flex flex-row mb-5">
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setPlaygroundInfo((prevForm) => ({
                          ...prevForm,
                          name: info.name,
                          content: info.content,
                          link: info.link,
                          tools: info.tools,
                          playground_id: String(info.playground_id),
                        }));
                      }}
                    >
                      {info.playground_id}
                    </button>
                  </li>
                </ul>
              );
            })}
        </div>
        <ul className="flex flex-col gap-3 h-52">
          <li>
            <span className="font-bold">name:</span> {playgroundInfo.name}
          </li>
          <li>
            <span className="font-bold">content:</span> {playgroundInfo.content}
          </li>
          <li>
            <span className="font-bold">tools:</span> {playgroundInfo.tools}
          </li>
          <li>
            <span className="font-bold">id:</span>{" "}
            {playgroundInfo.playground_id}
          </li>
        </ul>
      </div>
      <div className="flex flex-col">
        <Create_Playground authToken={authToken} />
        {authToken && (
          <Delete_Playground
            authToken={authToken}
            playgroundData={playgroundData}
          />
        )}
      </div>
    </div>
  );
}
