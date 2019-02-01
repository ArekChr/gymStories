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
        public DbSet<Image> Images { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Follow> Follows { get; set; }
        public DbSet<CommentUserRels> UserComments { get; set; }
        public DbSet<CommentPostRels> PostComments { get; set; }

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
            userBuilder.HasOne<Profile>(x => x.Profile).WithOne(x => x.User).OnDelete(DeleteBehavior.Cascade);

            var followBuilder = modelBuilder.Entity<Follow>();
            followBuilder.HasKey(x => new { x.FollowedId, x.FollowerId });
            followBuilder.HasOne<User>(x => x.Followed).WithMany(x => x.Follows).HasForeignKey(x => x.FollowedId);
            //followBuilder.HasOne<User>(x => x.Follower).WithMany(x => x.Follows).HasForeignKey(x => x.FollowerId);

            var profileBuilder = modelBuilder.Entity<Profile>();
            profileBuilder.HasKey(x => x.Id);
            profileBuilder.HasOne<User>(x => x.User).WithOne(x => x.Profile).HasForeignKey<Profile>(x => x.UserId);
            
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

            var imageBuilder = modelBuilder.Entity<Image>();
            imageBuilder.HasKey(x => x.Id);

            var postBuilder = modelBuilder.Entity<Post>();
            postBuilder.HasKey(x => x.Id);
            postBuilder.HasMany(x => x.CommentPostRels).WithOne(x => x.Post).OnDelete(DeleteBehavior.ClientSetNull);
            postBuilder.HasOne(x => x.User).WithMany(x => x.Posts).HasForeignKey(x => x.UserId);
            postBuilder.HasOne(x => x.Image).WithOne().HasForeignKey<Post>(x => x.ImageId).OnDelete(DeleteBehavior.Cascade);

            var commentBuilder = modelBuilder.Entity<Comment>();

            var postCommentBuilder = modelBuilder.Entity<CommentPostRels>();
            postCommentBuilder.HasKey(x => x.Id);
            postCommentBuilder.HasOne<Post>().WithMany(x => x.CommentPostRels).HasForeignKey(x => x.PostId).OnDelete(DeleteBehavior.Cascade);

            var userCommentBuilder = modelBuilder.Entity<CommentUserRels>();
            userCommentBuilder.HasKey(x => x.Id);
            userCommentBuilder.HasOne<User>().WithMany(x => x.CommentUserRels).HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
