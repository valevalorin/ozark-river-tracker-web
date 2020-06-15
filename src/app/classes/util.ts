export class Util {

  /**
  * Stands for "Neither Null or Undefined". Less verbose way of checking for valid data.
  * @return {boolean} Whether or not the provided value was NOT null or undefined
  */
 public static nnu(value: any): boolean {
   return value !== null && value !== undefined;
 }

 public static inu(value: any): boolean {
  return !this.nnu(value);
}

 /**
  * Stands for "Neither Null, Undefined, or Empty".
  * Determines whether or not the value is neither null or undefined and then does further checks based on type to determine emptyness - i.e. a string with length 0 after being trimmed.
  * An array is considered empty if it's length 0
  * An object is considered empty if it has no defined keys
  * A string is considered empty if it has length 0 after being trimmed
  * @return {boolean} True is the provided value is neither null, undefined or empty
  */
 public static nnue(value: any): boolean {
   if(Util.nnu(value)) {
     if(value instanceof Array) {
       return value.length > 0;
     } else if (typeof(value) === 'string') {
       return value.trim().length > 0;
     } else if (value instanceof Object) {
       let valueCount = 0;
       for (const key in value) {
         if (value.hasOwnProperty(key)) {
           const element = value[key];
           valueCount = valueCount + 1;
         }
       }
       return valueCount > 0;
     }
   } else {
     return false;
   }

   return false;
 }

 public static search(list: any[], target: any, options?: any): number {
   if(!Util.nnu(options)) {
     options = {};
   }

   let found = false;
   let targetIndex = -1;
   for (let index = list.length - 1; index >= 0; index--) {
     const element = list[index];
     let testValue = null;
     if(Util.nnu(options.field)) {
       testValue = element[options.field];
     } else {
       testValue = element;
     }

     if (options.caseInsensitive) {
       if(Util.nnu(testValue) && typeof(testValue) === 'string' && Util.nnu(target) && typeof(target) === 'string') {
         if(testValue.toLowerCase() === target.toLowerCase()) {
           found = true;
           targetIndex = index;
           index = -1;  
         }
       } else if(testValue === target) {
         found = true;
         targetIndex = index;
         index = -1;  
       }
     } else if (testValue === target) {
       found = true;
       targetIndex = index;
       index = -1;
     }
   }

   return targetIndex;
 }

 public static formatLarge(value: number) {
   //Rounds the value to biggest grouping unit.  If value is > 100 of unit, don't show decimal places.
   if (value > 100000000000){
     return Math.floor(value/100000000000) + "B";
   } else if (value > 1000000000){
     return (value/1000000000).toFixed(2) + "B";
   } else if(value > 100000000) {
     return Math.floor(value/1000000) + "M";
   } else if(value > 1000000) {
     return (value/1000000).toFixed(2) + "M";
   } else if(value > 100000) {
     return Math.floor(value/1000) + "K"
   } else if(value > 1000) {
     return (value/1000).toFixed(2) + "K";
   } else {
     return value;
   }
 }

 public static searchAndDestroy(list: any[], target: any, options?: any): any[] {
   const targetIndex = Util.search(list, target, options);
   if(targetIndex > -1) {
     return list.slice(0, targetIndex).concat(list.slice(targetIndex + 1));
   } else {
     return list;
   }
 }

 public static sortBy(list: any[], propertyName: string, reverse = false) {
   if(reverse) {
     return list.sort((a: any, b: any) => b[propertyName].localeCompare(a[propertyName]));
   } else {
     return list.sort((a: any, b: any) => a[propertyName].localeCompare(b[propertyName]));
   }
 }
}