import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ClassesService } from '../classes.service';
import { Year } from '../year.model';

@Component({
  selector: 'manager-year-edit',
  templateUrl: './year-edit.component.html',
  styleUrls: ['./year-edit.component.css']
})
export class YearEditComponent {
  originalYear: Year;
  term: Year;
  editMode: Boolean = false;
  // latestClasses: String[] = [];

  constructor (private classesService: ClassesService, private router: Router, 
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        let id = params['id'];
        if (!id) {
          this.editMode = false;
          return;
        }

        this.originalYear = this.classesService.getYear(id);
        
        if (!this.originalYear) {
          return;
        }
        
        this.editMode = true;
        this.term = JSON.parse(JSON.stringify(this.originalYear));
        // this.latestClasses = this.term.classes;
      }
    )
  }

  onSubmit(form: NgForm) {
    let value = form.value;
    // value.classes = this.latestClasses;

    console.log("THIS IS Value")
    console.log(value)
    let newClass = new Year(value.term, value.classes, value.id);

    if (this.editMode) {
      this.classesService.updateClass(this.originalYear, newClass);
    } else {
      this.classesService.addClass(newClass);
    }

    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onNewClass() {
    // this.classes.push("***ENTER NEW CLASS NAME***")
  }

  updateClasses(index: String) {
    // console.log(this.latestClasses[+index]);
  }
}
