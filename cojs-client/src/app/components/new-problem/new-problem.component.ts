import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Problem } from '../../models/problem.model';

const DEFAULT_PROBLEM: Problem = Object.freeze({
  id: 0,
  title: '',
  desc: '',
  difficulty: '',
});

@Component({
  selector: 'app-new-problem',
  templateUrl: './new-problem.component.html',
  styleUrls: ['./new-problem.component.css'],
})
export class NewProblemComponent implements OnInit {
  @Output() addProblem: EventEmitter<any> = new EventEmitter();

  public difficulties: string[] = ['Easy', 'Medium', 'Hard', 'Super'];

  newProblem: Problem = Object.assign({}, DEFAULT_PROBLEM);

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    this.newProblem = {
      id: 0,
      title: this.newProblem.title,
      desc: this.newProblem.desc,
      difficulty: this.newProblem.difficulty,
    };
    this.addProblem.emit(this.newProblem);
    this.newProblem = Object.assign({}, DEFAULT_PROBLEM);
  }
}
