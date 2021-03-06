import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Meal} from "../meals/meal.model";
import {MealsProvider} from "../../providers/firebase/mealsProvider";

@Component({
  selector: 'page-add-meal',
  templateUrl: 'add-meal.html'
})
export class AddMealPage {

  private meal: Meal = new Meal;
  private id: any;

  constructor(public navCtrl: NavController,
              // private datePicker:DatePicker,
              public mealsProvider: MealsProvider,
              public params: NavParams) {
    this.id = this.params.get('key');
    if(this.id){
      this.meal.datetime = this.params.get('datetime');
      this.meal.quantity = this.params.get('quantity');
    }
  }

  addMeal() {
    this.mealsProvider
      .addMeal(this.meal)
      .then(
        createdMeal => {this.navCtrl.pop(); },
        error => { console.log(error);}
      );
  }

  updateMeal() {
    this.mealsProvider
      .editMeal(this.id, this.meal)
      .then(
        updatedMeal => {this.navCtrl.pop(); },
        error => { console.log(error);}
      );
  }
}
