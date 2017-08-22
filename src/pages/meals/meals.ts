import {Component} from '@angular/core';
import {FirebaseListObservable} from 'angularfire2/database';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {AddMealPage} from '../add-meal/add-meal';
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {Meal} from "./meal.model";

@Component({
  selector: 'page-meals',
  templateUrl: 'meals.html'
})
export class MealsPage {

  private mealsList: FirebaseListObservable<Meal[]>;

  constructor(public navCtrl: NavController, public firebaseProvider: FirebaseProvider, public loadingCtrl: LoadingController, public params: NavParams) {
    let loading = this.loadingCtrl.create({
      content: "Load Data...",
      duration: 3000,
      dismissOnPageChange: true
    });
    loading.present();
    this.mealsList = this.firebaseProvider.getAllMeals();
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
