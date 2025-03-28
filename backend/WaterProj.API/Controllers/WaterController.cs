using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WaterProj.API.Data;

namespace WaterProj.API.Controllers
{
    [Route("api/[controller]")] // This is the path
    [ApiController]
    public class WaterController : ControllerBase // Inherits from a general controller
    {
        // Build instance of context file
        private WaterDbContext _WaterContext;
        public WaterController(WaterDbContext temp) => _WaterContext = temp; // Sets _WaterContext with lambda function

        [HttpGet("AllProjects")] // Route to this specific controller. This gets added onto /api/Water/xxx
        // Gets all entries in projects table and returns it
        public IActionResult GetProjects(int pageSize = 5, int pageNum = 1, [FromQuery] List<string>? projectTypes = null)
        {
            string? FavProjType = Request.Cookies["FavoriteProjectType"];
            Console.WriteLine("~~~~~~~~~~~~~~COOKIE~~~~~~~~~~~~~~~\n" + FavProjType);

            // Send a cookie - Each cookie is a key value pair.
            HttpContext.Response.Cookies.Append("FavoriteProjectType", "Borehole Well and Hand Pump", new CookieOptions
            {
                HttpOnly = true, // This means it is only visible to the server and not the DOM (better for security)
                Secure = true, // Means it will only transmit the cookie of HTTPS (may want to change it during development)
                SameSite = SameSiteMode.Strict, // Strict says other site cookies are not allowed (good if things need to be secure). May need to relax it during development
                Expires = DateTime.Now.AddMinutes(4) // How long until cookie expires
            });

            // IQueryable are built one thing at a time
            var query = _WaterContext.Projects.AsQueryable();

            if (projectTypes != null && projectTypes.Any()) // Check if the project type is not null
            {
                query = query.Where(p => projectTypes.Contains(p.ProjectType)); // Only gets project types when they are in list
            }

            var AllProjects = query // Narrowed down, filtered list
                .Skip((pageNum-1) * pageSize) // Skips the page size amount until it gets to the page you are on
                .Take(pageSize) // Only sends how many the user selected
                .ToList();

            var totalNumProjects = query.Count(); // So react can no how many projects 

            var TotalObject = new 
                                {
                                    Projects = AllProjects,
                                    totalNumProjects
                                };

            return Ok(TotalObject); // Sends a ok status code
        }

        [HttpGet("GetProjectTypes")]
        public IActionResult GetProjectTypes ()
        {
            var projectTypes = _WaterContext.Projects
                .Select(pt => pt.ProjectType)
                .Distinct()
                .ToList();

            return Ok(projectTypes);
        }

        [HttpPost("AddProject")]
        public IActionResult AddProject([FromBody] Project newProject) // FromBody says it is coming in in the body as json
        {
            _WaterContext.Projects.Add(newProject);
            _WaterContext.SaveChanges();

            return Ok(newProject);
        }

        [HttpPut("UpdatProject/{projectId}")]
        public IActionResult UpdateProject(int projectId, [FromBody] Project updatedProject)
        {
            var existingProject = _WaterContext.Projects.Find(projectId); // Finds the project to edit
            // Put in edits
            existingProject.ProjectName = updatedProject.ProjectName;
            existingProject.ProjectType = updatedProject.ProjectType;
            existingProject.ProjectRegionalProgram = updatedProject.ProjectRegionalProgram;
            existingProject.ProjectImpact = updatedProject.ProjectImpact;
            existingProject.ProjectPhase = updatedProject.ProjectPhase;
            existingProject.ProjectFunctionalityStatus = updatedProject.ProjectFunctionalityStatus;
            
            // Update database with edits
            _WaterContext.Projects.Update(existingProject);
            _WaterContext.SaveChanges();

            return Ok(existingProject);
        }

        [HttpDelete("DeleteProject/{projectId}")]
        public IActionResult DeleteProject(int projectId)
        {
            var project = _WaterContext.Projects.Find(projectId);
            // Check for project
            if (project == null)
            {
                return NotFound(new {message = "Project not found"});
            }

            _WaterContext.Projects.Remove(project);
            _WaterContext.SaveChanges();

            return NoContent();
        }
    }
}
