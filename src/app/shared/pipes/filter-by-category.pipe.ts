import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByCategory'
})
export class FilterByCategoryPipe implements PipeTransform {

  transform(list: any, selectedCategory: string[] = [] ): any {

    if (selectedCategory.length === 0){
      return list
    }

    return list.filter(q => {
      let res = q.category.filter(category => selectedCategory.includes(category));
      return res.length > 0 ? q : null;
    })
  }

}
