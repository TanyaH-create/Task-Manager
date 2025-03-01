//login-routes.tsx
import { Router } from "express";
import { register, login, resetPassword } from  "../../controllers/user-controller.js" // Import the handlers

// Create a new router instance
const router = Router();

// POST auth/login - Login a user
router.post("/login", login); // Define the login route

// POST auth/register - register a user
router.post("/register", register); // Define the login route

// Reset password (No email required)
router.post("/reset-password", resetPassword);


export default router;
