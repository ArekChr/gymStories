using gymNotebook.Core.Domain;
using gymNotebook.Core.Repositories;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Repositories
{
    public class MongoResultRepository : IResultRepository, IMongoRepository
    {
        private readonly IMongoDatabase _database;

        public MongoResultRepository(IMongoDatabase database)
        {
            _database = database;
        }

        private IMongoCollection<Result> Results
            => _database.GetCollection<Result>("Results");

        public async Task AddAsync(Result result)
            => await Results.InsertOneAsync(result);

        public async Task<IEnumerable<Result>> BrowseAsync(Guid execriseId)
            => await Results.AsQueryable().Where(x => x.ExerciseId == execriseId).ToListAsync();

        public async Task DeleteAsync(Result result)
            => await Results.DeleteOneAsync(x => x.Id == result.Id);

        public async Task<Result> GetAsync(Guid id)
            => await Results.AsQueryable().FirstOrDefaultAsync(x => x.Id == id);

        public async Task<Result> GetAsync(Guid exerciseId, int numberSeries)
            => await Results.AsQueryable().FirstOrDefaultAsync(x => x.ExerciseId == exerciseId && x.NumberSeries == numberSeries);

        public async Task UpdateAsync(Result result)
            => await Results.ReplaceOneAsync(x => x.Id == result.Id, result);
    }
}
