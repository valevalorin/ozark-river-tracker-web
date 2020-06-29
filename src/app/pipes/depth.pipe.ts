import { Pipe, PipeTransform } from '@angular/core';
import { Util } from '../classes/util';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'depth'})
export class DepthPipe implements PipeTransform {
  transform(value: number): string {
    if(Util.nnu(value)) {
      let corpus = value.toString();
      let whole = '';
      if(corpus.indexOf('.') > -1) {
        whole = corpus.substring(0, corpus.indexOf('.'));
      } else {
        whole = corpus;
      }

      if(whole.length == 2) {
        return value.toFixed(1).toString();
      } else if (value >= 3) {
        return value.toFixed(0).toString();
      } else {
        return value.toFixed(2).toString();
      }
    } else {
      return '';
    }
  }
}