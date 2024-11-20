
// Single Responsibility Principle (SRP)
class User {
    constructor(name: string, email: string) { }
}

class UserAuthentication {
    constructor(user: User) { }

    authenticate(password: string) {

    }
}

// Real world application of SRP
class BlogPost {
    title: string;
    content: string;

    constructor(title: string, content: string) {
        this.title = title;
        this.content = content;
    }

    // Methods related to content management
    createPost() {
        // Implementation here
    }

    updatePost() {
        // Implementation here
    }

    deletePost() {
        // Implementation here
    }

    // Method related to post display
    // displayHTML() {
    //     return `<h1>${this.title}</h1><p>${this.content}</p>`;
    // }
}

class BlogPostDisplay {

    constructor(public blogPost: BlogPost) {}

    displayHTML() {
        return `<h1>${this.blogPost.title}</h1><p>${this.blogPost.content}</p>`;
    }
}

class BlogPostJSON {

    constructor(public blogPost: BlogPost) {}

    returnJSON() {
        return {
            title: this.blogPost.title,
            content: this.blogPost.content,
        };
    }
}
