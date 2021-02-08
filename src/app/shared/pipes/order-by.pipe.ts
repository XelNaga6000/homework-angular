import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(value: Array<object>, key: string = null, isAsc: boolean = false): unknown {
    if (key && key.trim().length) {
      return value.sort((a, b) => {
        const aa = this.getDeepProperty(key, a);
        const bb = this.getDeepProperty(key, b);
        return isAsc ? aa - bb : bb - aa;
      });
    }

    return value;
  }

  private getDeepProperty(key: string, obj: object) {
    const keys = key.split('.');
    return keys.reduce((acc, val) => acc[val], obj);
  }

}
