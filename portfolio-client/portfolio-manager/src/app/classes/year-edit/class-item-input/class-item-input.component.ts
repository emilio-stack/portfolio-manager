import { Component, Input, OnInit } from '@angular/core';
import { ClassesService } from '../../classes.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'manager-class-item-input',
  templateUrl: './class-item-input.component.html',
  styleUrls: ['./class-item-input.component.css']
})
export class ClassItemInputComponent implements OnInit {
  @Input() class: String;
  @Input() index: String;
  className: String;

  constructor(private classesService: ClassesService) { }

  ngOnInit(): void {
    // this.classesService.addEditedClass(this.class);
  }

  onSubmit(form: NgForm) {
    let value = form.value;
    // value.classes = this.classesService.getEditedClasses();
    console.log("THIS IS class Value")
    console.log(value)

  }

  onDelete() {
    // this.classesService.deleteEditedClass(this.index);
  }

  onKeyDown() {
    console.log("keydown")
    console.log()
  }
}
