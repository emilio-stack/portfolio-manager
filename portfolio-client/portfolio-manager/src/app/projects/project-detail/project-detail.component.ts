import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Project } from '../project.model';
import { ProjectsService } from '../project.service';

@Component({
  selector: 'manager-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project: Project;   

  constructor(private projectService: ProjectsService, private router: Router, 
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.route.params.subscribe(
        (params: Params) => {
          this.project = this.projectService.getProject(params['id']);
        }
      )
    }

    onDelete() {
      this.projectService.deleteProject(this.project);
      this.router.navigate(['/projects']);
    }

}
