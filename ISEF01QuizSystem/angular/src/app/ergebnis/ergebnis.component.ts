import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuestionResponseDto, QuestionService } from '@proxy/questions';
import { AnswerResponseDto, AnswerService } from '@proxy/answers';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ScoreViewModel } from './view-models/score-view.model';
import { AttemptRequestDto, AttemptService } from '@proxy/attempts';

@Component({
  selector: 'app-ergebnis',
  templateUrl: './ergebnis.component.html',
  styleUrls: ['./ergebnis.component.scss'],
})
export class ErgebnisComponent implements OnInit, OnDestroy
{
  public questionEntities: Array<QuestionResponseDto> = {} as Array<QuestionResponseDto>;
  public givenAnswerEntities: Array<AnswerResponseDto> = {} as Array<AnswerResponseDto>;
  public scoreViewModel: ScoreViewModel = new ScoreViewModel();

  private parentalQuizId: number;
  private _componentDestroyed$: Subject<void> = new Subject();

  constructor(private readonly _activatedRoute: ActivatedRoute,
              private readonly _answerService: AnswerService,
              private readonly _questionService: QuestionService,
              private readonly _attemptService: AttemptService,
              private readonly _router: Router) {}

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

  public GivenAnswerContainsOption(optionId: number): boolean
  {
    let answerByOptionId = this.givenAnswerEntities.find(x => x.optionId == optionId);

    return answerByOptionId !== undefined;
  }

  public QuitReview(): void
  {
    let requestDto =  {quizId: this.parentalQuizId, score: this.ReturnProcentualResult()} as AttemptRequestDto;

    console.log(requestDto)

    this._attemptService.createAttemptByRequestDto(requestDto)
      .pipe(takeUntil(this._componentDestroyed$))
      .subscribe(() =>
      {
        this._router.navigate(["/"]);
      })
  }

  public ReturnProcentualResult(): number
  {

    console.log(this.scoreViewModel.NumberOfCorrectAnswers/this.scoreViewModel.NumberOfQuestions*100)
    console.log(this.scoreViewModel.NumberOfCorrectAnswers)
    console.log(this.scoreViewModel.NumberOfQuestions)

    let result = Math.round(this.scoreViewModel.NumberOfCorrectAnswers/this.scoreViewModel.NumberOfQuestions*100);

    return result;
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

        this.FullResultViewModel();


      });
  }

  private FullResultViewModel()
  {
    this.scoreViewModel.NumberOfQuestions = this.questionEntities.length;

    this.questionEntities.forEach((question) =>
    {
        let questionsRightOptionId = question.options.find(x => x.isCorrect == true).id;

        let givenOptionIdForTheQuestion = this.givenAnswerEntities.find(x => x.questionId == question.id).optionId;

        if (givenOptionIdForTheQuestion == questionsRightOptionId) this.scoreViewModel.NumberOfCorrectAnswers++;
    });

    this.scoreViewModel.ResultPercentual = this.scoreViewModel.NumberOfCorrectAnswers/this.scoreViewModel.NumberOfQuestions*100;
  }
}
