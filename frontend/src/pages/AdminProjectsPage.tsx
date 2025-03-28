import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../types/Project';
import { deleteProject, fetchProjects } from '../api/ProjectsAPI';
import Pagination from '../components/Pagination';
import NewProjectForm from '../components/NewProjectForm';
import EditProjectForm from '../components/EditProjectForm';

const AdminProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]); // Default empty array, but will recieve an array of type Project
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState<number>(10); // This uses state to remmeber how many items to display on a page
  const [pageNum, setPageNum] = useState<number>(1); // Default to page one
  const [totalPages, setTotalPages] = useState<number>(0); // Number of separate pages you will have
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditProject] = useState<Project | null>(null);

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

  const handleDelete = async (projectId: number) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this project?'
    );
    if (!confirmDelete) return; // exit this if they no longer want to delete

    try {
      await deleteProject(projectId);
      setProjects(projects.filter((p) => p.projectId !== projectId)); // change display projects to not have this project
    } catch (error) {
      alert('Failed to delete project. Please try again.');
    }
  };

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

      {editingProject && (
        <EditProjectForm
          project={editingProject}
          onSuccess={() => {
            setEditProject(null);
            fetchProjects(pageSize, pageNum, []).then((data) =>
              setProjects(data.projects)
            );
          }}
          onCancel={() => setEditProject(null)}
        />
      )}

      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Regional Program</th>
            <th>Impact</th>
            <th>Phase</th>
            <th>Status</th>
            <th>Actions</th>
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
                  className="btn btn-primary btn-sm w-100 mb-1"
                  onClick={() => setEditProject(p)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm w-100"
                  onClick={() => handleDelete(p.projectId)}
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
