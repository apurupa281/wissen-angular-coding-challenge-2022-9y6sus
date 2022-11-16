import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  users: any = [];
  user: any; // type this variable using user.type.ts file
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.authenticationService.getUserDetails().subscribe(
      (data: any) => {
        this.users = data?.data;
        console.log(data?.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnDestroy() {}
}
