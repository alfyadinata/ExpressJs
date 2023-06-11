const express = require("express")
const app = express()
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

const AuthMiddleware = require('../middleware/AuthMiddleware')

const AuthController = require('../controllers/AuthController')
const UserController = require("../controllers/UserController");
const ImportController = require("../controllers/ImportController");

app.post('/sign-up', AuthController.signUp)
app.post('/sign-in', AuthController.signIn)
app.get('/profile', AuthMiddleware, AuthController.profile)

app.get('/users', AuthMiddleware, UserController.getAllUsers)
app.post('/users', AuthMiddleware, UserController.store)
app.get('/users/:id', AuthMiddleware, UserController.show)
app.patch('/users/:id', AuthMiddleware, UserController.update)
app.delete('/users/:id', AuthMiddleware, UserController.destroy)

app.post('/import/users', AuthMiddleware, upload.single('file'), ImportController.importData);


module.exports = app