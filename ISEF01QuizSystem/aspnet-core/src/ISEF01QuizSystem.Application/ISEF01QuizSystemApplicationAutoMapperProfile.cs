using AutoMapper;
using ISEF01QuizSystem.Answers;
using ISEF01QuizSystem.Comments;
using ISEF01QuizSystem.Courses;
using ISEF01QuizSystem.Options;
using ISEF01QuizSystem.Questions;
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
        CreateQuestionMapping();
        CreateCommentMapping();
        CreateCourseMapping();
        CreateOptionsMapping();
        CreateAnswersMapping();
    }

    public void CreateQuizMapping()
    {
        CreateMap<QuizEntity, QuizResponseDto>()
            .ForMember(dst => dst.Titel, opt => opt.MapFrom(src => src.Title))
            .ForMember(dst => dst.Description, opt => opt.MapFrom(src => src.Description));

        CreateMap<QuizEntity, QuizEntity>();
    }

    public void CreateQuestionMapping()
    {
        CreateMap<QuestionEntity, QuestionResponseDto>()
            .ForMember(dst => dst.QuizId, opt => opt.MapFrom(src => src.QuizId))
            .ForMember(dst => dst.Content, opt => opt.MapFrom(src => src.Content))
            .ForMember(dst => dst.Order, opt => opt.MapFrom(src => src.Order))
            .ForMember(dst => dst.Options, opt => opt.MapFrom(src => src.Options));

        CreateMap<QuestionEntity, QuestionEntity>();

        CreateMap<QuestionRequestDto, QuestionEntity>()
            .ForMember(dst => dst.Content, opt => opt.MapFrom(src => src.Content));
    }
    
    public void CreateCommentMapping()
    {
        CreateMap<CommentEntity, CommentResultDto>()
            .ForMember(dst => dst.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dst => dst.Text, opt => opt.MapFrom(src => src.Content));
    }
    
    public void CreateCourseMapping()
    {
        CreateMap<CourseEntity, CourseResponseDto>()
            .ForMember(dst => dst.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dst => dst.Title, opt => opt.MapFrom(src => src.Title))
            .ForMember(dst => dst.Description, opt => opt.MapFrom(src => src.Description));
        
        CreateMap<CourseRequestDto, CourseEntity>()
            .ForMember(dst => dst.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dst => dst.Title, opt => opt.MapFrom(src => src.Title))
            .ForMember(dst => dst.Description, opt => opt.MapFrom(src => src.Description));

        CreateMap<CourseEntity, CourseEntity>();
    }

    public void CreateOptionsMapping()
    {
        CreateMap<OptionEntity, OptionResponseDto>();
        CreateMap<OptionRequestDto, OptionEntity>();
    }
    
    public void CreateAnswersMapping()
    {
        CreateMap<AnswerEntity, AnswerResponseDto>();
    }
}
