import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Meal} from "../meals/meal.model";
import {FirebaseProvider} from "../../providers/firebase/firebase";

@Component({
  selector: 'page-add-meal',
  templateUrl: 'add-meal.html'
})
export class AddMealPage {

  private meal: Meal = new Meal;

  constructor(public navCtrl: NavController, public firebaseProvider: FirebaseProvider, public params: NavParams) {
    this.meal.id = this.params.get('key');
    this.meal.datetime = this.params.get('datetime');
    this.meal.quantity = this.params.get('quantity');
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
      .editMeal(this.meal)
      .then(
        updatedMeal => {this.navCtrl.pop(); },
        error => { console.log(error);}
      );
  }
}
