using gymNotebook.Core.Domain;
using gymNotebook.Core.Repositories;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Repositories
{
    public class MongoExerciseRepository : IExerciseRepository, IMongoRepository
    {
        private readonly IMongoDatabase _database;

        public MongoExerciseRepository(IMongoDatabase database)
        {
            _database = database;
        }

        private IMongoCollection<Exercise> Exercises
            => _database.GetCollection<Exercise>("Exercises");

        public async Task AddAsync(Exercise exercise)
            => await Exercises.InsertOneAsync(exercise);

        public async Task<IEnumerable<Exercise>> BrowseAsync(Guid routineId)
            => await Exercises.AsQueryable().Where(x => x.RoutineId == routineId).ToListAsync();

        public async Task DeleteAsync(Exercise exercise)
            => await Exercises.DeleteOneAsync(x => x.Id == exercise.Id);

        public async Task<Exercise> GetAsync(Guid id)
            => await Exercises.AsQueryable().FirstOrDefaultAsync(x => x.Id == id);

        public async Task<Exercise> GetAsync(Guid routineId, string name)
            => await Exercises.AsQueryable().FirstOrDefaultAsync(x => x.RoutineId == routineId && x.Name == name);

        public async Task UpdateAsync(Exercise exercise)
            => await Exercises.ReplaceOneAsync(x => x.Id == exercise.Id, exercise);
    }
}
