namespace gymNotebook.Infrastructure.Commands.Profile
{
    public class GetProfile : AuthenticatedCommandBase, IResult
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Description { get; set; }
        public float AverageRates { get; set; }
        public int FollowingCount { get; set; }
        public int FollowersCount { get; set; }
    }
}
