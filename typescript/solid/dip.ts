
// Dependency Inversion Principle (DIP)

// class MySqlDatabase {
//     save(data:string): void {}
// }

// class HighLevelModule {
//     constructor(private database:MySqlDatabase) {}

//     execute(data:string) {
//         this.database.save( data );
//     }
// }

interface IDatabase {
    save(data:string): void;
}

class MySqlDatabase implements IDatabase {
    save(data:string): void {
        console.log(`${data} is being saved to MySQL`);
    }
}

class MongoDbDatabase implements IDatabase {
    save(data: string): void {
        console.log(`${data} is being saved to MongoDB`);
    }
}

class HighLevelModule {

    constructor(private database:IDatabase) {}

    execute(data:string) {
        this.database.save( data );
    }
}

let mysql: MySqlDatabase = new MySqlDatabase();
let mongo: MongoDbDatabase = new MongoDbDatabase();

let user: HighLevelModule = new HighLevelModule( mysql );
let post: HighLevelModule = new HighLevelModule( mongo );

user.execute(`John`);
post.execute(`New Post`);

