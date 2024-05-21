import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuestionResponseDto, QuestionService } from '@proxy/questions';
import { AnswerResponseDto, AnswerService } from '@proxy/answers';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ergebnis',
  templateUrl: './ergebnis.component.html',
  styleUrls: ['./ergebnis.component.scss'],
})
export class ErgebnisComponent implements OnInit, OnDestroy
{
  public questionEntities: Array<QuestionResponseDto> = {} as Array<QuestionResponseDto>;
  public givenAnswerEntities: Array<AnswerResponseDto> = {} as Array<AnswerResponseDto>;

  private parentalQuizId: number;
  private _componentDestroyed$: Subject<void> = new Subject();

  constructor(private readonly _activatedRoute: ActivatedRoute,
              private readonly _answerService: AnswerService,
              private readonly _questionService: QuestionService) {}

  public ngOnInit(): void
  {
    this.parentalQuizId = Number(this._activatedRoute.snapshot.paramMap.get('id'));

    this.LoadDataForVisualization();
  }

  public ngOnDestroy(): void
  {
    this._componentDestroyed$.next();
    this._componentDestroyed$.complete();
  }

  public IsGivenAnswerCorrect(question: QuestionResponseDto): boolean
  {
    let correctOptionOfQuestion = question.options.find(x => x.isCorrect == true);
    let givenAnswerForQuestion = this.givenAnswerEntities.find(x => x.questionId == question.id);

    return correctOptionOfQuestion.id == givenAnswerForQuestion.optionId;
  }

  public QuitReview(): void
  {

  }

  private LoadDataForVisualization(): void
  {
    this._questionService.getListByQuizId(this.parentalQuizId)
      .pipe(
        takeUntil(this._componentDestroyed$),
        switchMap((data) =>
        {
          this.questionEntities = data;

          let questionIdsInResult = data.map(x => x.id);

          return this._answerService.getAnswersForQuizByUserIdByQuestionIds(questionIdsInResult);
        })
      )
      .subscribe((data) =>
      {
        this.givenAnswerEntities = data;
      });
  }
}
