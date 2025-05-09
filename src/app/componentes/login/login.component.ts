import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../servicios/login.service';
import { Auth, authState } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string | null = null;
  password: string | null = null;
  mensaje: string | null = null;

  constructor(private router: Router, private loginService: LoginService, private authService: Auth) {}

  ngOnInit() {
    this.loginService.getAuthState().subscribe(usuario => {
      if (usuario) {
        this.router.navigate(['/']);
      }
    });
  }

  login() {
    if (this.email && this.password) {
      this.loginService
        .login(this.email, this.password)
        .then(() => {
          this.router.navigate(['/']);
        })
        .catch((error) => {
          this.mensaje = 'error al hacer login' + error;
        });
    } else {
      this.mensaje = 'Por favor ingrese email y contraseña';
    }
  }

  

}
