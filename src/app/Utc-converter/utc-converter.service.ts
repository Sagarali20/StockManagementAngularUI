import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UtcConverterService {
    convertedDate: Date | undefined;

  public convertUtcToLocalTime(
    utcDate: string,    
    format: UtcToLocalTimeFormat = UtcToLocalTimeFormat.FULL,
): string {

    var browserLanguage = navigator.language; 
    this.convertedDate = new Date(utcDate);

    console.log(utcDate)
    console.log(this.convertedDate)

    // this.convertedDate.setUTCHours(this.convertedDate.getUTCHours() + 6);



    if (format === UtcToLocalTimeFormat.SHORT) {
        let year = this.convertedDate.getFullYear()% 100;
        let month = this.padWithZero(this.convertedDate.getMonth() + 1); 
        let day = this.padWithZero(this.convertedDate.getDate());
        let dateformat=day+"/"+month+"/"+year;

        let date = new Date(dateformat).toLocaleDateString(browserLanguage);
        let time = new Date(this.convertedDate).toLocaleTimeString(browserLanguage);


    
        // return `${year}/${month}/${day}, ${time}`;

        return `${dateformat} ${time}`;
    } 
    else if (format === UtcToLocalTimeFormat.SHORT_DATE) {
        return new Date(this.convertedDate).toLocaleDateString(browserLanguage);
    } 
    else if (format === UtcToLocalTimeFormat.SHORT_TIME) {
           
        
        return new Date(this.convertedDate).toLocaleTimeString(browserLanguage);
    } 
    else if (format === UtcToLocalTimeFormat.FULL) {
        return new Date(this.convertedDate).toString();
    } 
    else {
        console.error(
            `Do not have logic to format utc date, format:${format}`
        );
        return new Date(this.convertedDate).toString();
    }

}
padWithZero(value: number): string {
    return value.toString().padStart(2, '0');
  }

public convertLocalTimeToUtc(localDate: string):string{
    var date = new Date(localDate);
    return date.toUTCString();
}
}
export enum UtcToLocalTimeFormat {
  FULL        = 'full',        // 'EEEE, MMMM d, y, h:mm:ss a zzzz'   - Monday, June 15, 2015 at 9:03:01 AM GMT+01:00
  SHORT       = 'short',       // 'd/M/yy, h:mm'                      - 15/6/15, 9:03
  SHORT_DATE  = 'shortDate',   // 'd/M/yy'                            - 15/6/15
  SHORT_TIME  = 'shortTime',   // 'h:mm'                              - 9:03
}
