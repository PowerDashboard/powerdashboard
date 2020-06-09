import { generatePath } from 'react-router';
import { PathType, RedirectType, Path } from './types';

import Home from 'screens/Home';
import Auth from 'screens/Auth';
import Rules from 'screens/Rules';
import Panel from 'screens/Panel';
import Studio from 'screens/Studio';
import NotFound from 'screens/NotFound';

export const Paths: PathType[] = [
  {
    path: Path.Home,
    exact: true,
    component: Home,
  },
  {
    path: Path.Auth,
    exact: true,
    component: Auth,
  },
  {
    path: Path.Rules,
    exact: true,
    component: Rules,
  },
  {
    path: Path.PanelElement,
    exact: true,
    component: () => Panel({}),
    meta: {
      protected: true,
    }
  },
  {
    path: Path.Studio,
    exact: true,
    component: Studio,
    meta: {
      protected: true,
    }
  },
  {
    path: Path.NotFound,
    exact: true,
    component: NotFound,
  },
];

export const Redirects: RedirectType[] = [
  {
    exact: true,
    from: Path.Panel,
    to: generatePath(Path.PanelElement, {
      element: 'screens'
    }),
  }
];

export {
  Path,
};
