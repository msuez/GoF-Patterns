
// Facade - Structural Design Pattern

class Grinder {
    public grindBeans(): void {
        console.log(`Grinding breans...`);
    }
}

class Boiler {
    public boilWater(): void {
        console.log(`Boiling water...`);
    }
}

class Brewer {
    public brewCoffee(): void {
        console.log(`Brewing coffee...`);
    }
}

class CoffeeMakerFacade {
    constructor(
        private grinder: Grinder,
        private boiler: Boiler,
        private brewer: Brewer,
    ) {}
    public makeCoffee() {
        this.grinder.grindBeans();
        this.boiler.boilWater();
        this.brewer.brewCoffee();
        console.log(`The Coffee is ready.`);
    }
}

// Client code
const grinder = new Grinder();
const boiler = new Boiler();
const brewer = new Brewer();

const coffeeMaker = new CoffeeMakerFacade(
    grinder,
    boiler,
    brewer,
);

coffeeMaker.makeCoffee();

// Real World Implementation

class Amplifier {
    public turnOn(): void {
        console.log(`Amplifier is turned on.`);
    }
    public setVolume(level: number): void {
        console.log(`Volume is set to ${level}`);
    }
}

class DvdPlayer {
    public turnOn(): void {
        console.log(`DvdPlayer is turned on.`);
    }
    public play(movie: string): void {
        console.log(`Playing ${movie}.`);
    }
}

class Projector {
    public turnOn(): void {
        console.log(`Projector is turned on.`);
    }
    public setInput(dvdPlayer: DvdPlayer): void {
        console.log(`Input set to DvdPlayer.`);
    }
}

class Lights {
    public dim(level: number): void {
        console.log(`Lights dimmed to ${level}`);
    }
}

class HomeTheaterFacade {

    constructor(
        private amplifier: Amplifier,
        private dvdPlayer: DvdPlayer,
        private projector: Projector,
        private lights: Lights,
    ) {}

    public watchMovie(
        movie: string,
        volume: number,
        level: number,
    ) {
        console.log(`Get Ready To Watch ${movie}.`);
        this.lights.dim(level);
        this.amplifier.turnOn();
        this.amplifier.setVolume(volume);
        this.dvdPlayer.turnOn();
        this.projector.turnOn();
        this.projector.setInput(this.dvdPlayer);
        this.dvdPlayer.play(movie);
    }

}

// Client code
const amplifier = new Amplifier();
const dvdPlayer = new DvdPlayer();
const projector = new Projector();
const lights = new Lights();

const homeTheater = new HomeTheaterFacade(
    amplifier,
    dvdPlayer,
    projector,
    lights,
);

homeTheater.watchMovie(
    'Inception',
    10,
    5,
);




