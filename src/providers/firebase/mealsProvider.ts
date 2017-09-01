import {Injectable} from "@angular/core";
import * as firebase from "firebase/app";
import Reference = firebase.database.Reference;
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {Meal} from "../../pages/meals/meal.model";

@Injectable()
export class MealsProvider {
  //Meals
  private mealsRef:Reference;

  constructor(public afd: AngularFireDatabase) {
    this.mealsRef = afd.database.ref('/meals')
  }

  getAllMeals(): FirebaseListObservable<Meal[]> {
    return this.afd.list(this.mealsRef, {query: {orderByChild: 'datetime'}});
  }

  getAllMealsForToday(): FirebaseListObservable<Meal[]> {
    let startOfTheDay = new Date();
    startOfTheDay.setHours(0, 0, 0, 0);
    let endOfTheDay = new Date();
    endOfTheDay.setHours(23, 59, 59, 999);

    return this.listMeals(startOfTheDay, endOfTheDay);
  }

  listMeals(startOfTheDay: Date, endOfTheDay: Date) {
    return this.afd.list(this.mealsRef,
      {
        query: {
          orderByChild: 'datetime',
          startAt: startOfTheDay.toISOString(),
          endAt: endOfTheDay.toISOString()
        }
      });
  }

  sumTodayMeals(): number {
    let sum = 0;

    let startOfTheDay = new Date();
    startOfTheDay.setHours(0, 0, 0, 0);
    let endOfTheDay = new Date();
    endOfTheDay.setHours(23, 59, 59, 999);

    this.mealsRef
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
      );
    return sum;
  }

  //CRUD
  addMeal(meal: Meal) {
    return this.afd
      .list(this.mealsRef)
      .push(meal);
  }

  editMeal(id: any, meal: Meal) {
    return this.afd.list(this.mealsRef).update(id, meal);
  }

  deleteMeal(id) {
    this.afd.list(this.mealsRef).remove(id);
  }
}
