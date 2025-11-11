import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat',
  standalone: true
})
export class NumberFormatPipe implements PipeTransform {

  transform(value: number | string | null |undefined, decimalPlaces: number = 0, locale: string = "hu-HU"): string {
    if(value == null || value == undefined || isNaN(Number(value))){
      return '-'
    }
    return new Intl.NumberFormat(locale,{
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
      useGrouping : true

    }).format(Number(value))
  }

}
