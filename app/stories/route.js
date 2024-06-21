const express = require('express');
const { handlerAddStory, handlerGetAllStories, } = require("./handler");
const auth = require("../../middleware/authentication");
const upload = require("../../middleware/upload");

const router = express.Router();

router.post("/addStory", auth, upload.single('images'), handlerAddStory);

router.get("/getAllStories", auth, handlerGetAllStories);

module.exports = router;