import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], searchText: any): any[] {
    if (!items || !searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter((item) => {
      return Object.values(item).some(
        (value) =>
          typeof value === 'string' && value.toLowerCase().includes(searchText)

      );
    });
  }

}
