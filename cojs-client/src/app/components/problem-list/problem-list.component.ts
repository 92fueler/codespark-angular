import { Component, OnInit } from '@angular/core';
import { Problem } from '../../models/problem.model';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-problem-list',
  templateUrl: './problem-list.component.html',
  styleUrls: ['./problem-list.component.css'],
})
export class ProblemListComponent implements OnInit {
  public problems: Problem[];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService
      .getProblems()
      .subscribe((problems) => (this.problems = problems));
  }

  addProblem(problem: Problem) {
    this.dataService.addProblem(problem).subscribe((problem) => {
      this.problems.push(problem);
    });
  }
}
