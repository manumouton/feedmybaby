import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {FirebaseListObservable} from "angularfire2/database";
import {Meal} from "../meals/meal.model";
import {ProfilePage} from "../profile/profile";
import {MealsProvider} from "../../providers/firebase/mealsProvider";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private meals: FirebaseListObservable<Meal[]>;

  private todayQuantity: number;

  constructor(public navCtrl: NavController, public mealsProvider: MealsProvider) {
    this.meals = this.mealsProvider.getAllMealsForToday();
    this.todayQuantity = this.getQuantityDrunkToday();
  }

  logFrom(value: any){
    console.log(value);
  }

  getQuantityDrunkToday(): number{
    return this.mealsProvider.sumTodayMeals();
  }

  goToProfile(){ this.navCtrl.push(ProfilePage); }

}
