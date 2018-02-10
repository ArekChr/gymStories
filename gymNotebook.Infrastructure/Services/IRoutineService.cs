using gymNotebook.Infrastructure.DTO;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Services
{
    public interface IRoutineService : IService
    {
        Task<RoutineDto> GetAsync(Guid id);

        Task<RoutineDto> GetAsync(Guid trainingId, string name);

        Task CreateAsync(Guid trainingId, string name);

        Task<IEnumerable<RoutineDto>> BrowseAsync(Guid trainingId);

        Task UpdateAsync(Guid id, string name);

        Task DeleteAsync(Guid id);
    }
}
