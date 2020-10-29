import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterForATime',
  pure: false
})
export class FilterForATimePipe implements PipeTransform {

  transform(list: any, time: number): any {

    if (time===null){
      return list
    }

    return list.filter(question=>{
        let questionDate = new Date(parseInt(question.date))
        let currentDate = new Date()
        return questionDate.getTime() >= (currentDate.getTime() - (time * 24 * 60 * 60 * 1000));
      }
    )
  }

}
