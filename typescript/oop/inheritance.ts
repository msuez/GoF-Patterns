
// Inheritance

class Animal {

    constructor(public name:string) {}

    move(distance:number): void {
        console.log(`${this.name} moved ${distance} meters.`);
    }

}

class Dog extends Animal {
    constructor(public name:string = 'dog') {
        super(name);
    }
}

let myDog = new Dog("Max");

myDog.move(100);


class Product {
    constructor(
        public id: string,
        public price: number,
        public description: string,
    ) {}

    display(): void {
        console.log(`ID: ${this.id}, Price: ${this.price}, Description: ${this.description}.`);
    }
}

class Book extends Product {
    constructor(
        public id: string,
        public price: number,
        public description: string,
        public title: string,
        public author: string,
    ) {
        super(id, price, description);
    }

    display(): void {
        super.display();
        console.log(`Author: ${this.author}, Title: ${this.title}.`);
    }
}

class Electronic extends Product {
    constructor(
        public id: string,
        public price: number,
        public description: string,
        public brand: string,
        public model: string,
    ) {
        super(id, price, description);
    }

    display(): void {
        super.display();
        console.log(`Brand: ${this.brand}, Model: ${this.model}.`);
    }
}

let book = new Book('1', 19.99, 'A good book', 'John Doe', 'John Does book');
book.display();

let laptop = new Electronic('2', 29.99, 'This is a good laptop', 'Dell', 'XPS 15');
laptop.display();


