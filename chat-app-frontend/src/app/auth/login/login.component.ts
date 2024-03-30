import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { AppConstants, CONSTANT_MESSAGE, MESSAGE_TYPE } from '@app/core/constants/app.constant';
import { AuthService } from '@app/core/services/auth.service';
import { EncryptDecryptService } from '@app/core/services/encrypted-decrypted.service';
import { ToasterService } from '@app/core/services/toaster.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  userName!: string;

  constructor(private authService: AuthService,
    private toasterService: ToasterService,
    private encryptDecryptService: EncryptDecryptService,
    private router: Router) { }

  onLogin(): void {
    this.authService.loginUser(this.userName).subscribe(res => {
      this.encryptDecryptService.setEncryptedLocalStorage(AppConstants.userInfo, res);
      this.toasterService.displaySnackBar(CONSTANT_MESSAGE.loginSuccess, MESSAGE_TYPE.success);
      this.router.navigate(['/list']);
    })
  }
}
