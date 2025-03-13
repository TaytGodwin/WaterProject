import { useEffect, useState } from 'react';
import { Project } from './types/Project';

function ProjectList() {
  // Store information in an array as it comes from the API
  const [projects, setProjects] = useState<Project[]>([]); // Default empty array, but will recieve an array of type Project

  // Gets the data when it is necessary
  useEffect(() => {
    const fetchProjects = async () => {
      // gets data
      const response = await fetch(
        'https://localhost:5000/api/Water/allprojects'
      );
      const data = await response.json();
      // Set variable
      setProjects(data);
    };

    // Call function
    fetchProjects();
  }, []);

  return (
    <>
      <h1>Water Projects</h1>
      <br />
      {projects.map((p) => (
        <div id="projectCard">
          <h3>{p.projectName}</h3>
          <ul>
            <li>Project Type: {p.projectType}</li>
            <li>Regional Program: {p.projectRegionalProgram}</li>
            <li>Impact: {p.projectImpact} Individuals Served</li>
            <li>Regional Phase: {p.projectPhase}</li>
            <li>Project State: {p.projectFunctionalityStatus}</li>
          </ul>
        </div>
      ))}
    </>
  );
}

export default ProjectList;
