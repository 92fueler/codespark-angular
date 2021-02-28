import { Injectable } from '@angular/core';
import { Problem } from '../models/problem.model';
import PROBLEMS from '../mock-data';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  getProblems(): Problem[] {
    return PROBLEMS;
  }

  // notice: return value could be Problem or undefined
  getProblem(id: number): Problem | undefined {
    return PROBLEMS.find((problem) => problem.id === id);
  }

  addProblem(problem) {
    console.log(problem);
  }
}
