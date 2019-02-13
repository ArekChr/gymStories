using gymNotebook.Infrastructure.DTO;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Services
{
    public interface ITrainingService : IService
    {
        Task<TrainingDto> GetAsync(Guid id);

        Task<TrainingDto> GetAsync(Guid userId, string name);

        Task CreateAsync(Guid userId, Guid trainingId, string name, string description, byte difficulty);

        Task<IEnumerable<TrainingDto>> BrowseAsync(Guid userId);

        Task UpdateAsync(Guid id, string name, string description, byte difficulty);

        Task DeleteAsync(Guid id);
    }
}
