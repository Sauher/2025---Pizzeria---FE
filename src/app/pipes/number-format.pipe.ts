<<<<<<< HEAD
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
=======
import { Pipe, PipeTransform } from '@angular/core';
import { isInNotificationPhase } from '@angular/core/primitives/signals';

@Pipe({
  name: 'numberFormat',
  standalone: true
})
export class NumberFormatPipe implements PipeTransform {

  transform(value: number | string | null | undefined, decimalPlaces: number = 2, locale:string = "de-DE"): unknown {
    if(value == null || value == undefined || isNaN(Number(value))){
      return'-';
    }
    return new Intl.NumberFormat(locale, {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
        useGrouping: true
    }).format(Number(value));
  }

}
>>>>>>> eb341e226cb4e2862c0d0d0e3c3f6e87edd8479a
