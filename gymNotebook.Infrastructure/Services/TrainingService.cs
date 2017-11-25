using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using gymNotebook.Infrastructure.DTO;
using gymNotebook.Core.Repositories;
using gymNotebook.Core.Domain;
using AutoMapper;

namespace gymNotebook.Infrastructure.Services
{
    public class TrainingService : ITrainingService
    {
        private readonly ITrainingRepository _trainingRepository;
        private readonly IMapper _mapper;

        public TrainingService(ITrainingRepository trainingRepository, IMapper mapper)
        {
            _trainingRepository = trainingRepository;
            _mapper = mapper;
        }

        public async Task<TrainingDto> GetAsync(Guid id)
        {
            var training = await _trainingRepository.GetAsync(id);

            return _mapper.Map<TrainingDto>(training);
        }

        public async Task<TrainingDto> GetAsync(Guid userId, string name)
        {
            var training = await _trainingRepository.GetAsync(userId, name);

            return _mapper.Map<TrainingDto>(training);
        }

        public async Task CreateAsync(Guid userId, Guid trainingId, string name, string description, int difficulty)
        {
            var training = await _trainingRepository.GetAsync(userId, name);
            if(training != null)
            {
                throw new Exception($"Training with name: '{name}' already exists.");
            }
            training = new Training(userId, trainingId, name, description, difficulty);
            await _trainingRepository.AddAsync(training);
        }

        public async Task DeleteAsync(Guid id)
        {
            var training = await _trainingRepository.GetAsync(id);
            if(training == null)
            {
                throw new Exception($"Training with id: '{id}' does not exist.");
            }
            await _trainingRepository.DeleteAsync(training);
        }

        public async Task<IEnumerable<TrainingDto>> BrowseAsync(Guid userId)
        {
            var trainings = await _trainingRepository.BrowseAsync(userId);

            return _mapper.Map<IEnumerable<TrainingDto>>(trainings);
        }

        public async Task UpdateAsync(Guid id, string name, string description, int difficulty)
        {
            var training = await _trainingRepository.GetAsync(id);
            if(training == null)
            {
                throw new Exception($"Training with id: '{id}' does not exist.");
            }
            training.SetName(name);
            training.SetDescription(description);
            training.SetDifficulty(difficulty);
            await _trainingRepository.UpdateAsync(training);
        }
    }
}
