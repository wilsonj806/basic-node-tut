const person = {
  name: 'Nemo',
  age: 30
}

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greeting() {
    console.log(`My name is: ${this.name} and I'm ${this.age}`);
  }
}


// module.exports is Node's syntax for exporting "modules"
module.exports = Person;