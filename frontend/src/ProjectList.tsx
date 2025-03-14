import { useEffect, useState } from 'react';
import { Project } from './types/Project';

function ProjectList() {
  // Store information in an array as it comes from the API
  const [projects, setProjects] = useState<Project[]>([]); // Default empty array, but will recieve an array of type Project
  const [pageSize, setPageSize] = useState<number>(10); // This uses state to remmeber how many items to display on a page
  const [pageNum, setPageNum] = useState<number>(1); // Default to page one
  const [totalItems, setTotalItems] = useState<number>(0); // Keeps track of how many things are returned
  const [totalPages, setTotalPages] = useState<number>(0); // Number of separate pages you will have

  // Gets the data when it is necessary
  useEffect(() => {
    const fetchProjects = async () => {
      // gets data
      const response = await fetch(
        `https://localhost:5000/api/Water/allprojects?pageSize=${pageSize}&pageNum=${pageNum}` // This sends how many objects should be on the page back to the controller
      );
      const data = await response.json();
      // Set variable
      setProjects(data.projects); // Get the projects stuff from the json
      setTotalItems(data.totalNumProjects); // Get total number
      setTotalPages(Math.ceil(totalItems / pageSize)); // Will return how many pages based on requested page size
    };

    // Call function
    fetchProjects();
  }, [pageSize, pageNum, totalItems]); // This array tells react what to look for when to updated

  return (
    <>
      <h1>Water Projects</h1>
      <br />
      {projects.map((p) => (
        <div id="projectCard" className="card" key={p.projectId}>
          {/* A key makes the card identifiable */}
          {/* card is class in bootstrap */}
          <h3 className="card-title">{p.projectName}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              {/* Gets rid of bullet points */}
              <li>
                <strong>Project Type:</strong> {p.projectType}
              </li>
              <li>
                <strong>Regional Program:</strong> {p.projectRegionalProgram}
              </li>
              <li>
                <strong>Impact:</strong> {p.projectImpact} Individuals Served
              </li>
              <li>
                <strong>Regional Phase:</strong> {p.projectPhase}
              </li>
              <li>
                <strong>Project State:</strong> {p.projectFunctionalityStatus}
              </li>
            </ul>
          </div>
        </div>
      ))}

      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>
      {/*Subtract 1 from current page number*/}
      {[...Array(totalPages)].map(
        (
          _,
          index // Array of the total number of pages
        ) => (
          // Index starts at 0 and counts on
          <button
            key={index + 1}
            onClick={() => setPageNum(index + 1)}
            disabled={pageNum === index + 1}
          >
            {/* Sets what page you are on */}
            {index + 1}
            {/* Shows page number */}
          </button>
        )
      )}
      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>
      {/*Add 1 to current page number*/}

      <br />
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1); // Sets page number back to 1 when they change
          }}
        >
          {' '}
          {/* This changes the pageSize variable when the drop down changes */}
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </>
  );
}

export default ProjectList;
