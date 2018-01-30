using gymNotebook.Core.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace gymNotebook.Infrastructure.EF
{
    public class GymNotebookContext : DbContext
    {
        private readonly SqlSettings _sqlSettings;

        public DbSet<User> Users { get; set; }

        public GymNotebookContext(DbContextOptions<GymNotebookContext> options, SqlSettings sqlSettings ) : base (options)
        {
            _sqlSettings = sqlSettings;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (_sqlSettings.InMemory)
            {
                optionsBuilder.UseInMemoryDatabase();

                return;
            }
            optionsBuilder.UseSqlServer(_sqlSettings.ConnectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var userBuilder = modelBuilder.Entity<User>();
            userBuilder.HasKey(x => x.Id);
        }
    }
}
