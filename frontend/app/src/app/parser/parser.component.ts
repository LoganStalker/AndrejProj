import {Component, inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {CommonModule} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parser',
  providers: [CookieService],
  imports: [CommonModule],
  template: `
    <section>
      <div>
        <button class="primary" type="button" (click)="logout(xacc.value)"></button>
      </div>
    </section>
    <section>
      <div class="container">
        <form>
          <button class="primary" type="button" (click)="scrap(xacc.value)">Tell me about...</button>
          <input type="text" placeholder="X account name" #xacc />
        </form>
      </div>
    </section>
  `,
  styleUrl: './parser.component.css'
})
export class ParserComponent {
  http: HttpClient = inject(HttpClient)
  router: Router = inject(Router)
  token: string = ""

  constructor(private cookieService: CookieService) {
    if (this.cookieService.get("token")) {
      this.token = this.cookieService.get("token")
    }
  }

  async scrap(xacc: string){
    const myHeaders = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": `Bearer ${this.token}`
    });

    this.http.post("http://localhost:8000/api/users/v1/scrapper/get",
      {"sxacc": xacc},
      {headers: myHeaders}
    ).subscribe({
      next:(data: any) => {
        console.log('RESP', data)
      },
      error: error => console.log(error)
    });
  }

  async logout(xacc: string){
    const myHeaders = new HttpHeaders({
      "Accept": "application/json",
      "Authorization": `Bearer ${this.token}`
    });

    this.http.post("http://localhost:8000/api/users/v1/logout",
      {},
      {headers: myHeaders}
    ).subscribe({
      next:(data: any) => {
        console.log('RESP', data)
        this.cookieService.delete("token");
        this.router.navigate(["/"]);
      },
      error: error => console.log(error)
    });
  }

}
