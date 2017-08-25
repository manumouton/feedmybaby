import {Component} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthProvider} from '../../providers/auth/auth';
import {EmailValidator} from '../../validators/email';

@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  public resetPasswordForm: FormGroup;

  constructor(public navCtrl: NavController, public authProvider: AuthProvider,
              public formBuilder: FormBuilder, public alertCtrl: AlertController) {

    this.resetPasswordForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
    });
  }

  resetPassword() {
    if (!this.resetPasswordForm.valid) {
      console.log(this.resetPasswordForm.value);
    } else {
      this.authProvider.resetPassword(this.resetPasswordForm.value.email)
        .then((user) => {
          let alert = this.alertCtrl.create({
            message: "We just sent you a reset link to your email",
            buttons: [
              {
                text: "Ok",
                role: 'cancel',
                handler: () => {
                  this.navCtrl.pop();
                }
              }
            ]
          });
          alert.present();

        }, (error) => {
          let errorMessage: string = error.message;
          let errorAlert = this.alertCtrl.create({
            message: errorMessage,
            buttons: [{text: "Ok", role: 'cancel'}]
          });
          errorAlert.present();
        });
    }
  }
}
