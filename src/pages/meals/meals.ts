import {Component} from '@angular/core';
import {FirebaseListObservable} from 'angularfire2/database';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {AddMealPage} from '../add-meal/add-meal';
import {Meal} from "./meal.model";
import {MealsProvider} from "../../providers/firebase/mealsProvider";

@Component({
  selector: 'page-meals',
  templateUrl: 'meals.html'
})
export class MealsPage {

  private mealsList: FirebaseListObservable<Meal[]>;

  constructor(public navCtrl: NavController, public mealsProvider: MealsProvider, public loadingCtrl: LoadingController, public params: NavParams) {
    this.mealsList = this.mealsProvider.getAllMeals();
  }

  addMeal() {
    this.navCtrl.push(AddMealPage);
  }

  editMeal(meal) {
    this.navCtrl.push(AddMealPage, {
      key: meal.$key,
      datetime: meal.datetime,
      quantity: meal.quantity
    });
  }

  deleteMeal(meal) {
    this.mealsList.remove(meal);
  }

}
