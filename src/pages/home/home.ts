import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {FirebaseListObservable} from "angularfire2/database";
import {FirebaseProvider} from "../../providers/firebase/firebase";
import {Meal} from "./meal.model";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private meals: FirebaseListObservable<Meal[]>;

  private newMeal: Meal;

  private todayQuantity: number;

  constructor(public navCtrl: NavController, public firebaseProvider: FirebaseProvider, public formBuilder: FormBuilder) {
    this.meals = this.firebaseProvider.getAllMealsForToday();
    this.newMeal = new Meal;

    this.getQuantityDrunkToday();
  }

  addMeal() {
    this.firebaseProvider.addMeal(this.newMeal);
  }

  deleteMeal(id) {
    this.firebaseProvider.deleteMeal(id);
  }

  logFrom(value: any){
    console.log(value);
  }

  getQuantityDrunkToday(){
    let sum = 0;
    this.meals.$ref.on("value", function(snapshot){
      snapshot.forEach(
        mealsSnapshot => sum += mealsSnapshot.val().quantity
      );
    });
    console.log(sum);
  }

}
