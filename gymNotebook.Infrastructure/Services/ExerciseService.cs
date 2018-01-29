using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using gymNotebook.Infrastructure.DTO;
using gymNotebook.Core.Repositories;
using AutoMapper;
using gymNotebook.Core.Domain;


namespace gymNotebook.Infrastructure.Services
{
    public class ExerciseService : IExerciseService
    {
        private readonly IExerciseRepository _repo;
        private readonly IMapper _mapper;

        public ExerciseService(IExerciseRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<ExerciseDto> GetAsync(Guid id)
        {
            var exercise = await _repo.GetAsync(id);

            return _mapper.Map<ExerciseDto>(exercise);
        }

        public async Task<ExerciseDto> GetAsync(Guid routineId, string name)
        {
            var exercise = await _repo.GetAsync(routineId, name);

            return _mapper.Map<ExerciseDto>(exercise);
        }

        public async Task<IEnumerable<ExerciseDto>> BrowseAsync(Guid routineId)
        {
            var exercises = await _repo.BrowseAsync(routineId);

            return _mapper.Map<IEnumerable<ExerciseDto>>(exercises);
        }

        public async Task CreateAsync(Guid routineId, string name, string description, string musclePart)
        {
            var exercise = await _repo.GetAsync(routineId, name);
            if(exercise != null)
            {
                throw new Exception($"Exercise with name: '{name}' already exists.");
            }
            exercise = new Exercise(routineId, name, description, musclePart);
            await _repo.AddAsync(exercise);
        }

        public async Task DeleteAsync(Guid id)
        {
            var exercise = await _repo.GetAsync(id);
            if(exercise == null)
            {
                throw new Exception($"Exercise with id: '{id}' does not exists");
            }
            await _repo.DeleteAsync(exercise);
        }

        public async Task UpdateAsync(Guid id, string name, string description, string musclePart)
        {
            var exercise = await _repo.GetAsync(id);
            if(exercise == null)
            {
                throw new Exception($"Exercise with id: '{id}' does not exists");
            }
            exercise.SetName(name);
            exercise.SetDescription(description);
            exercise.SetMusclePart(musclePart);
            await _repo.UpdateAsync(exercise);
        }
    }
}
