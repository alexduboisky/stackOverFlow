import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByCategory'
})
export class FilterByCategoryPipe implements PipeTransform {

  transform(list: any, selectedCategory: any ): any {
    let filteredList = []
     list.forEach(question=>{
      selectedCategory.forEach(category=> {
        if (question.category.includes(category)) filteredList.push(question)
      })
    })
    return filteredList
  }

}
