import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { ClassesService } from '../classes.service';
import { Year } from '../year.model';

@Component({
  selector: 'manager-year-list',
  templateUrl: './year-list.component.html',
  styleUrls: ['./year-list.component.css']
})
export class YearListComponent {
  years: Year[] = [];
  subscription: Subscription;

  constructor(private classesService: ClassesService) { }

  ngOnInit(): void {
    this.subscription = this.classesService.yearsListChangedEvent.subscribe((years) => {
      this.years = years;
    });
    this.classesService.getYears();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
