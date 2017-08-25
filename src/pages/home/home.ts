import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {FirebaseListObservable} from "angularfire2/database";
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {Meal} from "../meals/meal.model";
import {ProfilePage} from "../profile/profile";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private meals: FirebaseListObservable<Meal[]>;

  private todayQuantity: number;

  constructor(public navCtrl: NavController, public firebaseProvider: FirebaseProvider) {
    this.meals = this.firebaseProvider.getAllMealsForToday();
    this.todayQuantity = this.getQuantityDrunkToday();
  }

  logFrom(value: any){
    console.log(value);
  }

  getQuantityDrunkToday(): number{
    return this.firebaseProvider.sumTodayMeals();
  }

  goToProfile(){ this.navCtrl.push(ProfilePage); }

}
