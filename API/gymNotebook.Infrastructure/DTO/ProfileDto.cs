using gymNotebook.Infrastructure.Commands;
using Microsoft.AspNetCore.Http;
using System;

namespace gymNotebook.Infrastructure.DTO
{
    public class ProfileDto : IResult
    {
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string Description { get; set; }
        public Guid ImageId { get; set; }
        public float AverageRates { get; set; }
        public int FollowingCount { get; set; }
        public int FollowersCount { get; set; }
        public DateTime DateOfBirth { get; set; }
        public IFormFile Image { get; set; }
    }
}
