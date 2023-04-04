import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Project } from '../project.model';
import { ProjectsService } from '../project.service';

@Component({
  selector: 'manager-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  originalProject: Project;
  project: Project;
  editMode: Boolean = false;

  constructor (private projectsService: ProjectsService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        let id = params['id'];
        if (!id) {
          this.editMode = false;
          return;
        }

        this.originalProject = this.projectsService.getProject(id);

        if (!this.originalProject) {
          return;
        }

        this.editMode = true;
        this.project = JSON.parse(JSON.stringify(this.originalProject));
      }
    )
  }

  onSubmit(form: NgForm) {
    let value = form.value;
    let newProject = new Project(value.title, value.description, value.image, value.tags, 
      value.source, value.demo, value.id);

    if (this.editMode) {
      this.projectsService.updateProject(this.originalProject, newProject);
    } else {
      this.projectsService.addProject(newProject);
    }

    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
