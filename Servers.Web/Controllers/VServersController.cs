using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Servers.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VServersController : ControllerBase
    {
        private ApplicationDbContext _dbContext;
        public VServersController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        // GET: api/VServers
        [HttpGet]
        public IQueryable<VServer> Get()
        {
            return _dbContext.VServers.AsNoTracking();
            
        }

        // GET: api/VServers/5
        [HttpGet("{id}", Name = "Get")]
        public async Task<VServer> Get(int id)
        {
            return await  _dbContext.VServers.FirstOrDefaultAsync(p=>p.Id==id);
        }

        // POST: api/VServers
        [HttpPost]
        public async Task<IActionResult> Post()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newServer = new VServer {CreateDateTime = DateTime.Now};
            _dbContext.VServers.Add(newServer);
            await _dbContext.SaveChangesAsync();

            return Ok(newServer);
        }


        // DELETE: api/ApiWithActions/5
        //  [HttpDelete("{id}")]
        [HttpDelete]

        public async Task<IActionResult> Delete([FromQuery] int[] id)
        {
            
            var serversFound = await _dbContext.VServers.Where(p=>id.Contains(p.Id)).ToArrayAsync();
            if (serversFound == null)
            {
                return NotFound();
            }

            foreach (var server in serversFound)
            {
                server.RemoveDateTime = DateTime.Now;
            }
            
            //_dbContext.VServers.Remove(serverFound);
            await _dbContext.SaveChangesAsync();

            return Ok(serversFound);
        }
    }
}
