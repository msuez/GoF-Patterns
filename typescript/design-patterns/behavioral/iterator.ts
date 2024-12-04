
// Iterator - Behavioral Design Pattern
// One To One Relationship Between Objects

class ArrayIterator<T> {

    private position: number = 0;

    constructor(
        private collection: T[],
    ) {}

    public next(): T {
        const result: T = this.collection[ this.position ];
        this.position += 1;
        return result;
    }

    public hasNext(): boolean {
        return this.position < this.collection.length;
    }

}

const array: number[] = [ 1, 2, 3, 4, 5, 6, ];
const iterator = new ArrayIterator<number>( array );

console.log( iterator.hasNext() );
console.log( iterator.next() );
console.log( iterator.next() );
console.log( iterator.hasNext() );
console.log( iterator.next() );

const stringArray: string[] = ['Hi', 'World', '!'];
const stringIterator = new ArrayIterator<string>( stringArray );
console.log( stringIterator.hasNext() );
console.log( stringIterator.next() );
console.log( stringIterator.next() );
console.log( stringIterator.hasNext() );
console.log( stringIterator.next() );


// Real World
interface MyIteratorResult<T> {
    done: boolean;
    value: T | null;
}

interface MyIterator<T> {
    hasNext(): boolean;
    next(): MyIteratorResult<T>;
}

interface Collection<T> {
    createIterator(): MyIterator<T>;
}

class User {
    constructor(
        public name: string,
    ) {}
}

class UserCollection implements Collection<User> {

    constructor(
        private users: User[],
    ) {}

    public createIterator(): MyIterator<User> {
        return new UserIterator( this );
    }

    public getItems(): User[] {
        return this.users;
    }
}

class UserIterator implements MyIterator<User> {
    private position: number = 0;
    private collection: UserCollection;

    constructor(
        collection: UserCollection,
    ) {
        this.collection = collection;
    }

    public hasNext(): boolean {
        return this.position < this.collection.getItems().length;
    }

    public next(): MyIteratorResult<User> {
        if ( this.hasNext() ) {
            return {
                done: false,
                value: this.collection.getItems()[this.position++],
            };
        } else {
            return {
                done: true,
                value: null,
            }
        }
    }

}


// Client code
const users = [
    new User('Matias'),
    new User('Sergio'),
    new User('Nicolas'),
    new User('Lara'),
];

// Convert Array of Users into a collection
const userCollection = new UserCollection( users );

// Create an iterator
const userIterator = userCollection.createIterator();

console.log( userIterator );
console.log( userIterator.next() );
console.log( userIterator.next() );
console.log( userIterator.hasNext() );
console.log( userIterator.next() );


