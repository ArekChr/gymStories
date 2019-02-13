using gymNotebook.Infrastructure.Commands.Trainings.Training;
using gymNotebook.Infrastructure.DTO;
using System;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Services
{
    public interface IFullTrainingService : IService
    {
        Task<FullTrainingDto> GetAsync(Guid trainingId);

        Task<FullTrainingDto> GetAsync(Guid routineId, string name);

        Task CreateAsync(CreateFullTraining fullTraining);

        Task UpdateAsync(UpdateAllTraining allTraining);

        Task DeleteAsync(Guid id);
    }
}
