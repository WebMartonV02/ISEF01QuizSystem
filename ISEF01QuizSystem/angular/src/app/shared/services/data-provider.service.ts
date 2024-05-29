import { Subject } from "rxjs";

export abstract class DataProviderService<TData>
{
  protected _data: TData;
  protected _dataChanged = new Subject<TData>();
  public DataChanged$ = this._dataChanged.asObservable();

  public get Data(): TData
  {
    return this._data;
  }

  public SetData(data: TData)
  {
    this._data = data;
    this._dataChanged.next(this._data);
  }
}
