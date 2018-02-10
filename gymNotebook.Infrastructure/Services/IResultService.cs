using gymNotebook.Infrastructure.DTO;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Services
{
    public interface IResultService : IService
    {
        Task<ResultDto> GetAsync(Guid id);

        Task<ResultDto> GetAsync(Guid exerciseId, int numberSeries);

        Task CreateAsync(Guid exerciseId, Guid id, int numberSeries, int repetitions, float weight, string comments);

        Task<IEnumerable<ResultDto>> BrowseAsync(Guid exerciseId);

        Task UpdateAsync(Guid id, int repetitions, float weight, string comments);

        Task DeleteAsync(Guid id);
    }
}
