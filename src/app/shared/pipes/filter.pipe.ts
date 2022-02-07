import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter",
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], searchTerm?: string): any {
  if(!searchTerm) {
      return value;
    }
    return value.filter((data) => this.matchValue(data,searchTerm)); 
  }
  matchValue(data, value) {
    return Object.keys(data).map((key) => {
        return new RegExp(value, 'gi').test(data[key]);
    }).some(result => result);
  }
}
