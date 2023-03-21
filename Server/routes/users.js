import upload from "../config/multer.js";

const express = require("express");
const {
	UserSignup,
	 userLogin,
	 verifyToken,
} = require("../controllers/user");

const {
	createPost,
	getPosts,
	likePost,
	commentPost,
	getUserPost

} = require ("../controllers/post")
const { User } = require("../models/user");
const router = express.Router();



router.post("/",UserSignup);
router.post('/login', userLogin)
router.post("/verifyToken", verifyToken);

//Post add
router.post('/add-post', verifyToken, upload.single('image'), createPost);

//post get n post.
router.get('/getPost', verifyToken, getPosts);
router.get('/user/:id', verifyToken, getUser);
router.get('/user-post/:id', verifyToken, getUserPost);

/* UPDATE */
router.patch("/posts/:id/like", verifyToken, likePost);
router.patch("/posts/:id/comment", verifyToken, commentPost);

module.exports = router;
