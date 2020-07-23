import { Directive, ElementRef, Renderer } from '@angular/core';
import { ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';
import { LinkedinLoginProvider, GoogleLoginProvider, FacebookLoginProvider, AuthServiceConfig } from 'angular-6-social-login';

@Directive({
  selector: '[preventCutCopyPaste]'
})
export class CustomDirective {
  constructor(el: ElementRef, renderer: Renderer) {
    var events = 'cut copy paste';
    events.split(' ').forEach(e => 
    renderer.listen(el.nativeElement,e, (event) => {
      event.preventDefault();
      })
    );
  }
}


export function whiteSpaceValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (!!control.value && control.value.trim() === '') {
      return { 'whiteSpace': true };
    }
    return null;
  };
}

export function confirmingPassword(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({mustMatch: true});
      } else {
          matchingControl.setErrors(null);
      }
  };
}
