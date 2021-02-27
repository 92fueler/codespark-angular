import { Injectable } from '@angular/core';
import { Problem } from '../models/problem.model';
import { PROBLEMS } from './../mock-data';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  getProblems(): Problem[] {
    return PROBLEMS;
  }

  getProblem(id: number): Problem | undefined {
    return PROBLEMS.find((problem) => problem.id === id);
  }
}
