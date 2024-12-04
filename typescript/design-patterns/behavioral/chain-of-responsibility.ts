
// Chain Of Responsibility - Behavioral Design Pattern

interface Handler {
    setNext( handler: Handler ): Handler;
    handle( request: string ): string | null;
}

abstract class AbstractHandler implements Handler {
    private nextHandler: Handler | null = null;

    public setNext( handler: Handler ): Handler {
        this.nextHandler = handler;
        // Returning a handler
        // allows convenient chaining
        return handler;
    }
    public handle( request: string ): string | null {
        if ( this.nextHandler ) {
            return this.nextHandler.handle( request );
        }
        return null;
    }
}

class MonkeyHandler extends AbstractHandler {
    public handle(request: string): string | null {
        if ( request === 'Banana' ) {
            return `Monkey: I'll eat the ${request}`;
        }
        return super.handle( request );
    }
}

class SquirrelHandler extends AbstractHandler {
    public handle(request: string): string | null {
        if ( request === 'Nut' ) {
            return `Squirrel: I'll eat the ${request}`;
        }
        return super.handle( request );
    }
}

class DogHandler extends AbstractHandler {
    public handle(request: string): string | null {
        if ( request === 'MeatBall' ) {
            return `Dog: I'll eat the ${request}`;
        }
        return super.handle( request );
    }
}

// Client code
function clientCode( handler: Handler ) {
    const foods = ['Nut', 'Banana', 'Cup Of Coffee', 'MeatBall'];
    for ( const food of foods ) {
        console.log(`Who wants to eat ${ food }`);
        const result = handler.handle( food );
        if ( result ) {
            console.log(result);
        } else {
            console.log(`${ food } was left untouched`);
        }
    }
}

const dog = new DogHandler();
const monkey = new MonkeyHandler();
const squirrel = new SquirrelHandler();

// Chaining Handlers
monkey
    .setNext( dog )
    .setNext( squirrel );

clientCode( monkey );

// Real World Implementation

class Order {
    public isValid() {
        return true;
    }
    public applyDiscount() {
        // Discount
    }
    public processPayment() {
        return true;
    }
    public ship() {
        // Shipping the order
    }
}

interface OrderHandler {
    handle( order: Order ): string | null;
    setNext( handler: OrderHandler ): OrderHandler;
}

abstract class AbstractOrderHandler implements OrderHandler {
    private nextHandler: OrderHandler | null = null;

    public setNext( handler: OrderHandler ): OrderHandler {
        this.nextHandler = handler;
        return handler;
    }
    public handle( order: Order ): string | null {
        if ( this.nextHandler ) {
            return this.nextHandler.handle( order );
        }
        return null;
    }
}

class ValidationHandler extends AbstractOrderHandler {
    public handle(order: Order): string | null {
        if ( order.isValid() ) {
            return super.handle( order );
        }
        return `Validation failed`;
    }
}

class DiscountHandler extends AbstractOrderHandler {
    public handle(order: Order): string | null {
        order.applyDiscount();
        return super.handle( order );
    }
}

class PaymentHandler extends AbstractOrderHandler {
    public handle(order: Order): string | null {
        if ( order.processPayment() ) {
            return super.handle( order );
        }
        return `Payment failed`;
    }
}

class ShippingHandler extends AbstractOrderHandler {
    public handle(order: Order): string | null {
        order.ship();
        return `Order processed and shipped`;
    }
}

// Client code
const order = new Order();
const orderHandler = new ValidationHandler();

orderHandler
    .setNext( new DiscountHandler() )
    .setNext( new PaymentHandler() )
    .setNext( new ShippingHandler() );

console.log( orderHandler.handle( order ) );
