using System.Collections.Generic;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Commands
{
    public interface IResultDispatcher
    {
        Task<R> DispatchAsync<T, R>(T command) where T : ICommand where R : IResult;
    }
}
