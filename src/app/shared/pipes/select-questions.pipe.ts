import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectQuestions',
  pure: false
})
export class SelectQuestionsPipe implements PipeTransform {

  transform(list: any, type: string): any {

    if (type==='all') return list


    return list.filter(question=> {
      if (type === 'solved'){
        return question.solved === true
      }
      if (type === 'unanswered'){
        return question.solved === false
      }
      if (type === 'toApprove'){
        return question.approved === false
      }
      else {
        return  question.author === type
      }
    });

  }

}
