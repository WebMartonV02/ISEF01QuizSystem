import { DataProviderService } from "../../shared/services/data-provider.service";
import { QuestionCreateOrUpdateViewModel } from '../view-models/question-create-update-view.model';
import { Injectable } from '@angular/core';

@Injectable()
export class CreateUpdateQuestionProviderService extends DataProviderService<QuestionCreateOrUpdateViewModel>
{
  constructor()
  {
    super()
  }

  public ResetDataField(): void
  {
    this._data = null;
  }
}
