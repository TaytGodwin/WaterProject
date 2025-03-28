import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../types/Project';
import { fetchProjects } from '../api/ProjectsAPI';
import Pagination from '../components/Pagination';
import NewProjectForm from '../components/NewProjectForm';

const AdminProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]); // Default empty array, but will recieve an array of type Project
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState<number>(10); // This uses state to remmeber how many items to display on a page
  const [pageNum, setPageNum] = useState<number>(1); // Default to page one
  const [totalPages, setTotalPages] = useState<number>(0); // Number of separate pages you will have
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Async allows the rest of the page to load as this fetches the projects
    const loadProjects = async () => {
      try {
        const data = await fetchProjects(pageSize, pageNum, []);
        setProjects(data.projects);
        setTotalPages(Math.ceil(data.totalNumProjects / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [pageSize, pageNum]);

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div>
      <h1>Admin - Projects</h1>
      {!showForm && (
        <button
          className="btn btn-success mb-3"
          onClick={() => setShowForm(true)}
        >
          Add Project
        </button>
      )}

      {showForm && ( //If we should show the form
        // import the component and pass in the functions required
        <NewProjectForm
          onSuccess={() => {
            setShowForm(false);
            fetchProjects(pageSize, pageNum, []).then(
              (data) => setProjects(data.projects) // Update projects
            );
          }}
          onCancel={() => setShowForm(false)} // On cancel, hides form
        />
      )}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Regional Program</th>
            <th>Impact</th>
            <th>Phase</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.projectId}>
              <td>{p.projectId}</td>
              <td>{p.projectName}</td>
              <td>{p.projectType}</td>
              <td>{p.projectRegionalProgram}</td>
              <td>{p.projectImpact}</td>
              <td>{p.projectPhase}</td>
              <td>{p.projectFunctionalityStatus}</td>
              <td>
                <button
                  onClick={() => console.log(`Edit Project ${p.projectId}`)}
                >
                  Edit
                </button>
                <button
                  onClick={() => console.log(`Delete Project ${p.projectId}`)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
    </div>
  );
};

export default AdminProjectsPage;
