import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ClassesService } from '../classes.service';
import { Year } from '../year.model';

@Component({
  selector: 'manager-year-detail',
  templateUrl: './year-detail.component.html',
  styleUrls: ['./year-detail.component.css']
})
export class YearDetailComponent {
  year: Year;   

  constructor(private classesService: ClassesService, private router: Router, 
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.route.params.subscribe(
        (params: Params) => {
          this.year = this.classesService.getYear(params['id']);
        }
      )
    }

    onDelete() {
      this.classesService.deleteYear(this.year);
      this.router.navigate(['/classes']);
    }

}
