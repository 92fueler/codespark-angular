import { Component, OnInit } from '@angular/core';
import { Problem } from '../../models/problem.model';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';
import { InputService } from './../../services/input.service';

@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css'],
})
export class ProblemListComponent implements OnInit {
  problems: Problem[];
  subscriptionProblems: Subscription;
  searchTerm: string = '';
  subscriptionInput: Subscription;

  constructor(
    private dataService: DataService,
    private inputService: InputService
  ) {}

  ngOnInit() {
    this.getProblems();
    this.getSearchTerm();
  }

  getProblems() {
    return this.dataService
      .getProblems()
      .subscribe((problems) => (this.problems = problems));
  }

  addProblem(problem: Problem) {
    this.dataService.addProblem(problem).subscribe((problem) => {
      this.problems.push(problem);
    });
  }

  getSearchTerm(): void {
    this.subscriptionInput = this.inputService
      .getInput()
      .subscribe((inputTerm) => (this.searchTerm = inputTerm));
  }
}
