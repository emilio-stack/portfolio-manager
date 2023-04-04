import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { Testimonial } from '../testimonial.model';
import { TestimonialsService } from '../testimonial.service';

@Component({
  selector: 'manager-testimonial-list',
  templateUrl: './testimonial-list.component.html',
  styleUrls: ['./testimonial-list.component.css']
})
export class TestimonialListComponent {
  testimonials: Testimonial[] = [];
  subscription: Subscription;

  constructor(private testimonialService: TestimonialsService) { }

  ngOnInit(): void {
    this.subscription = this.testimonialService.testimonialsListChangedEvent.subscribe((testimonials) => {
      this.testimonials = testimonials;
    });
    this.testimonialService.getTestimonials();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
