using gymNotebook.Infrastructure.DTO;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Services
{
    public interface IProgressService : IService
    {
        Task<ProgressDto> GetAsync(Guid id);

        Task CreateAsync(Guid userId, DateTime createdAt, float? Weight, float? Biceps, float? Chest, float? Thigh, float? Calf, float? Waist, float? Shoulders, float? Neck);

        Task<ProgressListDto> BrowseAsync(Guid userId);

        Task UpdateAsync(Guid id, float Weight, float Biceps, float Chest, float Thigh, float Calf, float Waist, float Shoulders, float Neck);

        Task DeleteAsync(Guid id);
    }
}
