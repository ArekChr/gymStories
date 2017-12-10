using gymNotebook.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using gymNotebook.Infrastructure.Commands.Trainings.Training;
using gymNotebook.Infrastructure.DTO;
using System.Threading.Tasks;
using gymNotebook.Core.Domain;

namespace gymNotebook.Infrastructure.Services
{
    public class FullTrainingService : IFullTrainingService
    {
        private readonly ITrainingRepository _trainingRepo;
        private readonly IRoutineRepository _routineRepo;
        private readonly IExerciseRepository _exerciseRepo;

        public FullTrainingService(ITrainingRepository trainingRepository, IRoutineRepository routineRepository,
            IExerciseRepository exerciseRepository)
        {
            _trainingRepo = trainingRepository;
            _routineRepo = routineRepository;
            _exerciseRepo = exerciseRepository;
        }

        public async Task CreateAsync(CreateFullTraining fullTraining)
        {
            var training = await _trainingRepo.GetAsync(fullTraining.UserId, fullTraining.Name);
            if(training != null)
            {
                throw new Exception($"Training with name: '{fullTraining.Name}' already exists.");
            }
            training = new Training(fullTraining.UserId, fullTraining.TrainingId, 
                fullTraining.Name, fullTraining.Description, fullTraining.Difficulty);

            await _trainingRepo.AddAsync(training);

            foreach(var routine in fullTraining.FullRoutine)
            {
                var _routine = await _routineRepo.GetAsync(training.Id, routine.Name);
                if(_routine != null)
                {
                    throw new Exception($"Routine with name: '{routine.Name}' already exists");
                }
                _routine = new Routine(training.Id, routine.Name);
                await _routineRepo.AddAsync(_routine);

                foreach(var exercise in routine.Exercises)
                {
                    var _exercise = await _exerciseRepo.GetAsync(_routine.Id, exercise.Name);
                    if (exercise != null)
                    {
                        throw new Exception($"Exercise with name: '{exercise.Name}' already exists.");
                    }
                    _exercise = new Exercise(_routine.Id, exercise.Name, exercise.Description, exercise.MusclePart);
                    await _exerciseRepo.AddAsync(_exercise);
                }
            }
        }

        public Task DeleteAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<FullTrainingDto> GetAsync(Guid trainingId)
        {
            throw new NotImplementedException();
        }

        public Task<FullTrainingDto> GetAsync(Guid routineId, string name)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(UpdateAllTraining allTraining)
        {
            throw new NotImplementedException();
        }
    }
}
