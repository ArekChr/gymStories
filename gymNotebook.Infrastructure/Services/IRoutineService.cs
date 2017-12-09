using gymNotebook.Infrastructure.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Services
{
    public interface IRoutineService : IService
    {
        Task<RoutineDto> GetAsync(Guid id);

        Task<RoutineDto> GetAsync(Guid trainingId, string name);

        Task CreateAsync(Guid trainingId, Guid id, string name);

        Task<IEnumerable<RoutineDto>> BrowseAsync(Guid trainingId);

        Task AddFullAsync(IEnumerable<RoutineDto> routines);

        Task UpdateAsync(Guid id, string name);

        Task DeleteAsync(Guid id);
    }
}
