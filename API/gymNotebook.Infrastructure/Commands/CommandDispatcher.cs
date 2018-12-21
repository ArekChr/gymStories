using Autofac;
using System;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Commands
{
    public class CommandDispatcher : ICommandDispatcher, IResultDispatcher
    {
        private readonly IComponentContext _context;

        public CommandDispatcher(IComponentContext context)
        {
            _context = context;
        }

        public async Task DispatchAsync<T>(T command) where T : ICommand
        {
            if(command == null)
            {
                throw new ArgumentNullException(nameof(command), $"Command {typeof(T).Name} can not be null.");
            }
            var handler = _context.Resolve<ICommandHandler<T>>();
            await handler.HandleAsync(command);
        }

        public async Task<R> DispatchAsync<T, R>(T command) where T : ICommand where R : IResult
        {
            if (command == null)
            {
                throw new ArgumentNullException(nameof(command), $"Command {typeof(T).Name} can not be null.");
            }
            var handler = _context.Resolve<IResultHandler<T, R>>();
            return await handler.HandleAsync(command);
        }
    }
}
