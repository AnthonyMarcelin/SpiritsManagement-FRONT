import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../core/services/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule, MatIconModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  isAdmin = false;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.auth.getMe().subscribe({
      next: (user) => {
        this.isAdmin = !!user.isAdmin;
      },
      error: () => {
        this.isAdmin = false;
      },
    });
  }

  logout() {
    this.auth.logout().subscribe({
      next: () => {
        this.router.navigate(['']);
      },
      error: () => {
        this.router.navigate(['/login']);
      },
    });
  }
}
