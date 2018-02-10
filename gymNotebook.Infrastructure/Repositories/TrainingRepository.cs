using gymNotebook.Core.Repositories;
using System;
using System.Collections.Generic;
using gymNotebook.Core.Domain;
using System.Threading.Tasks;
using System.Linq;

namespace gymNotebook.Infrastructure.Repositories
{
    public class TrainingRepository : ITrainingRepository
    {
        private static readonly ISet<Training> _trainings = new HashSet<Training>();

        public async Task<Training> GetAsync(Guid id)
            => await Task.FromResult(_trainings.SingleOrDefault(x => x.Id == id));

        public async Task<Training> GetAsync(Guid userId, string name)
            => await Task.FromResult(_trainings.SingleOrDefault(x => x.UserId == userId && x.Name == name));

        public async Task AddAsync(Training training)
        {
            _trainings.Add(training);
            await Task.CompletedTask;
        }

        public async Task<IEnumerable<Training>> BrowseAsync(Guid userId)
        {
            var trainings = _trainings.Where(x => x.UserId == userId).AsEnumerable();

            return await Task.FromResult(trainings);
        }

        public async Task UpdateAsync(Training training)
        {
           // _trainings.Update(training);
            await Task.CompletedTask;
        }

        public async Task DeleteAsync(Training training)
        {
            _trainings.Remove(training);
            await Task.CompletedTask;
        }
    }
}
