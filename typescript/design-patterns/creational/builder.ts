
// Builder - Creational Design Pattern

interface Builder {
    setPartA(): void;
    setPartB(): void;
    setPartC(): void;
}

class Product {

    private parts: string[] = [];

    public add(part: string): void {
        this.parts.push(part);
    }

    public listParts(): void {
        console.log(`Product Parts: ${ this.parts.join(", ") }`);
    }

}

class ConcreteBuilder implements Builder {

    private product!: Product;

    constructor() {
        this.reset();
    }

    public reset(): void {
        this.product = new Product();
    }

    public setPartA(): void {
        this.product.add("PartA");
    }

    public setPartB(): void {
        this.product.add("PartB");
    }

    public setPartC(): void {
        this.product.add("PartC");
    }

    public getProduct(): Product {
        const result = this.product;
        this.reset();
        return result;
    }

}

class Director {

    private builder!: Builder;

    public setBuilder(builder: Builder): void {
        this.builder = builder;
    }

    public buildMinimumProduct(): void {
        this.builder.setPartA();
    }

    public buildFullProduct(): void {
        this.builder.setPartA();
        this.builder.setPartB();
        this.builder.setPartC();
    }

}


const director = new Director();
const builder = new ConcreteBuilder();

director.setBuilder( builder );

let minProduct: Product;
director.buildMinimumProduct();
minProduct = builder.getProduct();
console.log( minProduct );

let fullProduct: Product;
director.buildFullProduct();
fullProduct = builder.getProduct();
console.log( fullProduct );

interface ICustomer {
    email: string;
    lastName: string;
    firstName: string;
    phoneNumber: string;
}

interface ICustomerBuilder {
    setEmail(email: string): ICustomerBuilder;
    setLastName(lastName: string): ICustomerBuilder;
    setFirstName(firstName: string): ICustomerBuilder;
    setPhoneNumber(phoneNumber: string): ICustomerBuilder;
    build(): ICustomer;
}

class Customer implements ICustomer {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public phoneNumber: string,
    ) {}
}

class CustomerBuilder implements ICustomerBuilder {

    private email: string = "";
    private lastName: string = "";
    private firstName: string = "";
    private phoneNumber: string = "";

    public setEmail(email: string): ICustomerBuilder {
        this.email = email;
        return this;
    }

    public setLastName(lastName: string): ICustomerBuilder {
        this.lastName = lastName;
        return this;
    }

    public setFirstName(firstName: string): ICustomerBuilder {
        this.firstName = firstName;
        return this;
    }

    public setPhoneNumber(phoneNumber: string): ICustomerBuilder {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public build(): ICustomer {
        return new Customer(
            this.firstName,
            this.lastName,
            this.email,
            this.phoneNumber,
        );
    }

}

class CustomerDirector {

    constructor(private builder: ICustomerBuilder) {}

    public buildMinimalCustomer(
        email: string,
        lastName: string,
        firstName: string,
    ) {
        return this.builder
            .setEmail(email)
            .setLastName(lastName)
            .setFirstName(firstName)
            .build();
    }

}

const customerBuilder: ICustomerBuilder = new CustomerBuilder();
const customerDirector: CustomerDirector = new CustomerDirector(customerBuilder);
const customer: ICustomer = customerDirector.buildMinimalCustomer(
    "matisuez@gmail.com",
    "Suez",
    "Matias",
);

console.log(customer);
