import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ParserComponent} from './parser/parser.component';

const routeConfig: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'Login page',
  },
  {
    path: 'parse',
    component: ParserComponent,
    title: 'Parser page',
  }
];
export default routeConfig;
