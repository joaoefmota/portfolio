import React, { useEffect, useRef, useState } from "react";
import useAxios from "@/hooks/useAxios";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
// import Carousel from "react-responsive-carousel";

import back from "@/assets/images/back_dark.png";
import styles from "@/styles/projects.module.scss";
import useFadeIn from "@/hooks/useFadeIn";
interface ProjectInfo {
  tools: string;
  packages: string;
  link: string;
  aka: string;
  subTitle: string;
  lg_content1: string;
  lg_content2: string;
  github: string;
  content: string;
}
interface ImageSource {
  source: string;
}

export default function ProjectPage() {
  const router = useRouter();
  const { id } = router.query;

  const APIURL = process.env.NEXT_PUBLIC_API_URL;
  
  const [restOfImages, setRestOfImages] = useState<[]>([]);
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>({
    tools: "",
    packages: "",
    link: "",
    aka: "",
    subTitle: "",
    lg_content1: "",
    lg_content2: "",
    github: "",
    content: "",
  });
  const [photoIndex, setPhotoIndex] = useState<number>(0);
  const [lightBoxIsOpen, setLightBoxisOpen] = useState(false);
  const { componentRef, isVisible } = useFadeIn(0.25);
  const playgroundRef = useRef(null);

  useEffect(() => {
    componentRef.current = playgroundRef.current;
  }, [componentRef, playgroundRef]);

  const project = useAxios<any>({
    url: id != null ? `${APIURL}/api/project-nr?id=${id}` : null,
    initialValue: undefined,
    transform: ([project]) => {
      if (project == null) return undefined;
      setProjectInfo(project);
      return axios
        .get(`${APIURL}/images/?project=${project.name}`)
        .then((result) => {
          console.log(
            "Result.data",
            result.data.filter((image: { source: string | string[] }) =>
              image.source.includes(`img`)
            )
          );
          setRestOfImages(
            result.data.filter((image: { source: string | string[] }) =>
              image.source.includes(`img`)
            )
          );
        });
    },
  });

  const validImages = restOfImages.filter((image: ImageSource) =>
    image.source.includes("img")
  );

  const photos = validImages.map((image: ImageSource) => ({
    src: `${APIURL}${image.source}`,
    width: 500,
    height: 500,
  }));

  console.log("photos", photos);
  console.log("photoIndex", photoIndex);
  /* 
   const nextIndex = () => {
    restOfImages && setPhotoIndex((photoIndex + 1) % restOfImages.length);
    console.log("nextIndex Function called", photoIndex);
  };

  const prevIndex = () => {
    restOfImages &&
      setPhotoIndex(
        (photoIndex + restOfImages.length - 1) % restOfImages.length
      );
    console.log("prevIndex Function called", photoIndex);
  };

  */

  {
    /* Tools and Packages array */
  }
  if (project == null) return <p>Loading</p>;

  const tools =
    projectInfo != null && projectInfo.tools != null
      ? projectInfo.tools.split(", ")
      : undefined;

  const packages =
    projectInfo != null && projectInfo.packages != null
      ? projectInfo.packages.split(", ")
      : undefined;

  return (
    <section
      id={styles.ProjectID}
      className={`${"sectionBg1"} 
      ${isVisible ? "fade-in " : ""}`}
      ref={playgroundRef}
    >
      <div className={`${"mainBlock"}`} key={project.id}>
        <div className="flex flex-col items-left">
          <Link
            href={projectInfo.link}
            target="_blank"
            rel="noopener noreferrer"
            className="self-center"
          >
            <h1 className={styles.title}>{projectInfo.aka}</h1>
          </Link>
          <div className="flex flex-col gap-10">
            <Gallery
              photos={photos}
              onClick={(event, obj) => {
                setPhotoIndex(obj.index);
                setLightBoxisOpen(true);
              }}
            />
            <ModalGateway>
              {lightBoxIsOpen && (
                <Modal
                  onClose={() => {
                    setPhotoIndex(0);
                    setLightBoxisOpen(false);
                  }}
                >
                  <Carousel
                    currentIndex={photoIndex}
                    views={photos.map((x) => ({
                      ...x,
                      source: x.src,
                    }))}
                  />
                </Modal>
              )}
            </ModalGateway>

            <article className="flex flex-col gap-5">
              <h2 className={styles.subtitle}>{projectInfo.subTitle}</h2>
              <p className="text-left paragraph ">{projectInfo.content}</p>
              <div className="flex flex-col gap-5">
                <p className="paragraph">{projectInfo.lg_content1}</p>
                <p className="paragraph">{projectInfo.lg_content2}</p>
              </div>

              <div className="flex flex-row gap-5 my-3 sm:justify-between sm:gap-0">
                <div className="flex flex-col gap-2">
                  <h2 className={styles.subtitle}>Tools</h2>
                  <div className="grid grid-rows-2 grid-flow-col w-fit">
                    {(tools ?? []).map((tool) => (
                      <p className={styles.gridItems} key={tool}>
                        {tool}
                      </p>
                    ))}
                  </div>
                </div>
                {projectInfo.packages != null ? (
                  <div className="flex flex-col gap-3">
                    <h2 className={styles.subtitle}>Packages</h2>
                    <div className="grid grid-rows-2 grid-flow-col w-fit">
                      {(packages ?? []).map((pack) => (
                        <p className={styles.gridItems} key={pack}>
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
        <Image src={back} width={25} alt={"go-back"} />
      </Link>
    </section>
  );
}
