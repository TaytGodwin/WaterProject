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
        public IEnumerable<Project> GetProjects() // Gets all entries in projects table and returns it
        {
            return _WaterContext.Projects.ToList();
        }

        [HttpGet("FunctionalProjects")]
        public IEnumerable<Project> GetFunctionalProjects()
        {
            var something = _WaterContext.Projects.Where(p=>p.ProjectFunctionalityStatus == "Functional").ToList();
            return something;
        }
    }
}
