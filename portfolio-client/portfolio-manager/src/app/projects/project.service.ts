import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Project } from './project.model';


/*********************************************
 * PROJECTS SERVICE
 * A service to manage CRUD operations for
 * all the projects in the app
 * 
 * Attributes: 
 *  projects - the list of projects
 *  projectsListChangedEvent - the list of projects changed
 *  projectsSelectedEvent - a project was selected
 *  maxProjectId - max id of the projects
 *********************************************/
@Injectable({
    providedIn: 'root'
})
export class ProjectsService {
    private projects: Project[] = [];
    projectListChangedEvent = new Subject<Project[]>();
    maxProjectId: number;

    /****************************************
     * Constructor
     * Inject http service
     ****************************************/
    constructor(private http: HttpClient) {
        this.getProjects();
        this.getMaxId();
    }

    /****************************************
     * GET PROJECTS
     * Get all the projects from the DB
     ****************************************/
    getProjects() {
        // build the request
        this.http.get<{message: String, data: Project[]}>('http://localhost:3000/projects')
        .subscribe(
            (res: {message: String, data: Project[]}) => {
                
                // assign the data
                this.projects = res.data;
                this.maxProjectId = this.getMaxId();

                // sort
                this.projects.sort((curr, next) => {
                    if (curr < next) {
                        return -1
                    } else if (curr > next) {
                        return 1;
                    } else {
                        return 0;
                    }
                });

                // notify observers
                this.projectListChangedEvent.next(this.projects.slice());
            }
        );
    }

    /*****************************************
     * GET PROJECT
     * Get one project by id
     ****************************************/
    getProject(id: String): Project {
        for (let project of this.projects) {
            if (project.id == id) {
                return project;
            }
        }
        return null;
    }

    /***************************************
     * ADD PROJECT
     * Add a new project
     ***************************************/
    addProject(newProject: Project) {
        if (!newProject) {
            return;
        }
      
        // make sure id of the new project is empty
        newProject.id = '';
      
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
      
        // add to database
        this.http.post<{ message: string, project: Project }>('http://localhost:3000/projects',
        newProject,
        { headers: headers })
        .subscribe(
            (responseData) => {
            // add new project to projects
            this.projects.push(responseData.project);
            this.projectListChangedEvent.next(this.projects.slice());
            }
        );
    }

    /***************************************
     * UPDATE PROJECT
     * Update a project
     **************************************/
    updateProject(original: Project, updated: Project) {
        if (!original || !updated) {
            return;
        }
    
        const pos = this.projects.findIndex(p => p.id === original.id);
    
        if (pos < 0) {
        return;
        }
    
        // set the id of the new project to the id of the old project
        updated.id = original.id;
    
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
    
        // update database
        this.http.put('http://localhost:3000/projects/' + original.id,
        updated, { headers: headers })
        .subscribe(
            (response: Response) => {
            this.projects[pos] = updated;
            this.projectListChangedEvent.next(this.projects.slice());
            }
        );
    }

    /****************************************
     * DELETE PROJECT
     * Delete one project
     ***************************************/
    deleteProject(project: Project) {
        // verify the incoming data
        if (!project) {
            return;
        }

        // find the position in the list 
        const pos = this.projects.findIndex(p => p.id === project.id);

        // verify it exists in the list
        if (pos < 0) {
            return;
        }

        // now delete from db
        this.http.delete('http://localhost:3000/projects/' + project.id)
          .subscribe(
            (response: Response) => {
              this.projects.splice(pos, 1);
              this.projectListChangedEvent.next(this.projects.slice());
            }
        );
    }

    /****************************************
     * GET MAX ID
     * Get the max id of the projects
     ****************************************/
    getMaxId(): number {
        var maxId: number = 0;
        for (let project of this.projects) {
            var currentId: number = +project.id;
            if (currentId > maxId) {
                maxId = currentId;
            }
        }
        return maxId;
    }
}