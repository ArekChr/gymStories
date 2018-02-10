using gymNotebook.Core.Domain;
using Microsoft.EntityFrameworkCore;
using System;

namespace gymNotebook.Infrastructure.EF
{
    public class GymNotebookContext : DbContext
    {
        private readonly SqlSettings _sqlSettings;

        public DbSet<User> Users { get; set; }

        public DbSet<Training> Trainings { get; set; }

        public GymNotebookContext(DbContextOptions<GymNotebookContext> options, SqlSettings sqlSettings ) : base (options)
        {
            _sqlSettings = sqlSettings;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (_sqlSettings.InMemory)
            {
                //optionsBuilder.UseInMemoryDatabase();
                throw new Exception("In memory database is not implemented");
                //return;
            }
            optionsBuilder.UseSqlServer(_sqlSettings.ConnectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var userBuilder = modelBuilder.Entity<User>();
            userBuilder.HasKey(x => x.Id);
            var trainingBuilder = modelBuilder.Entity<Training>();
            userBuilder.HasKey(x => x.Id);
        }
    }
}
