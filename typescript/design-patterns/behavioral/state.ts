
// State - Behavioral Design Pattern

interface LightState {
    switchState( lightSwitch: LightSwitch ): void;
}

class LightSwitch {
    constructor(
        private state: LightState,
    ) {}
    public setState( state: LightState ): void {
        this.state = state;
    }
    public press(): void {
        this.state.switchState( this );
    }
}

class OnState implements LightState {
    public switchState(lightSwitch: LightSwitch): void {
        console.log(`Light state in On. Turning Off...`);
        lightSwitch.setState( new OffState() );
    }
}

class OffState {
    public switchState(lightSwitch: LightSwitch): void {
        console.log(`Light state in Off. Turning On...`);
        lightSwitch.setState( new OnState() );
    }
}

// Client code
let lightSwitch = new LightSwitch( new OffState() );

lightSwitch.press();
lightSwitch.press();

// Real World Implementation

interface Tool {
    onMouseUp(): void;
    onMouseDown(): void;
}

class SelectionTool implements Tool {
    public onMouseUp(): void {
        console.log(`Selection drawn`);
    }
    public onMouseDown(): void {
        console.log(`Selection started`);
    }
}

class BrushTool implements Tool {
    public onMouseUp(): void {
        console.log(`Brush stroke drawn`);
    }
    public onMouseDown(): void {
        console.log(`Brush stroke started`);
    }
}

class EraserTool implements Tool {
    public onMouseUp(): void {
        console.log(`Erased`);
    }
    public onMouseDown(): void {
        console.log(`Eraser started`);
    }
}

class Canvas {
    constructor(
        private tool: Tool,
    ) {}
    public setTool( tool: Tool ): void {
        this.tool = tool;
    }
    public onMouseUp(): void {
        this.tool.onMouseUp();
    }
    public onMouseDown(): void {
        this.tool.onMouseDown();
    }
}

// Client code
let canvas = new Canvas( new SelectionTool() );
canvas.onMouseDown();
canvas.onMouseUp();

canvas.setTool( new BrushTool() );
canvas.onMouseDown();
canvas.onMouseUp();

canvas.setTool( new EraserTool() );
canvas.onMouseDown();
canvas.onMouseUp();