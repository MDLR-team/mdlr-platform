// pages/index.js
import { supabase } from "./supabase-client";

export async function getStaticProps() {
  const { data: projects, error } = await supabase.from("projects").select("*");

  console.log("dsdds");

  if (error) {
    console.error(error);
    return {
      props: { projects: [] },
    };
  }

  return {
    props: { projects },
  };
}

export default function Projects({ projects }: any) {
  console.log("projects", projects);

  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {
          projects /* .map((project: any) => (
          <li key={project.id}>{project.name}</li>
        )) */
        }
      </ul>
    </div>
  );
}
