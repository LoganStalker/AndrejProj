import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  providers: [CookieService],
  imports: [CommonModule],
  template: `
    <section>
      <div class="container">
        <form>
          <div class="fields">
            <input type="text" placeholder="Email" #email /><br><br>
            <input type="text" placeholder="Password" #passw /><br><br>
          </div>
          <div class="buttons">
            <button class="primary" type="button" (click)="login(email.value, passw.value)">Login</button>
            <p>or</p>
            <button class="primary" type="button" (click)="register(email.value, passw.value)">Register</button>
          </div>
        </form>
      </div>
    </section>
  `,
  styleUrl: './login.component.css'
})
export class LoginComponent {
  http: HttpClient = inject(HttpClient)

  constructor(private cookieService: CookieService, private router: Router) {
    if (this.cookieService.get("token")) {
      this.router.navigate(["/parse"]);
    }
  }

  async login(email: string, passwd: string){
    const myHeaders = new HttpHeaders().set("Accept", "application/json");
    this.http.post("http://localhost:8000/api/users/v1/login",
      {"email": email, "password": passwd},
      {headers: myHeaders}
    ).subscribe({
      next:(data: any) => {
        console.log('RESP', data)
        this.cookieService.set("token", data["token"]);
        this.router.navigate(["/parse"]);
      },
      error: error => console.log(error)
    });
  }

  async register(email: string, passwd: string){
    const myHeaders = new HttpHeaders().set("Accept", "application/json");
    this.http.post("http://localhost:8000/api/users/v1/register",
      {"email": email, "password": passwd},
      {headers: myHeaders}
    ).subscribe({
      next:(data: any) => {
        console.log('RESP', data)
        this.cookieService.set("token", data["token"]);
        this.router.navigate(["/parse"]);
      },
      error: error => console.log(error)
    });
  }
}
