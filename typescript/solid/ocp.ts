

// Open Closed Principle (OCP)
// Regular - 10
// Premium - 20
// Gold - 30

// class Discount {
//     giveDiscount(customerType: "premium" | "regular"): number {
//         if(customerType === "regular") {
//             return 10;
//         } else if(customerType === 'premium') {
//             return 20;
//         } else {
//             return 10;
//         }
//     }
// }

// Real world application of OCP
interface Customer {
    giveDiscount(): number;
    addLoyaltyPoints(amountSpent): number;
}

class RegularCustomer implements Customer {
    giveDiscount(): number {
        return 10;
    }

    addLoyaltyPoints(amountSpent: any): number {
        return amountSpent;
    }
}

class PremiumCustomer implements Customer {
    giveDiscount(): number {
        return 20;
    }

    addLoyaltyPoints(amountSpent: any): number {
        return amountSpent * 2;
    }
}

class GoldCustomer implements Customer {
    giveDiscount(): number {
        return 30;
    }

    addLoyaltyPoints(amountSpent: any): number {
        return amountSpent * 3;
    }
}

class Discount {
    giveDiscount(customer: Customer): number {
        return customer.giveDiscount();
    }
}

let discount: Discount = new Discount();
let goldCustomer: GoldCustomer = new GoldCustomer();
let premiumCustomer: PremiumCustomer = new PremiumCustomer();

const discountAmount: number = discount.giveDiscount( goldCustomer );

console.log( discountAmount );

