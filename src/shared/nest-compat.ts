export function Controller(_path?: string) {
  return function (
    _target: Function
  ) {};
}

export function Injectable() {
  return function (
    _target: Function
  ) {};
}

export function Get(_path?: string) {
  return function (
    _target: any,
    _propertyKey: string,
    _descriptor: PropertyDescriptor
  ) {};
}

export function Put(_path?: string) {
  return function (
    _target: any,
    _propertyKey: string,
    _descriptor: PropertyDescriptor
  ) {};
}

export function Param(_name?: string) {
  return function (
    _target: any,
    _propertyKey: string,
    _parameterIndex: number
  ) {};
}

export function Body() {
  return function (
    _target: any,
    _propertyKey: string,
    _parameterIndex: number
  ) {};
}

export class NotFoundException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "NotFoundException";
  }
}
