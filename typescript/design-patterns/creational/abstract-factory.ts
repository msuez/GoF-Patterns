
// Abstract Factory - Creational Design Pattern

interface IProductA {
    operationA(): string;
}

interface IProductB {
    operationB(): string;
    combineOperation(collaborator: IProductA): string;
}

interface IFactory {
    createProductA(): IProductA;
    createProductB(): IProductB;
}

class ProductA implements IProductA {
    operationA(): string {
        return `This is the result of Operation A`;
    }
}

class ProductB implements IProductB {
    operationB(): string {
        return `This is the result of Operation B`;
    }
    combineOperation(collaborator: IProductA): string {
        const result = collaborator.operationA();
        return `The result of Product B Collaborating with (${result})`;
    }
}

class Factory implements IFactory {
    public createProductA(): IProductA {
        return new ProductA();
    }

    public createProductB(): IProductB {
        return new ProductB();
    }
}

// Client code
const factory = new Factory();

const productA = factory.createProductA();
console.log(productA.operationA());

const productB = factory.createProductB();
console.log(productB.operationB());
console.log(productB.combineOperation(productA));


interface IButton {
    render(): void;
    onClick(f: Function): void; 
}

interface ICheckbox {
    render(): void;
    toggle(): void;
}

interface GUIFactory {
    createButton(): IButton;
    createCheckbox(button: IButton): ICheckbox;
}

class WindowsButton implements IButton {
    public render(): void {
        console.log(`Render a button in Windows Style.`);
    }
    public onClick(f: Function): void {
        console.log(`Windows button was clicked.`);
    }
}

class WindowsCheckbox implements ICheckbox {
    constructor(private button: IButton) {}

    public render(): void {
        console.log(`Render a checkbox in Windows Style.`);
    }

    public toggle(): void {
        this.button.onClick(() => {
            console.log(`Windows checkbox toggled.`);
        });
    }
}

class MacOSButton implements IButton {
    public render(): void {
        console.log(`Render a button in MacOS Style.`);
    }
    public onClick(f: Function): void {
        console.log(`MacOS button was clicked.`);
    }
}

class MacOSCheckbox implements ICheckbox {
    constructor(private button: IButton) {}

    public render(): void {
        console.log(`Render a checkbox in MacOS Style.`);
    }

    public toggle(): void {
        this.button.onClick(() => {
            console.log(`MacOS checkbox toggled.`);
        });
    }
}

class WindowsFactory implements GUIFactory {
    public createButton(): IButton {
        return new WindowsButton();
    }
    public createCheckbox(button: IButton): ICheckbox {
        return new WindowsCheckbox( button );
    }
}

class MacOSFactory implements GUIFactory {
    public createButton(): IButton {
        return new MacOSButton();
    }
    public createCheckbox(button: IButton): ICheckbox {
        return new MacOSCheckbox( button );
    }
}


function renderUI(factory: GUIFactory) {
    const button = factory.createButton();
    const checkbox = factory.createCheckbox( button );

    button.render();
    checkbox.render();

    button.onClick(() => {
        console.log(`Button clicked.`);
    })

    checkbox.toggle();
}


renderUI(new WindowsFactory());