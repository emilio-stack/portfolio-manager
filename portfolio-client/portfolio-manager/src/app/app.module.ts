import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProjectsComponent } from './projects/projects.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { ProjectItemComponent } from './projects/project-item/project-item.component';
import { ProjectEditComponent } from './projects/project-edit/project-edit.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { TestimonialListComponent } from './testimonials/testimonial-list/testimonial-list.component';
import { TestimonialItemComponent } from './testimonials/testimonial-item/testimonial-item.component';
import { TestimonialEditComponent } from './testimonials/testimonial-edit/testimonial-edit.component';
import { TestimonialDetailComponent } from './testimonials/testimonial-detail/testimonial-detail.component';
import { ClassesComponent } from './classes/classes.component';
import { YearEditComponent } from './classes/year-edit/year-edit.component';
import { YearListComponent } from './classes/year-list/year-list.component';
import { YearDetailComponent } from './classes/year-detail/year-detail.component';
import { YearItemComponent } from './classes/year-item/year-item.component';
import { ClassItemInputComponent } from './classes/year-edit/class-item-input/class-item-input.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProjectsComponent,
    TestimonialsComponent,
    ProjectListComponent,
    ProjectItemComponent,
    ProjectEditComponent,
    ProjectDetailComponent,
    TestimonialListComponent,
    TestimonialItemComponent,
    TestimonialEditComponent,
    TestimonialDetailComponent,
    ClassesComponent,
    YearEditComponent,
    YearListComponent,
    YearDetailComponent,
    YearItemComponent,
    ClassItemInputComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
