using gymNotebook.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using gymNotebook.Core.Domain;
using System.Threading.Tasks;
using System.Linq;

namespace gymNotebook.Infrastructure.Repositories
{
    public class ResultRepository : IResultRepository
    {
        private static readonly ISet<Result> _results = new HashSet<Result>();

        public async Task<Result> GetAsync(Guid id)
            => await Task.FromResult(_results.SingleOrDefault(x => x.Id == id));

        public async Task<Result> GetAsync(Guid execriseId, int numberSeries)
            => await Task.FromResult(_results.SingleOrDefault(x => x.ExerciseId == execriseId && x.NumberSeries == numberSeries));

        public async Task AddAsync(Result result)
        {
            _results.Add(result);
            await Task.CompletedTask;
        }

        public async Task<IEnumerable<Result>> BrowseAsync(Guid execriseId)
            => await Task.FromResult(_results.Where(x => x.ExerciseId == execriseId).AsEnumerable());

        public async Task DeleteAsync(Result routine)
        {
            _results.Remove(routine);
            await Task.CompletedTask;
        }

        public async Task UpdateAsync(Result routine)
        {
            await Task.CompletedTask;
        }
    }
}
