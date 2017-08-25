import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {Meal} from "../../pages/meals/meal.model";


@Injectable()
export class FirebaseProvider {

  constructor(public afd: AngularFireDatabase) {

  }

  getAllMeals(): FirebaseListObservable<Meal[]> {
    return this.afd.list('/meals/', {query: {orderByChild: 'datetime'}});
  }

  getAllMealsForToday(): FirebaseListObservable<Meal[]> {
    let startOfTheDay = new Date();
    startOfTheDay.setHours(0, 0, 0, 0);
    let endOfTheDay = new Date();
    endOfTheDay.setHours(23, 59, 59, 999);

    return this.listMeals(startOfTheDay, endOfTheDay);
  }

  listMeals(startOfTheDay: Date, endOfTheDay: Date) {
    return this.afd.list('/meals/',
      {
        query: {
          orderByChild: 'datetime',
          startAt: startOfTheDay.toISOString(),
          endAt: endOfTheDay.toISOString()
        }
      });
  }

  sumTodayMeals() {
    let sum = 0;

    let startOfTheDay = new Date();
    startOfTheDay.setHours(0, 0, 0, 0);
    let endOfTheDay = new Date();
    endOfTheDay.setHours(23, 59, 59, 999);

    let mealsRef = this.afd.database.ref("meals/");

    mealsRef
      .startAt(startOfTheDay.toISOString())
      .endAt(endOfTheDay.toISOString())
      .once("value",
        a => {
          console.log("In once: " + a.val());
        }
      )
      .then(a => {
          console.log("In then: " + a);
          console.log(a);
          console.log("In then val: " + a.val());
          console.log(sum);
          return sum;
        }, err => console.log(err)

      )
  }

//CRUD
  addMeal(meal: Meal) {
    return this.afd
      .list('/meals/')
      .push(meal);
  }

  editMeal(id: any, meal: Meal) {
    return this.afd.list('/meals/').update(id, meal);
  }

  deleteMeal(id) {
    this.afd.list('/meals/').remove(id);
  }

}
