using gymNotebook.Core.Domain;
using Microsoft.EntityFrameworkCore;
using System;

namespace gymNotebook.Infrastructure.EF
{
    public class GymNotebookContext : DbContext
    {
        private readonly SqlSettings _sqlSettings;

        public DbSet<User> Users { get; set; }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Training> Trainings { get; set; }
        public DbSet<Friend> Friends { get; set; }
        public DbSet<Routine> Routines { get; set; }
        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<Progress> Progress { get; set; }
        public DbSet<Result> Results { get; set; }

        public GymNotebookContext(DbContextOptions<GymNotebookContext> options, SqlSettings sqlSettings ) : base (options)
        {
            _sqlSettings = sqlSettings;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //if (_sqlSettings.InMemory)
            //{
            //    //optionsBuilder.UseInMemoryDatabase();
            //    throw new Exception("In memory database is not implemented");
            //    //return;
            //}
            optionsBuilder.UseSqlServer(_sqlSettings.ConnectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var userBuilder = modelBuilder.Entity<User>();
            userBuilder.HasKey(x => x.Id);
            var profileBuilder = modelBuilder.Entity<Profile>();
            profileBuilder.HasKey(x => x.Id);
            var trainingBuilder = modelBuilder.Entity<Training>();
            trainingBuilder.HasKey(x => x.Id);
            var friendBuilder = modelBuilder.Entity<Friend>();
            friendBuilder.HasKey(x => x.Id);
            var routineBuilder = modelBuilder.Entity<Routine>();
            routineBuilder.HasKey(x => x.Id);
            var exerciseBuilder = modelBuilder.Entity<Exercise>();
            exerciseBuilder.HasKey(x => x.Id);
            var progressBuilder = modelBuilder.Entity<Progress>();
            progressBuilder.HasKey(x => x.Id);
            var resultBuilder = modelBuilder.Entity<Result>();
            resultBuilder.HasKey(x => x.Id);
        }
    }
}
