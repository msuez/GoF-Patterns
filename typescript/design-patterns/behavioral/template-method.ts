
// Template Method - Behavioral Design Pattern

abstract class CakeRecipe {

    public bakeCake(): void {
        this.preHeatOven();
        this.mixIngredients();
        this.bake();
        this.coolingDown();
        this.decorate();
    }

    protected preHeatOven(): void {
        console.log(`Preheating oven to 175 Degree C`);
    }

    protected bake(): void {
        console.log(`Baking cake...`);
    }

    protected coolingDown(): void {
        console.log(`Cooling down the cake...`);
    }

    protected decorate(): void {
        console.log(`Decorating cake...`);
    }

    protected abstract mixIngredients(): void;

}

class ChocolateCake extends CakeRecipe {

    protected mixIngredients(): void {
        console.log(`Mixing: chocolate, sugar, butter, flour, eggs.`);
    }

    protected decorate(): void {
        console.log(`Decorating cake with chocolate`);
    }

}

class VanillaCake extends CakeRecipe {

    protected mixIngredients(): void {
        console.log(`Mixing: vanilla extract, sugar, butter, flour, eggs.`);
    }

}

// Client code
function bakeCake( cake: CakeRecipe ) {
    cake.bakeCake();
}

console.log(`Baking a chocolate cake`);
bakeCake( new ChocolateCake() );

console.log(`Baking a vanilla cake`);
bakeCake( new VanillaCake() );

// Real World Implementation
abstract class DataParser {
    public parseData(): void {
        this.loadData();
        const data = `Sample Data`;
        const parsedData = this.parse( data );
        this.validate( parsedData );
        this.useData( parsedData );

    }
    protected loadData(): void {
        console.log(`Loading Data...`);
    }
    protected validate( data: any ): void {
        console.log(`Validating Data...`);
    }
    protected useData( data: any ): void {
        console.log(`Using Data...`);
    }

    protected abstract parse( data: any ): void;
}

class JSONParser extends DataParser {
    protected parse(data: any): void {
        console.log(`Parsing data as JSON`);
        // JSON.parse( data );
        return data;
    }
}

class XMLParser extends DataParser {
    protected parse(data: any): void {
        console.log(`Parsing data as XML`);
        return data;
    }
}

// Client code

function dataParser( dataParser: DataParser ) {
    dataParser.parseData();
}


console.log(`Parsing JSON data`);
dataParser( new JSONParser() );

console.log(`Parsing XML data`);
dataParser( new XMLParser() );

