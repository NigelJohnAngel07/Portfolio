import type { Route } from "./+types/home";

import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Start() {
  return(
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center gap-10">
      <h1 className="text-6xl">Welcome, traveler</h1>
      <Link to="/home" className="px-12 py-6 rounded-full bg-foreground text-background text-center text-md hover:opacity-80">Enter</Link>  
    </section>
  ); 
}
