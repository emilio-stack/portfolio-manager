import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Testimonial } from '../testimonial.model';
import { TestimonialsService } from '../testimonial.service';

@Component({
  selector: 'manager-testimonial-edit',
  templateUrl: './testimonial-edit.component.html',
  styleUrls: ['./testimonial-edit.component.css']
})
export class TestimonialEditComponent implements OnInit {
  originalTestimonial: Testimonial;
  testimonial: Testimonial;
  editMode: Boolean = false;

  constructor (private testimonialsService: TestimonialsService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        let id = params['id'];
        if (!id) {
          this.editMode = false;
          return;
        }

        this.originalTestimonial = this.testimonialsService.getTestimonial(id);

        if (!this.originalTestimonial) {
          return;
        }

        this.editMode = true;
        this.testimonial = JSON.parse(JSON.stringify(this.originalTestimonial));
      }
    )
  }

  onSubmit(form: NgForm) {
    let value = form.value;
    let newTestimonial = new Testimonial(value.quality, value.text, value.person, value.credentials, value.id);

    if (this.editMode) {
      this.testimonialsService.updateTestimonial(this.originalTestimonial, newTestimonial);
    } else {
      this.testimonialsService.addTestimonial(newTestimonial);
    }

    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
