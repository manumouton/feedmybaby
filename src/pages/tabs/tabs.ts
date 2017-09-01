import {Component} from '@angular/core';

import {HomePage} from '../home/home';
import {AboutPage} from '../about/about';
import {MealsPage} from "../meals/meals";
import {GraphsPage} from "../graphs/graphs";
import {ProfilePage} from "../profile/profile";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  homeTab: any = HomePage;
  mealsTab: any = MealsPage;
  chartsTab: any = GraphsPage;
  profileTab: any = ProfilePage;
  aboutTab: any = AboutPage;

  constructor() {

  }
}
