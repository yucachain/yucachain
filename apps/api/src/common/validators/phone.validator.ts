import { registerDecorator, ValidationOptions } from "class-validator";

export function normalizePhone(value: string) {
  return value.replace(/[\s-]/g, "");
}

export function IsNigerianPhone(options?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: "isNigerianPhone",
      target: object.constructor,
      propertyName,
      options,
      validator: {
        validate(value: unknown) {
          return typeof value === "string" && /^0\d{10}$/.test(normalizePhone(value));
        },
        defaultMessage() {
          return "Enter an 11-digit phone number, for example 08012345678";
        },
      },
    });
  };
}
