import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AngularFireDatabase} from "angularfire2/database";
import {Meal} from "../../pages/home/meal.model";


@Injectable()
export class FirebaseProvider {

  constructor(public afd: AngularFireDatabase) {

  }

  getMeals() {
    return this.afd.list('/meals/');
  }

  addMeal(meal:Meal) {
    this.afd.list('/meals/').push(meal)
  }

  deleteMeal(id) {
    this.afd.list('/meals/').remove(id)
  }

}
