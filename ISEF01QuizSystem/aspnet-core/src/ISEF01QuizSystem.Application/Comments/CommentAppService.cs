using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ISEF01QuizSystem.Common;
using ISEF01QuizSystem.Courses;
using ISEF01QuizSystem.Quiz;
using Volo.Abp;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Users;

namespace ISEF01QuizSystem.Comments;

public class CommentAppService : ISEF01QuizSystemAppService
{
    private readonly IRepository<CommentEntity> _commentRepository;
    private readonly IGenericRepository<CourseEntity> _genericCourseRepository;
    private readonly ICurrentUser _currentUser; 

    public CommentAppService(
        IRepository<CommentEntity> commentRepository, 
        IGenericRepository<CourseEntity> genericCourseRepository, 
        ICurrentUser currentUser)
    {
        _commentRepository = commentRepository;
        _genericCourseRepository = genericCourseRepository;
        _currentUser = currentUser;
    }

    public async Task<List<CommentResultDto>> GetCommentsOrderedForCourse(int courseId)
    {
        var commentsByCourse =
            (await _genericCourseRepository.GetByPredicateWithNestedElements(x => x.Id == courseId)).Comments;

        var orderedComments =commentsByCourse.OrderBy(x => x.Order).ToList();
        var result = ObjectMapper.Map<List<CommentEntity>, List<CommentResultDto>>(orderedComments);

        return result;
    }
    
    public async Task CreateCommentForCourse(CommentRequestDto requestDto)
    {
        if (requestDto.CourseId == null) throw new UserFriendlyException("Comment cannot be bound to Question!");

        var actualComments = await _commentRepository.GetListAsync(x => x.CourseId == requestDto.CourseId);

        var searchLastCommentsOrder = actualComments.Count() == 0 ? 0 : actualComments.MaxBy(x => x.Order).Order;

        var entityToBeInserted = new CommentEntity() {
            CourseId = (int)requestDto.CourseId,
            Content = requestDto.Content,
            UserId = requestDto.UserId
        };
        
        entityToBeInserted.IncrementAndSetOrder(searchLastCommentsOrder);

        await _commentRepository.InsertAsync(entityToBeInserted);
    }
    
    public async Task EditCommentForQuestion(CommentRequestDto requestDto)
    {
        var commentInDb = await _commentRepository.FirstOrDefaultAsync(x => x.Id == requestDto.Id);

        if (commentInDb == default) throw new UserFriendlyException("Comment does not exists!");
        
        commentInDb.Update(requestDto.Content);

        await _commentRepository.UpdateAsync(commentInDb);
    }

    public async Task DeleteComment(int commentId)
    {
        var commentInDb = await _commentRepository.FirstOrDefaultAsync(x => x.Id == commentId);

        if (commentInDb == default) throw new UserFriendlyException("Comment does not exists!");

        await _commentRepository.DeleteAsync(x=> x.Id == commentId);
    }
}