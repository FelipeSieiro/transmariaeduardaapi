
export function Controller(..._args:any[]) {
  return function(target:any){
    return target;
  };
}

export function Injectable(..._args:any[]) {
  return function(target:any){
    return target;
  };
}

export function Get(..._args:any[]) {
  return function(
    _target:any,
    _propertyKey:string,
    descriptor:PropertyDescriptor
  ){
    return descriptor;
  };
}

export function Put(..._args:any[]) {
  return function(
    _target:any,
    _propertyKey:string,
    descriptor:PropertyDescriptor
  ){
    return descriptor;
  };
}

export function Param(..._args:any[]) {
  return function(
    _target:any,
    _propertyKey:string,
    _parameterIndex:number
  ) {};
}

export function Body(..._args:any[]) {
  return function(
    _target:any,
    _propertyKey:string,
    _parameterIndex:number
  ) {};
}


export class NotFoundException extends Error {}

