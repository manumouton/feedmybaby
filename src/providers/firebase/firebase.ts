import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {Meal} from "../../pages/home/meal.model";


@Injectable()
export class FirebaseProvider {

  constructor(public afd: AngularFireDatabase) {

  }

  getAllMeals():FirebaseListObservable<Meal[]> {
    return this.afd.list('/meals/', {query: {orderByChild: 'datetime'}});
  }

  getAllMealsForToday():FirebaseListObservable<Meal[]> {
    var startOfTheDay = new Date();
    startOfTheDay.setHours(0,0,0, 0);
    var endOfTheDay = new Date();
    endOfTheDay.setHours(23,59,59, 999);

    var listOfMealsForToday = this.afd.list('/meals/',
      {query: {
        orderByChild: 'datetime',
        startAt: startOfTheDay.toISOString(),
        endAt: endOfTheDay.toISOString()
      }});
    return listOfMealsForToday;
  }

  addMeal(meal:Meal) {
    this.afd.list('/meals/').push(meal)
  }

  deleteMeal(id) {
    this.afd.list('/meals/').remove(id)
  }

}
