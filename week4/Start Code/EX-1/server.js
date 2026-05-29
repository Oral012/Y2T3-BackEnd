import express from 'express';
import userController from './controllers/user.controller.js';



const app = express();
app.use(express.json());



// Logger middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// GET /users - List all users
app.get('/users', userController.getUsers );

// GET /users/:id - Get one user
app.get('/users/:id', userController.getUser);

// POST /users - Create new user
app.post('/users', userController.postUser );

// PUT /users/:id - Update user
app.put('/users/:id', userController.updateUser );

// DELETE /users/:id - Delete user
app.delete('/users/:id', userController.deleteUser );

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
