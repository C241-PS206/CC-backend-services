const {
  validateRegisterUserSchema,
  validateLoginUserSchema,
} = require("../../validations/users");

const usersServices = require("../../services/userService");
const bucket = require('../../config/imageConfig');
const path = require('path');

const handlerRegisterUser = async (req, res, next) => {
  try {
    const { 
      email, 
      password, 
      username,
    } = req.body;
    
    validateRegisterUserSchema({
      email, 
      password, 
      username,
    });

    await usersServices.registerUser({
      email, 
      password, 
      username,
    })

    res.status(201).json({
      status: "success",
      message: "Successfully register user"
    });
  } catch (err){
    next(err)
  }
}

const handlerLoginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    validateLoginUserSchema(req.body);

    const user = await usersServices.loginUser(email, password);

    res.status(200).json({
      status: "success",
      data:{
        user: {
          accessToken: user.accessToken,
          refreshToken: user.refreshToken, 
        },
      },
    });
  } catch (err) {
    next(err);
  }
}

const handleUploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: "Failed",
        message: "Tidak ada file yang diunggah",
      });
    }
console.log("test");
    console.log('File uploaded:', req.file);  // Logging untuk debug

    // Check if buffer has data
    if (!req.file.buffer || req.file.buffer.length === 0) {
      console.error('Buffer is empty or undefined');
      return res.status(400).json({
        status: "Failed",
        message: "Buffer is empty or undefined",
      });
    }
    console.log("test");
    console.log('Buffer length:', req.file.buffer.length); 

    // Generate file path
    const filePath = `${Date.now()}${path.extname(req.file.originalname)}`;

    // Create a blob reference
    const blob = bucket.file(filePath);
    console.log("test");
    // Create a Promise to handle the blob stream
    const blobStreamPromise = new Promise((resolve, reject) => {
      const blobStream = blob.createWriteStream({
        resumable: false,  
        contentType: req.file.mimetype
      });

      blobStream.on('error', (err) => {
        console.error('Blob stream error:', err);  // Logging error
        reject(err);
      });

      blobStream.on('finish', () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        resolve(publicUrl);
      });

      console.log('Writing file to blob stream');  // Logging untuk debug
      blobStream.end(req.file.buffer);
    });

    // Wait for the blob stream to finish and get the public URL
    const publicUrl = await blobStreamPromise;

    console.log('Public URL:', publicUrl);  // Logging untuk debug

    // Update user avatar in the database
    await usersServices.updateUserAvatar({
      id: req.user.id,
      urlImage: publicUrl,
    });

    // Respond with success
    res.status(201).json({
      status: "success",
      message: "Successfully uploaded user avatar",
      fileUrl: publicUrl,
    });
  } catch (err) {
    console.error('Error in handleUploadAvatar:', err);
    next(err);
  }
};


const handlerTokenRefresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body
  
    if (!refreshToken) {
        res.status(401).json({
            status: "error", 
            message: "Refresh Token is Empty"
        })
    }
  
    const accessToken = await usersServices.refreshToken(refreshToken);
  
    if (!accessToken) {
      res.status(403).json({
        status: "error",
        message: "Invalid Refresh Token",
      });
    } else {
      res.status(200).json({
        status: "success",
        message: "Successfully Refresh Access Token",
        data: {
          accessToken,
        },
      });
    }
  } catch (err) {
    next(err);
  }
}

const handlerGetProfile = async (req, res, next) => {
  try {

    const user = await usersServices.getDataUser(req.user.id);

    res.status(201).json({
      status: "success",
      message: "Successfully updated User",
      data : user
    });
  } catch (err) {
    next(err);
  }
}


module.exports = {
  handlerRegisterUser,
  handlerLoginUser,
  handlerTokenRefresh,
  handleUploadAvatar,
  handlerGetProfile
}