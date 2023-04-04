import { Component, Input, OnInit } from '@angular/core';

import { Testimonial } from '../testimonial.model';

@Component({
  selector: 'manager-testimonial-item',
  templateUrl: './testimonial-item.component.html',
  styleUrls: ['./testimonial-item.component.css']
})
export class TestimonialItemComponent implements OnInit {
  @Input() testimonial: Testimonial;

  constructor() { }

  ngOnInit(): void {
    
  }
}