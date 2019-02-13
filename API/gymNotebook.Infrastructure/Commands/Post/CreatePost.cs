namespace gymNotebook.Infrastructure.Commands.Post
{
    public class CreatePost : AuthenticatedCommandBase
    {
        public string Description { get; set; }
    }
}
