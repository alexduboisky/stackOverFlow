import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'solvedQuestions'
})
export class SolvedQuestionsPipe implements PipeTransform {

  transform(list: any, solved: boolean): any {

    return list.filter(question=>question.solved.toString() === solved.toString());

  }

}
