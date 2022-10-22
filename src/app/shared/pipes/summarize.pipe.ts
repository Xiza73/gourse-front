import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summarize'
})
export class SummarizePipe implements PipeTransform {

  transform(value: string, size: number = 150): string {
    if (value.length > size) {
      return value.slice(0, size) + '...';
    }
    return value;
  }

}
