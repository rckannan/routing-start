import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { authService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authservice: authService
  ) {}

  onUserClick() {
    this.router.navigate(['/servers'], { relativeTo: this.route });
  }

  onUserLoging() {
    this.authservice.doLogin();
  }

  onUserLogoff() {
    this.authservice.doLogoff();
  }

  ngOnInit() {}
}
