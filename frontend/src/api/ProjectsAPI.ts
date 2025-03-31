import { Project } from '../types/Project';

interface FetchProjectsResponse {
  projects: Project[];
  totalNumProjects: number;
}

const API_URL = 'https://waterprojectbackend.azurewebsites.net/api/Water';

// When someone calls the fetch projects, export this
export const fetchProjects = async (
  // PageSize, pageNum, and selectedCategories will be passed in
  pageSize: number,
  pageNum: number,
  selectedCategories: string[]
  // Result of this will be the response created above
): Promise<FetchProjectsResponse> => {
  try {
    // This is used to filter the projects
    const categoryParams = selectedCategories
      .map((cat) => `projectTypes=${encodeURIComponent(cat)}`) // encodeURIComponent is used for security
      .join('&'); // for each category, it formats it and joins it with & in the middle

    // gets data
    const response = await fetch(
      `${API_URL}/allprojects?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`, // This sends checks how many boxes are selected and returns it
      {
        credentials: 'include',
      }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }
    return await response.json();
  } catch (error) {
    console.log('An error occurred when fetching projects', error);
    throw error;
  }
};

// This adds projects - promise means it won't immediately get a result, but it will return a Project eventually
export const addProject = async (newProject: Project): Promise<Project> => {
  try {
    const response = await fetch(`${API_URL}/AddProject`, {
      method: 'POST',
      headers: {
        // Passing information as part of a json object
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProject),
    });

    if (!response.ok) {
      throw new Error('Failed to add project');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding project', error);
    throw error;
  }
};

// This updates projects - promise required because it is asyncronous
export const updateProject = async (
  projectId: number,
  updatedProject: Project
): Promise<Project> => {
  try {
    const response = await fetch(`${API_URL}/UpdateProject/${projectId}`, {
      method: 'PUT',
      headers: {
        // Passing information as part of a json object
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProject),
    });

    return await response.json();
  } catch (error) {
    console.error('Error adding project', error);
    throw error;
  }
};

// This deletes a project - We arent returning anything
export const deleteProject = async (projectId: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteProject/${projectId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete project');
    }
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};
