using gymNotebook.Core.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace gymNotebook.Core.Repositories
{
    public interface IResultRepository
    {
        Task<Result> GetAsync(Guid id);

        Task<Result> GetAsync(Guid exerciseId, int numberSeries);

        Task<IEnumerable<Result>> BrowseAsync(Guid execriseId);

        Task AddAsync(Result result);

        Task UpdateAsync(Result result);

        Task DeleteAsync(Result result);
    }
}
