using AutoMapper;
using gymNotebook.Core.Domain;
using gymNotebook.Infrastructure.DTO;
using Profile = gymNotebook.Core.Domain.Profile;

namespace gymNotebook.Infrastructure.Mappers
{
    public static class AutoMapperConfig
    {
        public static IMapper Initialize()
            => new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<User, UserDto>();
                cfg.CreateMap<Training, TrainingDto>();
                cfg.CreateMap<Exercise, ExerciseDto>();
                cfg.CreateMap<Friend, FriendDto>();
                cfg.CreateMap<User, UserDto>();
                cfg.CreateMap<Routine, RoutineDto>();
                cfg.CreateMap<Result, ResultDto>();
                cfg.CreateMap<Progress, ProgressDto>();
                cfg.CreateMap<Profile, ProfileDto>()
                    .ForMember(dest => dest.ImageURL, opt => opt.MapFrom(src => $"http:/192.168.178.91:5001/api/Image/{src.ImageId}")); ;
                cfg.CreateMap<Post, PostDto>()
                    .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.User.Profile.FirstName))
                    .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.User.Profile.LastName));
                cfg.CreateMap<Image, ImageDto>();
                cfg.CreateMap<Comment, CommentDto>()
                    .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.User.Profile.FirstName + " " + src.User.Profile.LastName))
                    .ForMember(dest => dest.ImageURL, opt => opt.MapFrom(src => $"http:/192.168.178.91:5001/api/Image/{src.User.Profile.ImageId}"));

            })
            .CreateMapper();
    }
}
