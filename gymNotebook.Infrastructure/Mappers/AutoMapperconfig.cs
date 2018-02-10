using AutoMapper;
using gymNotebook.Core.Domain;
using gymNotebook.Infrastructure.DTO;

namespace gymNotebook.Infrastructure.Mappers
{
    public static class AutoMapperConfig
    {
        public static IMapper Initialize()
            => new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<User, UserDto>();
                cfg.CreateMap<Training, TrainingDto>();
            })
            .CreateMapper();
    }
}
