using System.Collections.Generic;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Commands
{
    public interface IResultHandler<T, R> where T : ICommand where R : IResult
    {
        Task<R> HandleAsync(T command);
    }
}
