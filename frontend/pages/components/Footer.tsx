import React from "react";
import Clicabkles_Nav from "./Clickables_Nav";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <div className="flex flex-col items-center w-full ">
        <h1 className="text-4xl sm:text-2xl">Find me at:</h1>
        <Clicabkles_Nav />
        <p></p>Designed & Built by João Mota
      </div>
    </>
  );
}
