import { Component, OnInit } from '@angular/core';
import { Auth} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  public user; 

  constructor(private authService: AuthService, private router: Router, private auth: Auth) { }

  ngOnInit() {
    this.user = this.auth.currentUser;
    //alert(this.user.email);
  }

  async logout() {
		await this.authService.logout();
		this.router.navigateByUrl('/', { replaceUrl: true });
	}
}
