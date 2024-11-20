
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


abstract class AccountingAccount {
    abstract get balance(): number;
    abstract debit(amount: number): void;
    abstract credit(amount: number): void;
}

class DebtorAccount extends AccountingAccount {
    protected _balance: number = 0;

    get balance(): number {
        return this._balance;
    }

    debit(amount: number): void {
        if (amount < 1) throw new Error(`Invalid amount.`);
        this._balance += amount;
    }

    credit(amount: number): void {
        if (amount > this._balance) throw new Error(`Invalid amount.`);;
        this._balance -= amount;
    }
}

class CreditorAccount extends AccountingAccount {
    protected _balance: number = 0;

    get balance(): number {
        return this._balance;
    }

    debit(amount: number): void {
        if (amount > this._balance) throw new Error(`Invalid amount.`);;
        this._balance -= amount;
    }

    credit(amount: number): void {
        if (amount < 1) throw new Error(`Invalid amount.`);;
        this._balance += amount;
    }
}

class Cash extends DebtorAccount {

    constructor() {
        super();
    }

    debit(amount: number): void {
        super.debit( amount );
        // Example of additional functionality (console.log)
        console.log(`Cash account debited ${amount}`);
    }

    credit(amount: number): void {
        super.credit( amount );
        // Example of additional functionality (console.log)
        console.log(`Cash account credited ${amount}`);
    }
}

const cash = new Cash();

console.log(`Balance: $ ${cash.balance}`);
cash.debit( 1000 );
console.log(`Balance: $ ${cash.balance}`);
cash.credit( 200 );
console.log(`Balance: $ ${cash.balance}`);
cash.credit( 900 );
console.log(`Balance: $ ${cash.balance}`);

