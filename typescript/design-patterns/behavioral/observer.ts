
// Observer - Behavioral Design Pattern
// One To Many Relationship Between Objects

interface Observer {
    update( subject: Subject ): void;
}

interface Subject {
    getState(): number;
    notifyObservers(): void;
    setState( state: number ): void;
    addObserver( observer: Observer ): void;
    removeObserver( observer: Observer ): void;
}

class ConcreteObserver implements Observer {

    constructor(
        private id: number,
    ) {}

    public update(subject: Subject): void {
        const idMessage = `Observer ${this.id} updated,`;
        const stateMessage = `new state: ${subject.getState()}`;
        console.log(`${idMessage} ${stateMessage}`);
    }
}

class ConcreteSubject implements Subject {

    private state: number = 0;
    private observers: Observer[] = [];

    public getState(): number {
        return this.state;
    }

    public setState(state: number): void {
        this.state = state;
        console.log(`Setting State...`);
        this.notifyObservers();
    }

    public addObserver(observer: Observer): void {
        const isExists = this.observers.includes( observer );
        if (isExists) return console.log(`Observer already exists.`);
        this.observers.push( observer );
        console.log(`Observer added successfully.`);
    }

    public removeObserver(observer: Observer): void {
        const observerIndex = this.observers.indexOf( observer );
        if ( observerIndex === -1 ) {
            return console.log(`Observer does not exist.`);
        }
        this.observers.splice( observerIndex, 1 );
        console.log(`Observer was successfully removed.`);
    }

    public notifyObservers(): void {
        this.observers.forEach((observer) => observer.update(this));
    }
}

// Client code
const subject = new ConcreteSubject();
const observer1 = new ConcreteObserver( 1 );
const observer2 = new ConcreteObserver( 2 );

subject.addObserver( observer1 );
subject.addObserver( observer2 );
subject.setState( 123 );    

// Real World  Implementation

interface WeatherObserver {
    update(
        temperature: number,
        humidity: number,
        pressure: number,
    ): void;
}

interface WeatherSubject {
    notifyObservers(): void;
    removeObserver( observer: WeatherObserver ): void;
    registerObserver( observer: WeatherObserver ): void;
}

class WeatherData implements WeatherSubject {

    private pressure: number | undefined;
    private humidity: number | undefined;
    private temperature: number | undefined;
    private observers: WeatherObserver[] = [];

    public registerObserver(observer: WeatherObserver): void {
        this.observers.push( observer );
    }
    public removeObserver(observer: WeatherObserver): void {
        const index = this.observers.indexOf( observer );
        if ( index >= 0 ) {
            this.observers.splice( index, 1 );
        }
    }
    public notifyObservers(): void {
        if (
            this.temperature !== undefined &&
            this.humidity !== undefined &&
            this.pressure !== undefined
        ) {
            for ( let observer of this.observers ) {
                observer.update(
                    this.temperature,
                    this.humidity,
                    this.pressure,
                );
            }
        }
    }

    public setMeasurement(
        temperature: number,
        humidity: number,
        pressure: number,
    ): void {
        this.humidity = humidity;
        this.pressure = pressure;
        this.temperature = temperature;
        this.notifyObservers();
    }

}

class CurrentConditionsDisplay implements WeatherObserver {

    private pressure: number | undefined;
    private humidity: number | undefined;
    private temperature: number | undefined;

    constructor(
        private weatherData: WeatherSubject,
    ) {
        this.weatherData.registerObserver(this);
    }

    public update(
        temperature: number,
        humidity: number,
        pressure: number,
    ): void {
        this.humidity = humidity;
        this.pressure = pressure;
        this.temperature = temperature;
        this.display();
    }

    public display(): void {
        if (
            this.temperature !== undefined &&
            this.humidity !== undefined &&
            this.pressure !== undefined
        ) {
            const pressureMessage = `Pressure: ${this.pressure}`;
            const humidityeMessage = `Humidity: ${this.humidity},`;
            const temperatureMessage = `Temperature: ${this.temperature},`;
            console.log(`${temperatureMessage} ${humidityeMessage} ${pressureMessage}.`);
        }
    }
}

// Client code
const weatherData = new WeatherData();
const currentDisplay = new CurrentConditionsDisplay( weatherData );

// Simulate new Weather Adjustments
weatherData.setMeasurement( 80, 65, 30.4 );
weatherData.setMeasurement( 82, 70, 30.4 );
weatherData.setMeasurement( 78, 75, 32.3 );



