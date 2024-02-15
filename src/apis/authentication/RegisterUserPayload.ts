export class RegisterUserPayload {
  constructor(payload: Partial<RegisterUserPayload> = {}) {
    Object.assign(this, payload);
  }
  public companyName: string = '';
  public firstName: string = '';
  public lastName: string = '';
  public userName: string = '';
  public email: string = '';
  public picture: string = '';
  public strategyId: string = '';
  public password: string = '';
  public phoneNumber: string = '';
  public streetAddress1: string = '';
  public streetAddress2: string = '';
  public city: string = '';
  public state: string = '';
  public zipCode: string = '';

  validate(): string[] {
    const errors: string[] = [];

    // Required fields validation
    const requiredFields: (keyof RegisterUserPayload)[] = [
      'firstName',
      'lastName',
      'email',
      'strategyId',
      'password',
      'phoneNumber',
      'streetAddress1',
      'city',
      'state',
      'zipCode',
    ];

    requiredFields.forEach((field) => {
      if (this[field] === '') {
        errors.push(`${field} is required.`);
      }
    });

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      errors.push('Email is invalid.');
    }

    // Phone number format validation (basic validation for US phone numbers)
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!phoneRegex.test(this.phoneNumber)) {
      errors.push('Phone number is invalid.');
    }

    console.log('err', errors);

    return errors;
  }
}
