import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(value: any, args?: any): any {
    let unsafeImageUrl = URL.createObjectURL(value);
        return this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
  }


}
