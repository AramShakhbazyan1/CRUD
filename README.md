# Basic Blog Platform

## Introduction

This is a simple blog platform that allows users to create, update, and delete posts, as well as add and delete comments and manage their accounts. The application supports user authentication and authorization using JSON Web Tokens (JWT).

## Features

- **User Authentication:** Users can register, login, and update their profiles.
- **Post Management:** Users can create, update, and delete their posts.
- **Comment System:** Users can add comments to posts (and delete their own comments), and post owners can delete comments.
- **Middleware for Authorization:** Middleware functions ensure that users can only perform actions on their own posts or comments.
- **Token-based Authentication:** JSON Web Tokens are used for user authentication.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/basic-blog-platform.git
    cd basic-blog-platform
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory and define the following variables:

    ```env
    PORT=3003
    DATABASE_URL=mongodb://localhost:27017/your-database-name
    SECRET=your-secret-key
    ```

4. **Start the application:**

    ```bash
    npm start
    npm run dev
    ```

## Usage

- Access the application at [http://localhost:3003](http://localhost:3003).
- Use the provided API routes for authentication, post management, and comments.

## Routes

### Authentication Routes: `/auth`

- `/login`: User login
- `/register`: User registration
- `/me`: Retrieve user details
- `/update`: Update user profile

### Post Routes: `/post`

- `/createPost`: Create a new post
- `/deletePost`: Delete a post
- `/updatePost`: Update a post

### Comment Routes: `/comment`

- `/createComment`: Create a new comment
- `/deleteComment`: Delete a comment

## Middleware

- `checkAuth`: Middleware for user authentication.
- `checkPost`: Middleware to check if the current user is the owner of a post.

## Models

- `User`: Model for user details.
- `Post`: Model for blog posts.
- `Comment`: Model for comments on posts.

## Controllers

- `authController`: Handles user authentication and registration.
- `postController`: Manages blog post-related actions.
- `commentController`: Manages comments on posts.

## Services

- `UserService`: Provides user-related functionalities such as finding users, checking passwords, adding users, and updating user profiles.
- `PostService`: Manages blog post-related functionalities such as finding posts, adding posts, updating posts, and deleting posts.

## Environment Variables

- `PORT`: Port on which the server runs.
- `DATABASE_URL`: MongoDB database connection URL.
- `SECRET`: Secret key for JWT token generation.

## Dependencies

- `express`: Web framework for Node.js.
- `mongoose`: MongoDB object modeling tool.
- `bcrypt`: Library for hashing passwords.
- `jsonwebtoken`: Library for generating and verifying JSON Web Tokens.
- `body-parser`: Middleware to parse request bodies.
- `cookie-parser`: Middleware for handling cookies.
- `dotenv`: Library for loading environment variables from a `.env` file.
- `express-validation`: Validation middleware for Express.
- `@hapi/joi`: Object schema description language and validator.
