import { Injectable } from '@angular/core';
import { Problem } from '../models/problem.model';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  private problemUrl = 'api/v1/problems';

  getProblems(): Observable<Problem[]> {
    return this.http
      .get<Problem[]>(this.problemUrl)
      .pipe(catchError(this.handleError));
  }

  getProblem(id: number): Observable<Problem> {
    return this.http
      .get<Problem>(`${this.problemUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  addProblem(problem: Problem): Observable<Problem> {
    return this.http
      .post<Problem>(this.problemUrl, problem, httpOptions)
      .pipe(catchError(this.handleError));
  }

  buildAndRun(): void {
    console.log('build and run');
  }

  // error hanlder
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
