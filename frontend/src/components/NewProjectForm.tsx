import { useState } from 'react';
import { Project } from '../types/Project';
import { addProject } from '../api/ProjectsAPI';

// This shows whether the update was successful or not
interface NewProjectFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

// This is expecting the interfact above
const NewProjectForm = ({ onSuccess, onCancel }: NewProjectFormProps) => {
  const [formData, setFormData] = useState<Project>({
    projectId: 0,
    projectName: '',
    projectType: '',
    projectRegionalProgram: '',
    projectImpact: 0,
    projectPhase: '',
    projectFunctionalityStatus: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Sets equal to whatever is in form data + the input box value
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Stop the refresh
    await addProject(formData); // Calls the addProject api call in the API file
    onSuccess(); // Tells that you got the data
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Project</h2>
      <div className="form-grid">
        <label>
          Project Name:
          <input
            type="text"
            name="projectName" //{/*This has to match our type that we made exactly*/}
            value={formData.projectName}
            onChange={handleChange}
          />
        </label>
        <label>
          Project Type:
          <input
            type="text"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
          />
        </label>
        <label>
          Regional Program:
          <input
            type="text"
            name="projectRegionalProgram"
            value={formData.projectRegionalProgram}
            onChange={handleChange}
          />
        </label>
        <label>
          Impact:
          <input
            type="number"
            name="projectImpact"
            value={formData.projectImpact}
            onChange={handleChange}
          />
        </label>
        <label>
          Project Phase:
          <input
            type="text"
            name="projectPhase"
            value={formData.projectPhase}
            onChange={handleChange}
          />
        </label>
        <label>
          Project Functionality Status:
          <input
            type="text"
            name="projectFunctionalityStatus"
            value={formData.projectFunctionalityStatus}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add Project</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NewProjectForm;
