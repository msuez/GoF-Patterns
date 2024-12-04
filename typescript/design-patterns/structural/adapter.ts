
// Adapter - Structural Design Pattern

class Rectangle {
    constructor(
        private width: number,
        private height: number,
    ) {}

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

    public getArea(): number {
        return this.width * this.height;
    }
}

class Square {
    constructor(
        private side: number,
    ) {}

    public getSide(): number {
        return this.side;
    }

    public getArea(): number {
        return this.side * this.side;
    }
}

class SquareToRectangleAdapter extends Rectangle {
    constructor(
        private square: Square,
    ) {
        super(square.getSide(), square.getSide());
    }

    public getWidth(): number {
        return this.square.getSide();
    }

    public getHeight(): number {
        return this.square.getSide();
    }

    public getArea(): number {
        return this.square.getArea();
    }
}

// Client code

const square: Square = new Square( 5 );
const adapter = new SquareToRectangleAdapter( square );

console.log( adapter );
console.log( adapter.getArea() );
console.log( adapter.getWidth() );
console.log( adapter.getHeight() );

// Real World Implementation

// class MySQLDatabase {
//     public connectToMySQL( uri: string ): void {
//         console.log(`Connecting to MySQL at ${uri}`);
//         // Implementation...
//     }

//     public executeMySQLQuery( query: string): void {
//         console.log(`Executing MySQL Query ${query}`);
//     }
// }

// class PostgresSQLDatabase {
//     public connectToPostgreSQL( uri: string ): void {
//         console.log(`Connecting to PostgreSQL at ${uri}`);
//     }

//     public executePostgreSQLQuery( query: string): void {
//         console.log(`Executing PostgreSQL Query ${query}`);
//     }
// }

// class DatabaseAdapter {
//     constructor(
//         private postgreSQL: PostgresSQLDatabase,
//     ) {}

//     public connectToMySQL(uri: string): void {
//         this.postgreSQL.connectToPostgreSQL( uri );
//     }

//     public executeMySQLQuery(query: string): void {
//         this.postgreSQL.executePostgreSQLQuery( query );
//     }
// }

// let database = new MySQLDatabase();

// database.connectToMySQL(`mysql://localhost:3306/mydb`);
// database.executeMySQLQuery(`SELECT * FROM Users`);

// let database = new DatabaseAdapter( new PostgresSQLDatabase() );

// database.connectToMySQL(`mysql://localhost:3306/mydb`);
// database.executeMySQLQuery(`SELECT * FROM Users`);


// Real World Implementation
interface Database {
    connect(uri: string): void;
    executeQuery(query: string): void;
}

class MySQLDatabase implements Database {
    public connect(uri: string): void {
        console.log(`Connecting to MySQL at ${uri}`);
        // Implementation...
    }

    public executeQuery(query: string): void {
        console.log(`Executing MySQL Query: ${query}`);
    }
}

class PostgresSQLDatabase {
    public connectToPostgreSQL(uri: string): void {
        console.log(`Connecting to PostgreSQL at ${uri}`);
    }

    public executePostgreSQLQuery(query: string): void {
        console.log(`Executing PostgreSQL Query: ${query}`);
    }
}

class DatabaseAdapter implements Database {
    constructor(
        private postgreSQL: PostgresSQLDatabase,
    ) {}

    public connect(uri: string): void {
        this.postgreSQL.connectToPostgreSQL(uri);
    }

    public executeQuery(query: string): void {
        this.postgreSQL.executePostgreSQLQuery(query);
    }
}

// Client code
let database: Database;

database = new MySQLDatabase();
database.connect(`mysql://localhost:3306/mydb`);
database.executeQuery(`SELECT * FROM Users`);

database = new DatabaseAdapter(new PostgresSQLDatabase());
database.connect(`postgresql://localhost:5432/mydb`);
database.executeQuery(`SELECT * FROM Users`);




