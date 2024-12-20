import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
    ])
  ],
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
