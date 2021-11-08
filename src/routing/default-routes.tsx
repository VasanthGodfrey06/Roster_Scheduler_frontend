import { IRoute } from '../interfaces/routing';

import SettingsPage from '../pages/settings/Settings';
import DashboardPage from '../pages/dashboards/dashboard/Dashboard';
import DoctorsPage from '../pages/dashboards/doctors/Doctors';
import AlertsPage from '../pages/components/AlertsPage';
import AutocompletePage from '../pages/components/AutocompletePage';
import BadgesPage from '../pages/components/BadgesPage';
// import ContactsPage from '../pages/components/ContactsPage';
import InputsPage from '../pages/components/InputsPage';
import RatingPage from '../pages/components/RatingsPage';
import ModalsPage from '../pages/components/ModalsPage';
import SelectsPage from '../pages/components/SelectsPage';
import SwitchersPage from '../pages/components/SwitchersPage';
import CheckboxesPage from '../pages/components/CheckboxesPage';
import RadiosPage from '../pages/components/RadiosPage';
import TimelinePage from '../pages/components/TimlinesPage';
import CardsPage from '../pages/components/CardsPage';
import ButtonsPage from '../pages/components/ButtonsPage';
import TextareasPage from '../pages/components/TextAreaPage';
import DoctorProfilePage from '../pages/medic/DoctorsProfilePage';
import UserProfilePage from '../pages/services/UserProfilePage';
import EditAccountPage from '../pages/services/EditAccounPage';
import EventsCalendarPage from '../pages/services/EventsCalendarPage';
import RechartsPage from '../pages/charts/recharts/Rechart';
import ApplyForLeave from '../pages/ApplyForLeave/ApplyForLeave';
import ReportMessage from '../pages/ReportMessage/ReportMessage';
import VeiwRoster from '../pages/ViewRoster/ViewRoster';
import SelectPre from '../pages/SelectPre/SelectPre';
import Viewleave from '../pages/ApplyForLeave/Viewleave';
import ViewReport from '../pages/ReportMessage/ViewReport';

export const defaultRoutes: IRoute[] = [
  {
    path: 'settings',
    component: SettingsPage
  },
  {
    path: 'select-preference',
    component: SelectPre
  },
  {
    path: 'default-dashboard',
    component: DashboardPage
  },
  {
    path: 'view-roster',
    component: VeiwRoster
  },

  {
    path: 'leave-application',
    component: ApplyForLeave
  },
  {
    path: 'send-report',
    component: ReportMessage
  },
  {
    path: 'doctors',
    component: DoctorsPage
  },
  {
    path: 'doctor-profile',
    component: DoctorProfilePage
  },
  {
    path: 'alerts',
    component: AlertsPage
  },
  {
    path: 'autocompletes',
    component: AutocompletePage
  },
  {
    path: 'badges',
    component: BadgesPage
  },
  // {
  //   path: 'contacts',
  //   component: ContactsPage
  // },
  {
    path: 'inputs',
    component: InputsPage
  },
  {
    path: 'ratings',
    component: RatingPage
  },
  {
    path: 'modal-windows',
    component: ModalsPage
  },
  {
    path: 'selects',
    component: SelectsPage
  },
  {
    path: 'switchers',
    component: SwitchersPage
  },
  {
    path: 'checkboxes',
    component: CheckboxesPage
  },
  {
    path: 'radio-buttons',
    component: RadiosPage
  },
  {
    path: 'v-timeline',
    component: TimelinePage
  },
  {
    path: 'cards',
    component: CardsPage
  },
  {
    path: 'buttons',
    component: ButtonsPage
  },
  {
    path: 'textareas',
    component: TextareasPage
  },

  {
    path: 'user-profile',
    component: UserProfilePage
  },
  {
    path: 'edit-account',
    component: EditAccountPage
  },
  {
    path: 'events-calendar/:ward_id/:date/:ward_name',
    component: EventsCalendarPage
  },
  {
    path: 'recharts',
    component: RechartsPage
  },
  {
    path: 'view-leave',
    component: Viewleave
  },
  {
    path: 'view-report',
    component: ViewReport
  }
];
