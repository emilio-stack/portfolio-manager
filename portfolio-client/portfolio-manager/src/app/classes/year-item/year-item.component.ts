import { Component, Input, OnInit } from '@angular/core';
import { Year } from '../year.model';

@Component({
  selector: 'manager-year-item',
  templateUrl: './year-item.component.html',
  styleUrls: ['./year-item.component.css']
})
export class YearItemComponent implements OnInit {
  @Input() year: Year;

  constructor() { }

  ngOnInit(): void {
    
  }
}
