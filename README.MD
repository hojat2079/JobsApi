#Jobs Api
This is a simple RESTful API using Node.js, Express, and Mongoose.

# Project Setup

1.clone 
2.in the root create .env with these two variables, with your own values.

- MONGO_URI
- JWT_SECRET

3.After that run this command

```bash
npm install && npm start
```


# Stack
* Back
	*  *Node.js*
	*  *Express*
* DB
	*  *MongoDB*
* Auth
	* JWT



# Dependency

- express.js : Node.js framework
- bcryptjs : data encrypting.
- cors : communicate the back-end to another servers.
- dotenv : allows create runtime variables
- jsonwebtoken : API authentication/authorization
- mongoose : module to communicate with DDBB
- helmet : helps protect the application from some known web vulnerabilities by properly setting HTTP headers