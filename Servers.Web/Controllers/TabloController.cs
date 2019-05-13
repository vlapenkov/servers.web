using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Servers.Web.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class TabloController : ControllerBase
    {
        private ApplicationDbContext _dbContext;
        public TabloController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET: api/tablo
        [HttpGet]
        public IActionResult Get()
        {
           var serverFound = _dbContext.VServers.FirstOrDefault(p => p.RemoveDateTime == null);
            var howLong = serverFound != null ? (DateTime.Now - serverFound.CreateDateTime) : TimeSpan.Zero;
           

            return Ok( new {curDate=DateTime.Now, howLong});

        }
    }
}