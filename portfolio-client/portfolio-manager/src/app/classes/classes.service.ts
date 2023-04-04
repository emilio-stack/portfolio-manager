import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Year } from './year.model';


@Injectable({
    providedIn: 'root'
})
export class ClassesService {
    private years: Year[] = [];
    yearsListChangedEvent = new Subject<Year[]>();
    maxYearId: number;

    constructor(private http: HttpClient) {
        this.getYears();
        this.getMaxId();
    }

    getYears() {
        console.log("getting classes")
        // build the request
        this.http.get<{message: String, data: Year[]}>('http://localhost:3000/classes')
        .subscribe(
            (res: {message: String, data: Year[]}) => {
                
                // assign the data
                this.years = res.data;
                this.maxYearId = this.getMaxId();

                // sort
                this.years.sort((curr, next) => {
                    if (curr < next) {
                        return -1
                    } else if (curr > next) {
                        return 1;
                    } else {
                        return 0;
                    }
                });

                // notify observers
                this.yearsListChangedEvent.next(this.years.slice());
            }
        );
    }

    getYear(id: String): Year {
        for (let year of this.years) {
            if (year.id == id) {
                return year;
            }
        }
        return null;
    }

    addClass(newYear: Year) {
        if (!newYear) {
            return;
        }
      
        // make sure id of the new project is empty
        newYear.id = '';
      
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
      
        // add to database
        this.http.post<{ message: string, year: Year }>('http://localhost:3000/classes',
        newYear,
        { headers: headers })
        .subscribe(
            (responseData) => {
            // add new project to projects
            this.years.push(responseData.year);
            this.yearsListChangedEvent.next(this.years.slice());
            }
        );
    }

    updateClass(original: Year, updated: Year) {
        if (!original || !updated) {
            return;
        }
    
        const pos = this.years.findIndex(y => y.id === original.id);
    
        if (pos < 0) {
        return;
        }
    
        // set the id of the new project to the id of the old project
        updated.id = original.id;
    
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
    
        // update database
        this.http.put('http://localhost:3000/classes/' + original.id,
        updated, { headers: headers })
        .subscribe(
            (response: Response) => {
            this.years[pos] = updated;
            this.yearsListChangedEvent.next(this.years.slice());
            }
        );
    }

    deleteYear(year: Year) {
        // verify the incoming data
        if (!year) {
            return;
        }

        // find the position in the list 
        const pos = this.years.findIndex(y => y.id === year.id);

        // verify it exists in the list
        if (pos < 0) {
            return;
        }

        // now delete from db
        this.http.delete('http://localhost:3000/classes/' + year.id)
          .subscribe(
            (response: Response) => {
              this.years.splice(pos, 1);
              this.yearsListChangedEvent.next(this.years.slice());
            }
        );
    }

    getMaxId(): number {
        var maxId: number = 0;
        for (let year of this.years) {
            var currentId: number = +year.id;
            if (currentId > maxId) {
                maxId = currentId;
            }
        }
        return maxId;
    }
}