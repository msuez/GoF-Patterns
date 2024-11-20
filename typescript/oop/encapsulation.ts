
// Encapsulation
// BankAccount
// Depositing
// Withdrawing
// Balance - hidden - encapsulated
// bank.balance = 200;

class BankAccount {

    private _balance: number;

    constructor(
        initBalance:number,
    ) {
        this._balance = initBalance;
    }

    public get balance() {
        return this._balance;
    }

    public deposit( amount:number ): void {
        if( amount < 0 ) {
            console.log(`Invalid deposit amount.`);
            return;
        }
        this._balance += amount;
    }

    public withdraw( amount:number ): void {
        if( amount < 0 ) {
            console.log(`Invalid deposit amount.`);
            return;
        }
        if((this._balance - amount) < 0) {
            console.log(`Insufficient Funds.`);
            return;
        }  
        this._balance -= amount;
    }

}

const myAccount = new BankAccount( 1000 );

myAccount.deposit( 500 );
myAccount.withdraw( 900 );

console.log(`Current balance: `, myAccount.balance );



