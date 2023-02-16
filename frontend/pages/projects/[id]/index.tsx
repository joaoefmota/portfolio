import useAxios from "@/pages/hooks/useAxios";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

import github from "@/assets/images/github.png";
import back from "@/assets/images/back.png";

import styles from "@/styles/projects.module.scss";

export interface ProjectInfoProps {
  packages: string;
  tools: string;
  link: string;
  name: string;
  content: string;
}

export default function ProjectPage() {
  const router = useRouter();
  const { id } = router.query;

  const APIURL = "http://localhost:5005";
  const [projectImage, setProjectImage] = useState<string>();
  const [projectInfo, setProjectInfo] = useState<[]>();

  const project = useAxios<any>({
    url: id != null ? `${APIURL}/project-nr?id=${id}` : null,
    initialValue: undefined,
    transform: ([project]) => {
      if (project == null) return undefined;
      setProjectInfo(project);
      return axios
        .get(`${APIURL}/images/?project=${project.name}`)
        .then((result) => {
          const [imgData] = result.data;
          console.log("imgData", imgData);
          setProjectImage(APIURL + imgData.source);
        });
    },
  });

  console.log("projectInfo", projectInfo);

  const tools =
    projectInfo != undefined ? projectInfo.tools.split(", ") : undefined;
  if (project == null) return <p>Loading</p>;
  const packages =
    projectInfo.packages != null ? projectInfo.packages.split(", ") : undefined;

  return (
    <section id={`Project${id}`}>
      <div className={`${"mainBlock"}`} key={project.id}>
        <div className="flex flex-col items-left">
          <h1 className={"title"}>{projectInfo.name}</h1>
          <div className="flex flex-row gap-10">
            {projectImage != null ? (
              <Link href={projectInfo.link}>
                <Image
                  src={projectImage}
                  alt={project.name}
                  width={500}
                  height={500}
                  className="rounded h-full mb-2"
                />
              </Link>
            ) : (
              <div style={{ width: 500, height: 500 }}>Loading image</div>
            )}
            <div className="flex flex-col gap-5">
              <Link href={projectInfo.link}>
                <h2 className="text-5xl">{projectInfo.subTitle}</h2>
              </Link>
              <p className="text-left text-paragraph text-xl paragraph">
                {projectInfo.content}
              </p>
            </div>
          </div>

          <div className="flex flex-row gap-3 mt-3 w-3/4">
            <div className="flex flex-col w-1/2 gap-2">
              <h2 className="text-4xl">Tools</h2>
              <div className="grid grid-rows-2 grid-flow-col w-3/4">
                {(tools ?? []).map((tool) => (
                  <p className={"text-2xl"} key={tool}>
                    {tool}
                  </p>
                ))}
              </div>
            </div>
            {projectInfo.packages != null ? (
              <div className="flex flex-col w-1/2 gap-3">
                <h2 className="text-4xl">Packages</h2>
                <div className="grid grid-rows-2 grid-flow-col">
                  {(packages ?? []).map((pack) => (
                    <p className={"text-2xl"} key={pack}>
                      {pack}
                    </p>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div>
        <Link
          href={projectInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className="github"
        >
          <Image src={github} width={100} />
        </Link>
      </div>
      <div>
        <Link href={"/#Projects"} className="back">
          <Image src={back} width={50} />
        </Link>
      </div>
      <div role="tablist" className={styles.projectSlider}>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
        <button></button>
      </div>
    </section>
  );
}
