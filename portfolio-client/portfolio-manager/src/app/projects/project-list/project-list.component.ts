import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from '../project.model';
import { ProjectsService } from '../project.service';

@Component({
  selector: 'manager-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit, OnDestroy {
  projects: Project[] = [];
  subscription: Subscription;

  constructor(private projectService: ProjectsService) { }

  ngOnInit(): void {
    this.subscription = this.projectService.projectListChangedEvent.subscribe((projects) => {
      this.projects = projects;
    });
    this.projectService.getProjects();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
