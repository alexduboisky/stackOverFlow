import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectQuestions'
})
export class SelectQuestionsPipe implements PipeTransform {

  transform(list: any, type: string, userName?: string): any {

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
      if (type === userName){
        return  question.author === userName
      }
    });

  }

}
