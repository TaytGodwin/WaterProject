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
        public IActionResult GetProjects(int pageSize = 5, int pageNum = 1) // Default to 5
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
            
            var AllProjects = _WaterContext.Projects
                .Skip((pageNum-1) * pageSize) // Skips the page size amount until it gets to the page you are on
                .Take(pageSize) // Only sends how many the user selected
                .ToList();

            var totalNumProjects = _WaterContext.Projects.Count(); // So react can no how many projects 

            var TotalObject = new 
                                {
                                    Projects = AllProjects,
                                    totalNumProjects
                                };

            return Ok(TotalObject); // Sends a ok status code
        }

        [HttpGet("FunctionalProjects")]
        public IEnumerable<Project> GetFunctionalProjects()
        {
            var something = _WaterContext.Projects.Where(p=>p.ProjectFunctionalityStatus == "Functional").ToList();
            return something;
        }
    }
}
