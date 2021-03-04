import { Pipe, PipeTransform } from '@angular/core';
import { Problem } from '../models/problem.model';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  /**
   *
   * @param {Problem[]} problems
   * @param {string}searchTerm
   * @returns {Problem[]}
   */
  transform(problems: Problem[], searchTerm: string): Problem[] {
    console.log('this is ', problems);
    if (!problems) {
      return [];
    }
    if (!searchTerm) {
      return [];
    }

    searchTerm = searchTerm.toLowerCase();
    // console.log(searchTerm);
    return problems.filter((problem) =>
      problem.title.toLowerCase().includes(searchTerm)
    );
  }
}
