using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using gymNotebook.Infrastructure.DTO;
using gymNotebook.Core.Repositories;
using AutoMapper;
using gymNotebook.Core.Domain;

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

    public class RoutineService : IRoutineService
    {
        private readonly IRoutineRepository _repo;
        private readonly IMapper _mapper;

        public RoutineService(IRoutineRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<RoutineDto> GetAsync(Guid id)
        {
            var routine = await _repo.GetAsync(id);

            return _mapper.Map<Routine,RoutineDto>(routine);
        }

        public async Task<RoutineDto> GetAsync(Guid trainingId, string name)
        {
            var routine = await _repo.GetAsync(trainingId, name);

            return _mapper.Map<Routine,RoutineDto>(routine);
        }

        public async Task<IEnumerable<RoutineDto>> BrowseAsync(Guid trainingId)
        {
            var routines = await _repo.BrowseAsync(trainingId);

            return _mapper.Map<IEnumerable<Routine>,IEnumerable<RoutineDto>>(routines);
        }

        public async Task CreateAsync(Guid trainingId, string name)
        {
            var routine = await _repo.GetAsync(trainingId, name);
            if(routine != null)
            {
                throw new Exception($"Routine named: '{name}' already exists.");
            }
            routine = new Routine(trainingId, name);
            await _repo.AddAsync(routine);
        }

        public async Task UpdateAsync(Guid id, string name)
        {
            var routine = await _repo.GetAsync(id);
            if(routine == null)
            {
                throw new Exception($"Routine with name: '{name}' does not exists.");
            }
            routine.SetName(name);
            await _repo.UpdateAsync(routine);

        }

        public async Task DeleteAsync(Guid id)
        {
            var routine = await _repo.GetAsync(id);
            if(routine == null)
            {
                throw new Exception("Routine does not exists.");
            }
            await _repo.DeleteAsync(routine);
        }

    }
}
