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
        if (typeof aa === 'number' && typeof bb === 'number') {
          return isAsc ? aa - bb : bb - aa;
        } else {
          if (aa > bb) {
            return isAsc ? 1 : -1;
          } else if (aa < bb) {
            return isAsc ? -1 : 1;
          } else {
            return 0;
          }
        }
      });
    }

    return value;
  }

  private getDeepProperty(key: string, obj: object): any {
    const keys = key.split('.');
    return keys.reduce((acc, val) => acc[val], obj);
  }

}
