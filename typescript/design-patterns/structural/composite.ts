
// Composite - Structural Design Pattern

interface Employee {
    getName(): string;
    getRole(): string;
    getSalary(): number;
}

class Developer implements Employee {
    constructor(
        private name: string,
        private salary: number,
    ) {}

    public getName(): string {
        return this.name;
    }

    public getSalary(): number {
        return this.salary;
    }

    public getRole(): string {
        return `Developer`;
    }
}

class Designer implements Employee {
    constructor(
        private name: string,
        private salary: number,
    ) {}

    public getName(): string {
        return this.name;
    }

    public getSalary(): number {
        return this.salary;
    }

    public getRole(): string {
        return `Designer`;
    }
}

interface CompositeEmployee extends Employee {
    getEmployees(): Employee[];
    addEmployee( employee: Employee ): void;
    removeEmployee( employee: Employee ): void;
}

class Manager implements CompositeEmployee {
    private employees: Employee[] = [];

    constructor(
        private name: string,
        private salary: number,
    ) {}

    public getName(): string {
        return this.name;
    }

    public getSalary(): number {
        return this.salary;
    }

    public getRole(): string {
        return `Manager`;
    }

    addEmployee(employee: Employee): void {
        this.employees.push( employee );
    }

    removeEmployee(employee: Employee): void {
        const index = this.employees.indexOf( employee );
        if (index !== -1) {
            this.employees.splice( index, 1 );
        }
    }

    getEmployees(): Employee[] {
        return this.employees;
    }
}

let dev1 = new Developer('John Doe', 12000);
let dev2 = new Developer('Jane Doe', 15000);
let designer = new Designer('Mark', 10000);

let manager = new Manager('Matias', 25000);

manager.addEmployee( dev1 );
manager.addEmployee( dev2 );
manager.addEmployee( designer );

console.log(manager);
console.log(manager.getName());
console.log(manager.getRole());
console.log(manager.getSalary());
console.log(manager.getEmployees());
console.log(manager.getEmployees()[ 1 ]);
console.log(manager.getEmployees()[ 1 ].getName());
console.log(manager.getEmployees()[ 1 ].getSalary());

// Real World Implementation

interface FileSystemComponent {
    getName(): string;
    getSize(): number;
}

class FileComponent implements FileSystemComponent {
    constructor(
        private name: string,
        private size: number,
    ) {}

    public getName(): string {
        return this.name;
    }

    public getSize(): number {
        return this.size;
    }
}

interface CompositeFileSystemComponent extends FileSystemComponent {
    getComponents(): FileSystemComponent[];
    addComponent(component: FileSystemComponent): void;
    removeComponent(component: FileSystemComponent): void;
}

class Folder implements CompositeFileSystemComponent {

    private components: FileSystemComponent[] = [];

    constructor(
        private name: string,
    ) {}

    public getName(): string {
        return this.name;
    }

    public getSize(): number {
        return this.components.reduce(( total, component ) => {
            return total + component.getSize();
        }, 0);
    }

    public addComponent(component: FileSystemComponent): void {
        this.components.push( component );
    }

    public removeComponent(component: FileSystemComponent): void {
        const index = this.components.indexOf( component );
        if ( index !== -1 ) {
            this.components.splice( index, 1);
        }
    }

    public getComponents(): FileSystemComponent[] {
        return this.components;
    }
}


// Client code

const file1 = new FileComponent('file.txt', 500);
const file2 = new FileComponent('file2.txt', 800);
const file3 = new FileComponent('file3.txt', 1200);

const folder = new Folder('My Folder');

folder.addComponent( file1 );
folder.addComponent( file2 );
folder.addComponent( file3 );

console.log(`Folder ${folder.getName()} Contains:`);
folder
    .getComponents()
    .map( (component) => {
        return `- ${component.getName()} with the size of ${component.getSize()} bytes`
    });

console.log(`Total Size ${ folder.getSize() }`)


