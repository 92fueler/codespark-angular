import { Component, OnInit } from '@angular/core';
import { Problem } from '../../models/problem.model';
import { DataService } from './../../services/data.service';

const DEFAULT_PROBLEM: Problem = Object.freeze({
  id: 0,
  title: '',
  desc: '',
  difficulty: 'Easy',
});

@Component({
  selector: 'app-new-problem',
  templateUrl: './new-problem.component.html',
  styleUrls: ['./new-problem.component.css'],
})
export class NewProblemComponent implements OnInit {
  public difficulties: string[] = ['Easy', 'Medium', 'Hard', 'Super'];

  newProblem: Problem = Object.assign({}, DEFAULT_PROBLEM);

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  addProblem(): void {
    this.dataService.addProblem(this.newProblem);
    this.newProblem = Object.assign({}, DEFAULT_PROBLEM);
  }
}
