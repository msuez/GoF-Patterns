
// Factory - Creational Design Pattern

abstract class Car {
    constructor(
        public model: string,
        public productionYear: number,
    ) {}
    abstract displayCarInfo(): void;
}

class Sedan extends Car {
    public displayCarInfo(): void {
        console.log(`This is a Sedan. Model: ${this.model}, Production Year: ${this.productionYear}`);
    }
}

class SUV extends Car {
    public displayCarInfo(): void {
        console.log(`This is a SUV. Model: ${this.model}, Production Year: ${this.productionYear}`);
    }
}

class Hatchback extends Car {
    public displayCarInfo(): void {
        console.log(`This is a Hatchback. Model: ${this.model}, Production Year: ${this.productionYear}`);
    }
}

class CarFactory {
    public createCar(
        type: 'sedan' | 'suv' | 'hatchback',
        model: string,
        productionYear: number,
    ): Car {
        switch (type) {
            case 'sedan':
                return new Sedan( model, productionYear, );
            case 'suv':
                return new SUV( model, productionYear, );
            case 'hatchback':
                return new Hatchback( model, productionYear, );
            default:
                throw new Error(`Invalid car type.`);
        }
    }
}

const carFactory = new CarFactory();

const sedan = carFactory.createCar('sedan', 'Camry', 2023);
const suv = carFactory.createCar('suv', 'RAV4', 2023);
const hatchback = carFactory.createCar('hatchback', 'Corolla', 2023);

sedan.displayCarInfo();
suv.displayCarInfo();
hatchback.displayCarInfo();


abstract class PaymentProcessor {
    constructor(
        protected amount: number,
    ) {}
    abstract processPayment(): void;
}


class PaypalProcessor extends PaymentProcessor {
    public processPayment(): void {
        console.log(`Process Paypal Payment: ${this.amount}`);
    }
}

class StripeProcessor extends PaymentProcessor {
    public processPayment(): void {
        console.log(`Process Stripe Payment: ${this.amount}`);
    }
}

class BankProcessor extends PaymentProcessor {
    public processPayment(): void {
        console.log(`Process Bank Payment: ${this.amount}`);
    }
}


class PaymentProcessorFactory {
    public createProcessor(
        type: 'paypal' | 'stripe' | 'bank',
        amount: number,
    ) {
        switch (type) {
            case 'paypal':
                return new PaypalProcessor(amount);
            case 'stripe':
                return new StripeProcessor(amount);
            case 'bank':
                return new BankProcessor(amount);
            default:
                throw new Error(`Invalid payment type.`);
        }
    }
}

const paymentProcessorFactory = new PaymentProcessorFactory();

const paypalPayment = paymentProcessorFactory.createProcessor('paypal', 200);
const stripePayment = paymentProcessorFactory.createProcessor('stripe', 400);
const bankPayment = paymentProcessorFactory.createProcessor('bank', 200);

paypalPayment.processPayment();
stripePayment.processPayment();
bankPayment.processPayment();

