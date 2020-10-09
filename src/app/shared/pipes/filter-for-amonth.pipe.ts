import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterForAMonth'
})
export class FilterForAMonthPipe implements PipeTransform {

  transform(list: any): any {
    return list.filter(question=>{
        let questionDate = new Date(parseInt(question.date))
        let currentDate = new Date()
        return questionDate.getTime() >= (currentDate.getTime() - (30 * 24 * 60 * 60 * 1000));
      }
    )
  }
}
