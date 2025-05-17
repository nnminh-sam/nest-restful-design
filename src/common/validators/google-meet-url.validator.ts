import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isGoogleMeetUrl', async: false })
export class IsGoogleMeetUrlConstraint implements ValidatorConstraintInterface {
  validate(url: string) {
    if (!url) return false;

    try {
      const urlObj = new URL(url);
      return (
        urlObj.hostname === 'meet.google.com' &&
        /^[a-z]{3}-[a-z]{4}-[a-z]{3}$/.test(urlObj.pathname.slice(1))
      );
    } catch {
      return false;
    }
  }

  defaultMessage() {
    return 'URL must be a valid Google Meet URL (e.g., https://meet.google.com/abc-defg-hij)';
  }
}

export function IsGoogleMeetUrl(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isGoogleMeetUrl',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsGoogleMeetUrlConstraint,
    });
  };
}
