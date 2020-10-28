import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filters',
  pure: false
})
export class SortByDatePipe implements PipeTransform {

  transform(list: any, isSorted: boolean): any {
    return isSorted ? list.sort(
      function(a, b) {
        return a.date > b.date ? -1 : 1;
      }) : list.sort(
      function(a, b) {
        return a.date > b.date ? 1 : -1;
      });
  }

}
