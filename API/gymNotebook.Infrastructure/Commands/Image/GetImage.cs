using System;

namespace gymNotebook.Infrastructure.Commands.Image
{
    public class GetImage : ICommand, IResult
    {
        public Guid Id { get; set; }
    }
}
