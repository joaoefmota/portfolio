import Image from "next/image";
import Link from "next/link";
import React from "react";

interface TilesProps {
  src?: string; // mark optional
  name: string;
  link: string;
}

export default function ProjectTile({ src, name, link }: TilesProps) {
  return (
    <Link href={link}>
      <div className="shade relative w-full h-64 flex flex-col items-center justify-center">
        {src ? <Image src={src} alt={name} fill style={{ objectFit: "cover" }} /> : <div className="w-full h-full bg-gray-200" />}
      </div>
    </Link>
  );
}
