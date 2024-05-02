using System.Collections.Generic;
using System.Threading.Tasks;
using ISEF01QuizSystem.Common;
using Volo.Abp;
using Volo.Abp.Domain.Repositories;

namespace ISEF01QuizSystem.Courses;

public class CourseAppService : ISEF01QuizSystemAppService
{
    private readonly IRepository<CourseEntity> _courseRepository;
    
    public CourseAppService(IRepository<CourseEntity> courseRepository)
    {
        _courseRepository = courseRepository;
    }
    
    public async Task<List<CourseResponseDto>> GetAllAsync()
    {
        var entitiesInDb = await _courseRepository.GetListAsync();

        var result = ObjectMapper.Map<List<CourseEntity>, List<CourseResponseDto>>(entitiesInDb);

        return result;
    }
    
    public async Task<CourseResponseDto> GetByIdAsync(int courseId)
    {
        var entityInDb = await _courseRepository.FirstOrDefaultAsync(x => x.Id == courseId);

        if (entityInDb != default)
        {
            var result = ObjectMapper.Map<CourseEntity, CourseResponseDto>(entityInDb);

            return result;
        }

        throw new UserFriendlyException($"Course cannot be found!");
    }
    
    public async Task CreateAsync(CourseRequestDto requestDto)
    {
        var entity = ObjectMapper.Map<CourseRequestDto, CourseEntity>(requestDto);
        
        _courseRepository.CreateOrLoadEntity(ref entity);
    }
    
    public async Task DeleteAsync(int courseId)
    {
        var entityInDb = await _courseRepository.FirstOrDefaultAsync(x => x.Id == courseId);
        
        if (entityInDb != default)
        {
            await _courseRepository.DeleteAsync(entityInDb);
        }

        throw new UserFriendlyException($"Course cannot be deleted, because it doesn't exist!");
    }
}