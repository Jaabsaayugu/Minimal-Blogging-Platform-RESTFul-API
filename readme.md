# Minimal Blogging Platform API

- This is a simple blogging platform API which allows creation and retrieving of users as well as allowing users to create, update, delete and even get all posts.
- The project uses Express.js, Prisma ORM and postgresql for operation.

## API Endpoints

### GET /users

- Get all users

### GET /users/:id

- Get a user by using ID

### POST /users

- creates a new user

### GET /posts

- get all posts

### GET /posts/:id

Gets a post by ID

### POST /posts

- creates a new post

### PUT /posts/:id

- Updates a post

### DELETE /POSTS/:id

- deletes a post

## ROUTE PATH

- /users
- /users/:id
- /posts/:id
- /posts

### Example

#### Request

- app.post("/users", async (req, res) => {
  try {
  const { firstName, lastName, emailAddress, username } = req.body;
  const newUser = await client.users.create({
  data: { firstName, lastName, emailAddress, username }
  });
  res.status(201).json(newUser);
  } catch (e) {
  res.status(500).json({ message: "Something went wrong! Try again Later!" });
  }
  });

#### Response

{
"id": "87b93d2c-8b8d-44a4-8fce-11836b142be1",
"firstName": "Donald",
"lastName": "Roob",
"emailAddress": "Alex.Weimann@yahoo.com",
"username": "Carol_Hoppe44"
}
