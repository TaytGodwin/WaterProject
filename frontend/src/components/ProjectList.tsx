import { useEffect, useState } from 'react';
import { Project } from '../types/Project';
import { useNavigate } from 'react-router-dom';
import { fetchProjects } from '../api/ProjectsAPI';
import Pagination from './Pagination';

function ProjectList({ selectedCategories }: { selectedCategories: string[] }) {
  // Store information in an array as it comes from the API
  const [projects, setProjects] = useState<Project[]>([]); // Default empty array, but will recieve an array of type Project
  const [pageSize, setPageSize] = useState<number>(10); // This uses state to remmeber how many items to display on a page
  const [pageNum, setPageNum] = useState<number>(1); // Default to page one
  const [totalPages, setTotalPages] = useState<number>(0); // Number of separate pages you will have
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Gets the data when it is necessary
  useEffect(() => {
    const loadProjects = async () => {
      // Use API call created in other file
      try {
        setLoading(true);
        const data = await fetchProjects(pageSize, pageNum, selectedCategories); // Pass in what is needed for the API call

        // Set variable
        setProjects(data.projects); // Get the projects stuff from the json
        setTotalPages(Math.ceil(data.totalNumProjects / pageSize)); // Will return how many pages based on requested page size
      } catch (error) {
        setError((error as Error).message);
      } finally {
        // This is run even if there is an error
        setLoading(false);
      }
    };

    // Call function
    loadProjects();
  }, [pageSize, pageNum, selectedCategories]); // This array tells react what to look for when to updated

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
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

            <button
              className="btn btn-success"
              onClick={() =>
                navigate(`/donate/${p.projectName}/${p.projectId}`)
              }
            >
              Donate
            </button>
          </div>
        </div>
      ))}
      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </>
  );
}

export default ProjectList;
