import { IPageData } from './page';
import { IAppSettings } from './settings';

export interface IAppState {
  pageData: IPageData;
  settings: IAppSettings
}
