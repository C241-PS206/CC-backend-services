const express = require('express');
const { handlerRegisterUser, handlerLoginUser, handlerTokenRefresh, handlerGetProfile, handleUploadAvatar } = require("./handler");
const auth = require("../../middleware/authentication");
const upload = require("../../middleware/upload");

const router = express.Router();

router.post("/register", handlerRegisterUser);

router.post("/login", handlerLoginUser);

router.post('/avatar/upload', auth, upload.single('avatar'), handleUploadAvatar);

router.post("/refreshToken", handlerTokenRefresh);

router.get("/profile", auth, handlerGetProfile);

module.exports = router;