import { ContextMenuActionModel } from "../models/context-menu-action.model";

export class ContextMenuActionFactory
{
  public static CreateAvailableContextActions(
    caption: string,
    callbackMethod: Function,
    iconName: string): ContextMenuActionModel
  {
    let availableContextAction: ContextMenuActionModel = new ContextMenuActionModel();

    availableContextAction.caption = caption;
    availableContextAction.callbackMethod = callbackMethod;
    availableContextAction.IconName = iconName;

    return availableContextAction;
  }
}
