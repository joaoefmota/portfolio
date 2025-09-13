export interface ProjectProps {
  project_id: string;
  id: string | number;
  name: string;
  aka: string;
  subTitle: string;
  content: string;
  lg_content1: string;
  lg_content2: string;
  link: string;
  github: string;
  tools: string;
  packages: string;
  image_id: string | number;
}

export interface PropsAuth {
  authToken: string | undefined;
}

export interface PlaygroundProps {
  // map(arg0: (info: any) => JSX.Element): import("react").ReactNode;
  id: number;
  content: string;
  link: string;
  name: string;
  playground_id: number | string;
  tools: string;
}


