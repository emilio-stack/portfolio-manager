import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Testimonial } from '../testimonial.model';
import { TestimonialsService } from '../testimonial.service';

@Component({
  selector: 'manager-testimonial-detail',
  templateUrl: './testimonial-detail.component.html',
  styleUrls: ['./testimonial-detail.component.css']
})
export class TestimonialDetailComponent {
  testimonial: Testimonial;   

  constructor(private testimonialsService: TestimonialsService, private router: Router, 
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.route.params.subscribe(
        (params: Params) => {
          this.testimonial = this.testimonialsService.getTestimonial(params['id']);
        }
      )
    }

    onDelete() {
      this.testimonialsService.deleteTestimonial(this.testimonial);
      this.router.navigate(['/testimonials']);
    }
}
