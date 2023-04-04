import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Testimonial } from './testimonial.model';


@Injectable({
    providedIn: 'root'
})
export class TestimonialsService {
    private testimonials: Testimonial[] = [];
    testimonialsListChangedEvent = new Subject<Testimonial[]>();
    maxTestimonialId: number;

    constructor(private http: HttpClient) {
        this.getTestimonials();
        this.getMaxId();
    }

    getTestimonials() {
        // build the request
        this.http.get<{message: String, data: Testimonial[]}>('http://localhost:3000/testimonials')
        .subscribe(
            (res: {message: String, data: Testimonial[]}) => {
                
                // assign the data
                this.testimonials = res.data;
                this.maxTestimonialId = this.getMaxId();

                // sort
                this.testimonials.sort((curr, next) => {
                    if (curr < next) {
                        return -1
                    } else if (curr > next) {
                        return 1;
                    } else {
                        return 0;
                    }
                });

                // notify observers
                this.testimonialsListChangedEvent.next(this.testimonials.slice());
            }
        );
    }

    getTestimonial(id: String): Testimonial {
        for (let testimonial of this.testimonials) {
            if (testimonial.id == id) {
                return testimonial;
            }
        }
        return null;
    }

    addTestimonial(newTestimonial: Testimonial) {
        if (!newTestimonial) {
            return;
        }
      
        // make sure id of the new project is empty
        newTestimonial.id = '';
      
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
      
        // add to database
        this.http.post<{ message: string, testimonial: Testimonial }>('http://localhost:3000/testimonials',
        newTestimonial,
        { headers: headers })
        .subscribe(
            (responseData) => {
            // add new project to projects
            this.testimonials.push(responseData.testimonial);
            this.testimonialsListChangedEvent.next(this.testimonials.slice());
            }
        );
    }

    updateTestimonial(original: Testimonial, updated: Testimonial) {
        if (!original || !updated) {
            return;
        }
    
        const pos = this.testimonials.findIndex(t => t.id === original.id);
    
        if (pos < 0) {
        return;
        }
    
        // set the id of the new project to the id of the old project
        updated.id = original.id;
    
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
    
        // update database
        this.http.put('http://localhost:3000/testimonials/' + original.id,
        updated, { headers: headers })
        .subscribe(
            (response: Response) => {
            this.testimonials[pos] = updated;
            this.testimonialsListChangedEvent.next(this.testimonials.slice());
            }
        );
    }

    deleteTestimonial(testimonial: Testimonial) {
        // verify the incoming data
        if (!testimonial) {
            return;
        }

        // find the position in the list 
        const pos = this.testimonials.findIndex(t => t.id === testimonial.id);

        // verify it exists in the list
        if (pos < 0) {
            return;
        }

        // now delete from db
        this.http.delete('http://localhost:3000/testimonials/' + testimonial.id)
          .subscribe(
            (response: Response) => {
              this.testimonials.splice(pos, 1);
              this.testimonialsListChangedEvent.next(this.testimonials.slice());
            }
        );
    }

    getMaxId(): number {
        var maxId: number = 0;
        for (let testimonial of this.testimonials) {
            var currentId: number = +testimonial.id;
            if (currentId > maxId) {
                maxId = currentId;
            }
        }
        return maxId;
    }
}