
// Strategy - Behavioral Design Pattern

// Pattern
interface PaymentStrategy {
    pay( amount: number ): void;
}

// Concrete
class PayPalStrategy implements PayPalStrategy {
    public pay( amount: number ): void {
        console.log(`Paid ${amount} using PayPal.`);
    }
}

// Concrete
class CreditCardStrategy implements PayPalStrategy {
    public pay( amount: number ): void {
        console.log(`Paid ${amount} using CreditCard.`);
    }
}

// Concrete
class BitcoinStrategy implements PayPalStrategy {
    public pay( amount: number ): void {
        console.log(`Paid ${amount} using Bitcoin.`);
    }
}

class ShoppingCart {

    private amount: number = 0;

    constructor(
        private strategy: PaymentStrategy,
    ) {}

    public setPaymentStrategy( strategy: PaymentStrategy ) {
        this.strategy = strategy;
    }

    public addToCart( value: number ): void {
        this.amount += value;
    }

    public checkout(): void {
        this.strategy.pay( this.amount );
        this.amount = 0;
    }

}

// Client code
let cart = new ShoppingCart( new PayPalStrategy() );

cart.addToCart( 50 );
cart.addToCart( 1000 );
cart.checkout();

cart.setPaymentStrategy( new CreditCardStrategy() );
cart.addToCart( 70 );
cart.addToCart( 600 );
cart.checkout();

cart.setPaymentStrategy( new BitcoinStrategy() );
cart.addToCart( 80 );
cart.addToCart( 1200 );
cart.checkout();


// Real World Implementation

interface FilterStrategy {
    apply( image: string ): void;
}

class GreyScaleStrategy implements FilterStrategy {
    public apply( image: string ): void {
        console.log(`Applying grey scale filter to ${ image }.`);
    }
}

class SepiaStrategy implements FilterStrategy {
    public apply( image: string ): void {
        console.log(`Applying sepia scale filter to ${ image }.`);
    }
}

class NegativeStrategy implements FilterStrategy {
    public apply( image: string ): void {
        console.log(`Applying negative scale filter to ${ image }.`);
    }
}

class ImageProcessor {

    private image: string;

    constructor(
        private strategy: FilterStrategy,
    ) {}

    public setFilterStrategy( strategy: FilterStrategy ): void {
        this.strategy = strategy;
    }

    public applyFilter( image: string ): void {
        this.strategy.apply( image );
    }

}

// Client code
const imageProcessor = new ImageProcessor( new GreyScaleStrategy() );

imageProcessor.applyFilter( 'DragonBall Z.jpg' );

imageProcessor.setFilterStrategy( new NegativeStrategy() );
imageProcessor.applyFilter( 'Image-01.jpg' );

imageProcessor.setFilterStrategy( new SepiaStrategy() );
imageProcessor.applyFilter( 'Image-02.jpg' );

