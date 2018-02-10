using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using gymNotebook.Core.Domain;
using gymNotebook.Core.Repositories;
using gymNotebook.Infrastructure.DTO;

namespace gymNotebook.Infrastructure.Services
{
    public class ResultService : IResultService
    {
        private readonly IResultRepository _resultRepository;
        private readonly IMapper _mapper;

        public ResultService(IResultRepository resultRepository, IMapper mapper)
        {
            _resultRepository = resultRepository;
            _mapper = mapper;
        }

        public async Task<ResultDto> GetAsync(Guid id)
        {
            var result = await _resultRepository.GetAsync(id);

            return _mapper.Map<Result, ResultDto>(result);
        }

        public async Task<ResultDto> GetAsync(Guid exerciseId, int numberSeries)
        {
            var result = await _resultRepository.GetAsync(exerciseId, numberSeries);

            return _mapper.Map<Result, ResultDto>(result);
        }

        public async Task<IEnumerable<ResultDto>> BrowseAsync(Guid exerciseId)
        {
            var results = await _resultRepository.BrowseAsync(exerciseId);

            return _mapper.Map<IEnumerable<ResultDto>>(results);
        }

        public async Task CreateAsync(Guid exerciseId, int numberSeries, int repetitions, float weight, string comments)
        {
            var result = await _resultRepository.GetAsync(exerciseId, numberSeries);
            if (result != null)
            {
                throw new Exception($"Result with series: '{numberSeries}' already exists.");
            }
            result = new Result(exerciseId, numberSeries, repetitions, weight, comments);

            await _resultRepository.AddAsync(result);
        }

        public async Task UpdateAsync(Guid id, int repetitions, float weight, string comments)
        {
            var result = await _resultRepository.GetAsync(id);
            if (result == null)
            {
                throw new Exception($"Result with id: '{id}' does not exist.");
            }
            result.SetComment(comments);
            result.SetWeigth(weight);
            await _resultRepository.UpdateAsync(result);
        }

        public async Task DeleteAsync(Guid id)
        {
            var result = await _resultRepository.GetAsync(id);
            if (result == null)
            {
                throw new Exception($"Result with id: '{id}' does not exist.");
            }
            await _resultRepository.DeleteAsync(result);
        }
    }
}
