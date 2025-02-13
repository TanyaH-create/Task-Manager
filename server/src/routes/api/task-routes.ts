import { Router } from "express";
import authenticateToken  from "../../middleware/authMiddleware.js"; // Assuming authenticateToken is a middleware that checks JWT
import { createTask } from "../../controllers/task-controller.js"; // Import createTask controller

const router = Router();

// Backend POST route (in `task-routes.js`)
// Protect this route with the authenticateToken middleware to ensure the user is authenticated
router.post('/', authenticateToken, createTask);

//Test route
// router.post("/tasks", authenticateToken, async (_req: Request, res: Response) => {
//     console.log("POST /task route hit");
//     res.send("POST route working");
//   });



export default router;