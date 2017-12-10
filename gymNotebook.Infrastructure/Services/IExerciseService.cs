using gymNotebook.Infrastructure.Commands.Trainings.Exercises;
using gymNotebook.Infrastructure.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Services
{
    public interface IExerciseService : IService
    {
        Task<ExerciseDto> GetAsync(Guid id);

        Task<ExerciseDto> GetAsync(Guid routineId, string name);

        Task CreateAsync(Guid routineId, string name, string description, string musclePart);

        Task<IEnumerable<ExerciseDto>> BrowseAsync(Guid routineId);

        Task UpdateAsync(Guid id, string name, string description, string musclePart);

        Task DeleteAsync(Guid id);
    }
}
