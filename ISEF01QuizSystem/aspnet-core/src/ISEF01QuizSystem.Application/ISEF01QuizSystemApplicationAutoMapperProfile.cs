using AutoMapper;
using ISEF01QuizSystem.Quiz;
using ISEF01QuizSystem.Quizes;

namespace ISEF01QuizSystem;

public class ISEF01QuizSystemApplicationAutoMapperProfile : Profile
{
    public ISEF01QuizSystemApplicationAutoMapperProfile()
    {
        /* You can configure your AutoMapper mapping configuration here.
         * Alternatively, you can split your mapping configurations
         * into multiple profile classes for a better organization. */
        CreateQuizMapping();
    }

    public void CreateQuizMapping()
    {
        CreateMap<QuizEntity, QuizResponseDto>()
            .ForMember(dst => dst.Titel, opt => opt.MapFrom(src => src.Title))
            .ForMember(dst => dst.Description, opt => opt.MapFrom(src => src.Description));
    }
}
