const name = "jun",
  age = 29,
  gender = "male";

const sayHi = (name:string,age:number,gender:string):string=> {
  return `hello ${name} you are ${age}, you are a ${gender}`;
 
}

console.log(sayHi(name,age,gender));


export {};
