import { IRoute } from '../interfaces/routing';

import NotFound from '../pages/sessions/404';
import InternalError from '../pages/sessions/500';
import SignIn from '../pages/sessions/SignIn';

export const sessionRoutes: IRoute[] = [
  {
    path: 'sign-in',
    component: SignIn
  },
  {
    path: 'page-404',
    component: NotFound
  },
  {
    path: 'page-500',
    component: InternalError
  },
  {
    path: '',
    component: SignIn
  }
];
