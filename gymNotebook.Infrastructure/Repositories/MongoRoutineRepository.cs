using gymNotebook.Core.Domain;
using gymNotebook.Core.Repositories;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Repositories
{
    public class MongoRoutineRepository : IRoutineRepository, IMongoRepository
    {
        private readonly IMongoDatabase _database;

        public MongoRoutineRepository(IMongoDatabase database)
        {
            _database = database;
        }

        private IMongoCollection<Routine> Routines
            => _database.GetCollection<Routine>("Routines");

        public async Task AddAsync(Routine routine)
            => await Routines.InsertOneAsync(routine);

        public async Task<IEnumerable<Routine>> BrowseAsync(Guid trainingId)
            => await Routines.AsQueryable().Where(x => x.TrainingId == trainingId).ToListAsync();

        public async Task DeleteAsync(Routine routine)
            => await Routines.DeleteOneAsync(x => x.Id == routine.Id);

        public async Task<Routine> GetAsync(Guid id)
            => await Routines.AsQueryable().FirstOrDefaultAsync(x => x.Id == id);

        public async Task<Routine> GetAsync(Guid trainingId, string name)
            => await Routines.AsQueryable().FirstOrDefaultAsync(x => x.TrainingId == trainingId && x.Name == name);

        public async Task UpdateAsync(Routine routine)
            => await Routines.ReplaceOneAsync(x => x.Id == routine.Id, routine);
    }
}
