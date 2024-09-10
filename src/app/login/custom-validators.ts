import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static emailDomainValidator(domain: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      const email = control.value;
      if (email && email.indexOf('@') !== -1) {
        const [_, domainName] = email.split('@');
        if (domainName !== domain) {
          return { emailDomain: true };  // Si el dominio no coincide, devuelve un error
        }
      }
      return null;  // Si la validación pasa, no devuelve ningún error
    };
  }
}
