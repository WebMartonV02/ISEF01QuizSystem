using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ISEF01QuizSystem.Common;
using ISEF01QuizSystem.Quiz;
using Volo.Abp;
using Volo.Abp.Domain.Repositories;

namespace ISEF01QuizSystem.Comments;

public class CommentAppService : ISEF01QuizSystemAppService
{
    private readonly IRepository<CommentEntity> _commentRepository;
    private readonly IGenericRepository<QuizEntity> _genericQuizRepository;

    public CommentAppService(
        IRepository<CommentEntity> commentRepository, 
        IGenericRepository<QuizEntity> genericQuizRepository)
    {
        _commentRepository = commentRepository;
        _genericQuizRepository = genericQuizRepository;
    }

    public async Task<List<CommentResultDto>> GetCommentsOrderedForQuiz(int quizId)
    {
        var commentsByQuestion =
            (await _genericQuizRepository.GetByPredicateWithNestedElements(x => x.Id == quizId)).Comments;

        var orderedComments =commentsByQuestion.OrderBy(x => x.Order).ToList();
        var result = ObjectMapper.Map<List<CommentEntity>, List<CommentResultDto>>(orderedComments);

        return result;
    }
    
    public async Task CreateCommentForQuestion(CommentRequestDto requestDto)
    {
        if (requestDto.QuizId == null) throw new UserFriendlyException("Comment cannot be bound to Question!");

        var actualComments = await _commentRepository.GetListAsync(x => x.QuizId == requestDto.QuizId);

        var searchLastCommentsOrder = actualComments.MaxBy(x => x.Order).Order;

        var entityToBeInserted = ObjectMapper.Map<CommentRequestDto, CommentEntity>(requestDto);

        entityToBeInserted.IncrementAndSetOrder(searchLastCommentsOrder);

        await _commentRepository.InsertAsync(entityToBeInserted);
    }
    
    public async Task EditCommentForQuestion(CommentRequestDto requestDto)
    {
        var commentInDb = await _commentRepository.FirstOrDefaultAsync(x => x.Id == requestDto.Id);

        if (commentInDb == default) throw new UserFriendlyException("Comment does not exists!");
        
        commentInDb.Update(requestDto.Text);

        await _commentRepository.UpdateAsync(commentInDb);
    }

    public async Task DeleteComment(int commentId)
    {
        var commentInDb = await _commentRepository.FirstOrDefaultAsync(x => x.Id == commentId);

        if (commentInDb == default) throw new UserFriendlyException("Comment does not exists!");

        await _commentRepository.DeleteAsync(x=> x.Id == commentId);
    }
}