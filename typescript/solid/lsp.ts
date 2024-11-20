
// Liskov Substitution Principle (LSP)
abstract class Shape {
    abstract calculateArea(): number;
}

class Rectangle extends Shape {
    constructor(
        public width: number,
        public height: number,
    ) {
        super();
    }

    calculateArea(): number {
        return this.width * this.height;
    }
}

class Square extends Shape {
    constructor(
        public side: number,
    ) {
        super();
    }

    calculateArea(): number {
        return this.side * this.side;
    }
}

// Client Code
function area( shape: Shape ) {
    return shape.calculateArea();
}

let square = new Square( 8 );
let rectangle = new Rectangle( 10, 12 );

console.log(area( square ));
console.log(area( rectangle ));


// Real world application of LSP
// Payment Processor
// Credit Card
// Debit Card
// Paypal

abstract class PaymentProcessor {
    abstract processPayment(amount: number): void;
}

class CreditCardProcessor extends PaymentProcessor {
    processPayment(amount: number): void {
        console.log(`Processing Credit Card Payments - Amount ${amount}`);
    }
}

class DebitCardProcessor extends PaymentProcessor {
    processPayment(amount: number): void {
        console.log(`Processing Debit Card Payments - Amount ${amount}`);
    }
}

class PayPalProcessor extends PaymentProcessor {
    processPayment(amount: number): void {
        console.log(`Processing PayPal Payments - Amount ${amount}`);
    }
}

function executePayment(
    paymentProcessor: PaymentProcessor,
    amount: number,
) {
    paymentProcessor.processPayment( amount );
}

const payPalProcessor = new PayPalProcessor();
const debitCradProcessor = new DebitCardProcessor();
const creditCradProcessor = new CreditCardProcessor();

executePayment(payPalProcessor, 500);
executePayment(debitCradProcessor, 1000);
executePayment(creditCradProcessor, 1000);
