export interface Project {
  // These should match the names of the fields that you receive from the API
  projectId: number;
  projectName: string;
  projectType: string;
  projectRegionalProgram: string;
  projectImpact: number;
  projectPhase: string;
  projectFunctionalityStatus: string;
}
