import useAxios from "@/pages/hooks/useAxios";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { Gallery } from "react-grid-gallery";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

import back from "@/assets/images/back.png";

import styles from "@/styles/projects.module.scss";

export default function ProjectPage() {
  const router = useRouter();
  const { id } = router.query;

  const APIURL = "http://localhost:5005";
  const [restOfImages, setRestOfImages] = useState<[]>();
  const [projectInfo, setProjectInfo] = useState<[]>();
  const [index, setIndex] = useState(-1);

  const project = useAxios<any>({
    url: id != null ? `${APIURL}/project-nr?id=${id}` : null,
    initialValue: undefined,
    transform: ([project]) => {
      if (project == null) return undefined;
      setProjectInfo(project);
      return axios
        .get(`${APIURL}/images/?project=${project.name}`)
        .then((result) => {
          // console.log("Result.data", result.data);
          setRestOfImages(result.data);
        });
    },
  });

  console.log("projectInfo", projectInfo);

  // console.log(    "restOfImages",    restOfImages != undefined      ? restOfImages.map((img) => APIURL + img.source)      : undefined  );

  {
    /* Tools and Packages array */
  }
  const tools =
    projectInfo != undefined ? projectInfo.tools.split(", ") : undefined;
  if (project == null) return <p>Loading</p>;
  const packages =
    projectInfo.packages != null ? projectInfo.packages.split(", ") : undefined;

  const currentImage =
    restOfImages != undefined ? restOfImages[index] : undefined;
  console.log("current Image", currentImage);

  const nextIndex =
    restOfImages != undefined ? (index + 1) % restOfImages.length : undefined;

  const nextImage =
    restOfImages != undefined
      ? restOfImages[nextIndex] || currentImage
      : undefined;

  const prevIndex =
    restOfImages != undefined
      ? (index + restOfImages.length - 1) % restOfImages.length
      : undefined;

  const prevImage =
    restOfImages != undefined
      ? restOfImages[prevIndex] || currentImage
      : undefined;

  const handleClick = (index: number, item: typeof restOfImages) => {
    setIndex(index);
  };
  console.log("index", index);
  console.log("restOfImages", restOfImages);
  const handleClose = () => setIndex(-1);
  const handleMovePrev = () => setIndex(prevIndex);
  const handleMoveNext = () => setIndex(nextIndex);

  return (
    <section id={styles.ProjectID}>
      <div className={`${"mainBlock"}`} key={project.id}>
        <div className="flex flex-col items-left">
          <h1 className={"title self-center"}>{projectInfo.aka}</h1>
          <div className="flex flex-col gap-10">
            <div className={styles.projectSlider}>
              {restOfImages != null
                ? restOfImages
                    .slice(0, 7)
                    .map((image, index) => (
                      <Image
                        src={`${APIURL}${image.source}`}
                        alt=""
                        width={1000}
                        height={1000}
                        onClick={handleClick}
                        key={index}
                      />
                    ))
                : null}
            </div>

            <article className="flex flex-col px-10 gap-5">
              <Link href={projectInfo.link}>
                <h2 className={styles.subtitle}>{projectInfo.subTitle}</h2>
              </Link>
              <p className="text-left text-paragraph text-xl paragraph">
                {projectInfo.content}
              </p>
              <p className="paragraph">{projectInfo.lg_content}</p>
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
            </article>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-end">
        <Link
          href={projectInfo.github}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.github}
        />
        <Link
          href={projectInfo.link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.web}
        />
      </div>

      <Link href={"/#Projects"} className={styles.back}>
        <Image src={back} width={50} alt={"go-back"} />
      </Link>
    </section>
  );
}
