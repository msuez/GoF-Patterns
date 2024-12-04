
// Command - Behavioral Design Pattern

interface ICommand {
    undo(): void;
    execute(): void;
}

class Light {
    public turnOn(): void {
        console.log(`The Light is on.`);
    }
    public turnOff(): void {
        console.log(`The Light is off.`);
    }
}

class TurnOnCommand implements ICommand {
    constructor(
        private light: Light,
    ) {}
    public execute(): void {
        this.light.turnOn();
    }
    public undo(): void {
        this.light.turnOff();
    }
}

class TurnOffCommand implements ICommand {
    constructor(
        private light: Light,
    ) {}
    public execute(): void {
        this.light.turnOff();
    }
    public undo(): void {
        this.light.turnOn();
    }
}

class SimpleRemoteControl {

    private undoCommand!: ICommand;
    private currentCommand!: ICommand;
    private commandQueue: ICommand[] = [];

    public setCommand( command: ICommand ): void {
        this.undoCommand = this.currentCommand;
        this.currentCommand = command;
        this.commandQueue.push( command );
    }

    public buttonWasPressed(): void {
        if ( this.commandQueue.length ) {
            const command = this.commandQueue.shift();
            command?.execute();
        }
    }

    public undoButtonWasPressed(): void {
        this.undoCommand.execute();
    }

    public hasCommands(): boolean {
        return this.commandQueue.length > 0;
    }

}

// Client code
const remoteControl: SimpleRemoteControl = new SimpleRemoteControl();

const light: Light = new Light();

// Turning On The Light
remoteControl.setCommand( new TurnOnCommand( light ) );
remoteControl.buttonWasPressed();

// Turning Off The Light
remoteControl.setCommand( new TurnOffCommand( light ) );
remoteControl.buttonWasPressed();

// Undo Last Operation
remoteControl.undoButtonWasPressed();

// Create a command queue
remoteControl.setCommand( new TurnOnCommand( light ) );
remoteControl.setCommand( new TurnOffCommand( light ) );

while ( remoteControl.hasCommands() ) {
    remoteControl.buttonWasPressed();
}


// Real World Implementation

class MyFileSystem {

    private commandQueue: ICommand[] = [];

    public addCommand( command: ICommand ): void {
        this.commandQueue.push( command );
    }

    public executeCommand(): void {
        if ( this.commandQueue.length ) {
            let command = this.commandQueue.shift();
            command?.execute();
        }
    }

    public undoCommand(): void {
        if ( this.commandQueue.length > 0 ) {
            let command = this.commandQueue.pop();
            command?.undo();
        }
    }

    public hasCommands(): boolean {
        return this.commandQueue.length > 0;
    }

}

class CreateFileCommand implements ICommand {
    constructor(
        private path: string,
    ) {}
    public execute(): void {
        console.log(`Creating file at ${ this.path }`);
    }
    public undo(): void {
        console.log(`Deleting file at ${ this.path }`);
    }
}

class DeleteFileCommand implements ICommand {
    constructor(
        private path: string,
    ) {}
    public execute(): void {
        console.log(`Deleting file at ${ this.path }`);
    }
    public undo(): void {
        console.log(`Restoring file at ${ this.path }`);
    }
}
class ReadFileCommand implements ICommand {
    constructor(
        private path: string,
    ) {}
    public execute(): void {
        console.log(`Reading file at ${ this.path }`);
    }
    public undo(): void {
        console.log(`Undo operation not available.`);
    }
}

class UpdateFileCommand implements ICommand {
    constructor(
        private path: string,
        private newContent: string,
        private oldContent: string,
    ) {}
    public execute(): void {
        console.log(`Updating file at ${ this.path }, new content: ${this.newContent}`);
    }
    public undo(): void {
        console.log(`Reverting file at ${ this.path }, old content: ${this.oldContent}`);
    }
}

// Client code
let myFileSystem = new MyFileSystem();

myFileSystem.addCommand( new CreateFileCommand('/path/file.txt') );

let updateFile = new UpdateFileCommand(
    '/path/file.txt',
    'new content',
    'old content',
);
myFileSystem.addCommand( updateFile );

// Read File
myFileSystem.addCommand( new ReadFileCommand('/path/file.txt') );

// Deleting a command
myFileSystem.addCommand( new DeleteFileCommand('/path/file.txt') );

// while ( myFileSystem.hasCommands() ) {
//     myFileSystem.executeCommand();
// }

myFileSystem.undoCommand();

