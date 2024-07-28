import express from "express"
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js"

import verifyToken from "../middleware/auth.js"

const router = express.Router();

/* READ*/
router.get("/:id",verifyToken,getUser)
// if a user or frontend is sending an "id" then we can grab that and call our database with this "id"
router.get("/:id/friends",verifyToken,getUserFriends)

router.patch("/:id/:friendId",verifyToken,addRemoveFriend) 

export default router