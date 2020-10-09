import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterForADay'
})
export class FilterForADayPipe implements PipeTransform {

  transform(list: any): any {
    return list.filter(question=>{
        let questionDate = new Date(parseInt(question.date))
        let currentDate = new Date()
        return questionDate.getDate() === currentDate.getDate();
      }
    )
  }

}
