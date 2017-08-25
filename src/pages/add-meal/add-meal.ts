import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Meal} from "../meals/meal.model";
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {DatePicker} from "@ionic-native/date-picker";

@Component({
  selector: 'page-add-meal',
  templateUrl: 'add-meal.html'
})
export class AddMealPage {

  private meal: Meal = new Meal;
  private id: any;

  constructor(public navCtrl: NavController,
              // private datePicker:DatePicker,
              public firebaseProvider: FirebaseProvider,
              public params: NavParams) {
    this.id = this.params.get('key');
    if(this.id){
      this.meal.datetime = this.params.get('datetime');
      this.meal.quantity = this.params.get('quantity');
    }

    // this.datePicker.show(
    //   {date: new Date(),
    //     mode: 'date',
    //     androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
    //     is24Hour: true
    //   }).then(
    //   date => console.log('Got date: ', date),
    //   err => console.log('Error occurred while getting date: ', err)
    // );
  }

  addMeal() {
    this.firebaseProvider
      .addMeal(this.meal)
      .then(
        createdMeal => {this.navCtrl.pop(); },
        error => { console.log(error);}
      );
  }

  updateMeal() {
    this.firebaseProvider
      .editMeal(this.id, this.meal)
      .then(
        updatedMeal => {this.navCtrl.pop(); },
        error => { console.log(error);}
      );
  }
}
