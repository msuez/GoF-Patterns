
// Interface Segregation Principle (ISP)

interface Printer {
    print(document: Document): void;
}

interface Scanner {
    scan(document: Document): void;
}

interface FaxMachine {
    fax(document: Document): void;
}

class MultiFunctionPrinter implements Printer, Scanner, FaxMachine {
    print(document: Document): void{
        console.log(`The Machine is printing.`);
    }

    scan(document: Document): void {
        console.log(`The Machine is scanning.`);
    }

    fax(document: Document): void {
        console.log(`The Machine is sending a fax.`);
    }
}

class SimplePrinter implements Printer {
    print(document: Document): void{
        console.log(`The Machine is printing.`);
    }
}

// Real world application of ISP
// Creating posts
// Commenting posts
// Sharing posts
// Admin - 3
// Regular - 2

interface Post {
    title: string;
    content: string;
}

interface Comment {
    title: string;
    content: string;
}

interface PostCreator {
    createPost(post: Post): void;
}

interface CommentCreator {
    createComment(comment: Comment): void;
}

interface PostSharer {
    sharePost(post: Post):void;
}

class AdminUser implements PostCreator, CommentCreator, PostSharer {
    createPost(post: Post): void {
        console.log(`Creating post.`);
    }

    createComment(comment: Comment): void {
        console.log(`Commenting post.`);
    }

    sharePost(post: Post): void {
        console.log(`Sharing post.`);
    }
}

class RegularUser implements CommentCreator, PostSharer {
    createComment(comment: Comment): void {
        console.log(`Commenting post.`);
    }

    sharePost(): void {
        console.log(`Sharing post.`);
    }
}


