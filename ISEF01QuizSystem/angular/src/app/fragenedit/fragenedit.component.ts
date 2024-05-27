import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateUpdateQuestionProviderService } from '../fragemanager/services/create-update-question-provider.service';
import { QuestionRequestDto, QuestionResponseDto, QuestionService } from '@proxy/questions';

@Component({
  selector: 'app-fragenedit',
  templateUrl: './fragenedit.component.html',
  styleUrls: ['./fragenedit.component.scss'],
})
export class FrageneditComponent implements OnInit
{
  public editableQuestionEntity: QuestionResponseDto = { } as QuestionResponseDto;
  public createOrUpdateRequestDto: QuestionRequestDto = {} as QuestionRequestDto;

  private _parentalQuizId: number;

  constructor(private _activatedRoute: ActivatedRoute,
              private readonly _createUpdateQuestionProviderService: CreateUpdateQuestionProviderService,
              private readonly _questionService: QuestionService,
              private readonly _router: Router) {}

  public ngOnInit(): void
  {
    this._parentalQuizId = Number(this._activatedRoute.snapshot.paramMap.get('id'));

    let editableQuestionId = this._createUpdateQuestionProviderService.Data.QuestionId;

    if (editableQuestionId != null || editableQuestionId != undefined)
    {
      this.LoadDataForVisualization(editableQuestionId);
    }
  }
  public TrackByIndex(index: number, obj: any): any
  {
    return index;
  }

  public SaveQuestionAndAnswerChanges(): void
  {
    this._questionService.createOrUpdate(this.createOrUpdateRequestDto)
      .subscribe(() =>
      {
        this.RouteBackToQuestions();
      })
  }

  public RouteBackToQuestions(): void
  {
    this._router.navigate(["fragemanager"]);
  }

  private LoadDataForVisualization(questionId: number): void
  {
    this._questionService.getById(questionId)
      .subscribe((data) =>
      {
        this.editableQuestionEntity = data;

        this.createOrUpdateRequestDto = {
          id: data.id,
          content: data.content,
          answers: data.options
        }
      });
  }
}
