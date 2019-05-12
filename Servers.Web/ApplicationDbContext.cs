using Microsoft.EntityFrameworkCore;

namespace Servers.Web
{
    public class ApplicationDbContext :DbContext
    {

            public DbSet<VServer> VServers { get; set; }
            

            public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
                : base(options)
            {
            }

            protected override void OnModelCreating(ModelBuilder builder)
            {
                base.OnModelCreating(builder);
                // Customize the ASP.NET Identity model and override the defaults if needed.
                // For example, you can rename the ASP.NET Identity table names and more.
                // Add your customizations after calling base.OnModelCreating(builder);
            }
        
    }
}