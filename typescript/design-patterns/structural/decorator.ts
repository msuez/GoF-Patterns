import { handler } from '../../../../Vercel/ecr-lambda-api/src/app';

// Decorator - Structural Design Pattern
// (Also could be behavioral)

interface Coffee {
    cost(): number;
    description(): string;
}


class SimpleCoffee implements Coffee {
    public cost(): number {
        return 10;
    }
    public description(): string {
        return `Simple Coffee`;
    }
}

abstract class CoffeeDecorator implements Coffee {
    
    constructor(
        protected coffee: Coffee,
    ) {}

    abstract cost(): number;
    abstract description(): string;
}

class MilkDecorator extends CoffeeDecorator {
    constructor(coffee: Coffee) {
        super(coffee);
    }

    public cost(): number {
        return this.coffee.cost() + 2;
    }

    public description(): string {
        return `${this.coffee.description()}, with milk.`;
    }
}

// Client code
let coffee: Coffee = new SimpleCoffee();

coffee = new MilkDecorator( coffee );

console.log(`Cost: ${coffee.cost()}`);
console.log(`Description: ${coffee.description()}`);

// Real World Implementation

interface ServerRequest {
    handle( request: any ): void;
}

class BaseServer implements ServerRequest {
    public handle( request: any ): void {
        console.log(`Handling Request: ${ request }`);
    }
}

abstract class ServerRequestDecorator implements ServerRequest {
    constructor(
        protected serverRequest: ServerRequest,
    ) {}

    abstract handle( request: any ): void;
}

class LoggingMiddleware extends ServerRequestDecorator {
    public handle( request: any ): void {
        console.log(`Logging Request: ${ request }`);
        this.serverRequest.handle( request );
    }
}

class AuthMiddleware extends ServerRequestDecorator {
    public handle(request: any): void {
        if (request.isAuthenticated) {
            console.log(`Request is authenticated.`);
            this.serverRequest.handle( request );
        } else {
            console.log(`Unauthorized Access.`);
        }
    }
}


// Client code

const request = {
    isAuthenticated: true,
    body: 'Hello World!',
}

let server: ServerRequest = new BaseServer();

server = new LoggingMiddleware( server );
server = new AuthMiddleware( server );

server.handle( request );






