
// Prototype - Creational Design Pattern

interface UserDetails {
    name: string;
    age: number;
    email: string;
}

interface Prototype {
    clone(): Prototype;
    getUserDetails(): UserDetails;
}

class ConcretePrototype implements Prototype {

    constructor(private user: UserDetails) {}

    public clone(): Prototype {
        const clone = Object.create(this);
        clone.user = { ...this.user };
        return clone;
    }

    public getUserDetails(): UserDetails {
        return this.user;
    }
}

let user1 = new ConcretePrototype({
    name: 'Matias',
    age: 28,
    email: 'matisuez@gmail.com',
});

let user2 = user1.clone();

if ( user1 === user2 ) {
    console.log(`Both instances are the same.`);
} else {
    console.log(`Cloned objects are separate instances.`);
}


interface ShapeProperties {
    x: number;
    y: number;
    color: string;
}

abstract class  Shape {
    constructor(public properties: ShapeProperties,) {}
    abstract clone(): Shape;
}

class Rectangle extends Shape {
    constructor(
        properties: ShapeProperties,
        public width: number,
        public height: number,
    ) {
        super(properties);
    }

    public clone(): Shape {
        let clonedProperties: ShapeProperties = {
            x: this.properties.x,
            y: this.properties.y,
            color: this.properties.color,
        };
        return new Rectangle(
            clonedProperties,
            this.width,
            this.height,
        );
    }
}

class Circle extends Shape {
    constructor(
        properties: ShapeProperties,
        public radius: number,
    ) {
        super(properties);
    }

    public clone(): Shape {
        let clonedProperties: ShapeProperties = {
            x: this.properties.x,
            y: this.properties.y,
            color: this.properties.color,
        };
        return new Circle(
            clonedProperties,
            this.radius,
        );
    }
}

let redRectangle: Shape = new Rectangle({
    x: 20,
    y: 100,
    color: 'red',
}, 10, 20);

let blueRectangle: Shape = redRectangle.clone();

blueRectangle.properties.color = 'Blue';

console.log( redRectangle );
console.log( blueRectangle );

let original = {
    name: 'John',
    address: {
        city: 'New York',
        street: '123 Main St',
    },
};

let shallowCopy = { ...original, };
shallowCopy.address.city = 'Los Angeles';
console.log(shallowCopy.address.city);
console.log(original.address.city);

let deepCopy = JSON.parse( JSON.stringify( original ) );
shallowCopy.address.city = 'San Fransisco';
console.log(deepCopy.address.city);
console.log(original.address.city);








