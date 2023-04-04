/*************************************************
 * APP ROUTING MODULE
 * Contains all of the routes for the application
 ************************************************/
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ProjectsComponent } from "./projects/projects.component";
import { ProjectDetailComponent } from "./projects/project-detail/project-detail.component";
import { ProjectEditComponent } from "./projects/project-edit/project-edit.component";
import { TestimonialsComponent } from "./testimonials/testimonials.component";
import { TestimonialEditComponent } from "./testimonials/testimonial-edit/testimonial-edit.component";
import { TestimonialDetailComponent } from "./testimonials/testimonial-detail/testimonial-detail.component";

const appRoutes: Routes = [
    { path: "", redirectTo: "/projects", pathMatch: 'full'},
    { path: "projects", component: ProjectsComponent, children: [
        { path: "new", component: ProjectEditComponent },
        { path: ":id", component: ProjectDetailComponent },
        { path: ":id/edit", component: ProjectEditComponent }
    ] },
    { path: "testimonials", component: TestimonialsComponent, children: [
        { path: "new", component: TestimonialEditComponent },
        { path: ":id", component: TestimonialDetailComponent },
        { path: ":id/edit", component: TestimonialEditComponent }
    ] }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}