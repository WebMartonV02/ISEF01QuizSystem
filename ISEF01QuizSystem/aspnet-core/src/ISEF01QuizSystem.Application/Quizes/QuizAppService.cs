using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ISEF01QuizSystem.Common;
using ISEF01QuizSystem.Quiz;
using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Domain.Repositories;

namespace ISEF01QuizSystem.Quizes;

public class QuizAppService : ISEF01QuizSystemAppService
{
    private readonly IRepository<QuizEntity> _quizEntityRepository;
    
    public QuizAppService(IRepository<QuizEntity> quizEntityRepository)
    {
        _quizEntityRepository = quizEntityRepository;
    }

    public async Task<List<QuizResponseDto>> GetListAsync(FilteredResultRequestDto requestDto)
    {
        var queryable = await _quizEntityRepository.GetQueryableAsync();

        var defaultSorting = new SortingModel<QuizEntity>(x => x.Title);
        var result = await queryable.GetModifiedDataList<QuizEntity, QuizResponseDto>(
            requestDto,
            AsyncExecuter,
            ObjectMapper,
            defaultSorting);
        
        return result;
    }
    
    public async Task<QuizResponseDto> GetAsync(int id)
    {
        var quizEntity = await _quizEntityRepository.GetAsync(x => x.Id == id);

        var result = ObjectMapper.Map<QuizEntity, QuizResponseDto>(quizEntity);

        return result;
    }
    
    //TODO: Create CreateUpdateOrLoad generic solution -- extension method
    public async Task<QuizResponseDto> UpdateAsync(QuizRequestDto requestDto)
    {
        var quizEntity = await _quizEntityRepository.GetAsync(x => x.Id == requestDto.Id);

        if (quizEntity != default)
        {
            quizEntity.Update(requestDto.Titel, requestDto.Description);

            var updatedEntity =await _quizEntityRepository.UpdateAsync(quizEntity);

            var result = ObjectMapper.Map<QuizEntity, QuizResponseDto>(updatedEntity);

            return result;
        }

        throw new UserFriendlyException("Quiz cannot be updated, because doesn't exist!");
    }
    
    public async Task<QuizResponseDto> CreateAsync(QuizRequestDto requestDto)
    {
        var quizEntity = await _quizEntityRepository.FirstOrDefaultAsync(x => x.Id == requestDto.Id);

        if (quizEntity == default)
        {
            var updatedEntity = await _quizEntityRepository.InsertAsync(quizEntity);

            var result = ObjectMapper.Map<QuizEntity, QuizResponseDto>(updatedEntity);

            return result;
        }

        throw new UserFriendlyException($"Quiz is already existing!");
    }
    
    public async Task DeleteAsync(int id)
    {
        var quizEntity = await _quizEntityRepository.FirstOrDefaultAsync(x => x.Id == id);

        if (quizEntity != default)
        {
            await _quizEntityRepository.DeleteAsync(quizEntity);
        }

        throw new UserFriendlyException($"Quiz cannot be deleted, because it doesn't exist!");
    }
}