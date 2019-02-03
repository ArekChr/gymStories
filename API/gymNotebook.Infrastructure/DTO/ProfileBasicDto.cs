using gymNotebook.Infrastructure.Commands;

namespace gymNotebook.Infrastructure.DTO
{
    public class ProfileBasicDto : IResult
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
