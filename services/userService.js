const bcrypt = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken");

const { User, Authentication } = require("../models");

const registerUser = async (user) => {
  const emailExist = await User.findOne({
    where:{
      email: user.email
    }
  });
 
  if(emailExist){
    const error = new Error("Email Already exists");
    error.statusCode = 401;
    throw error;
  }
  
  const usernameExist = await User.findOne({
    where:{
      username: user.username
    }
  });
  
  if(usernameExist){
    const error = new Error("Username Already exists");
    error.statusCode = 401;
    throw error;
  }
  const hashedPassword = await bcrypt.hash(user.password, 10);

  await User.create({
    email: user.email,
    password: hashedPassword,
    username: user.username,
    email: user.email,
  });
}

const loginUser = async (email, password) => {
  console.log('test')
  const currentUser = await User.findOne({
    where: {
      email
    },
    attributes: { exclude: ["createdAt", "updatedAt"] },
  });
  console.log('test')

  if (!currentUser) {
    const error = new Error("Wrong Email or Password");
    error.statusCode = 401;
    throw error;
  }
  console.log('test')

  const checkPassword = bcrypt.compareSync(password, currentUser.password);

  if (!checkPassword){
    const error = new Error("Wrong Email or Password");
    error.statusCode = 401;
    throw error;
  }

  const accessToken = generateAccessToken({
    id: currentUser.id,
    email: currentUser.email,
  });

  const refreshToken = generateRefreshToken({
    id: currentUser.id,
    email: currentUser.email,
  });

  await Authentication.create({
    refreshToken: refreshToken,
    userId: currentUser.id,
  });

  return {accessToken, refreshToken};
}

const refreshToken = async (refreshToken) => {
  const currentUser = await Authentication.findOne({
    where: {
      refreshToken: refreshToken
    },
  });

  if(!currentUser){
    const error = new Error("Refresh Token Does not Match");
    error.statusCode = 401;
    throw error;
  }

  const accessToken = generateAccessToken({
    id: currentUser.userId,
    email: currentUser.email,
  });

  return accessToken;
}

const getUser = async (id) => {
  const currentUser = await User.findByPk(id, {
    attributes: { 
      exclude: ["password", "createdAt", "updatedAt"] 
    },
  });

  if (!currentUser) {
    const error =  new Error("User not found");
    error.statusCode = 401;
    throw error;
  }

  return currentUser;
}

const updateUserAvatar = async (data) => {
  const currentUser = await User.findByPk(data.id);
  
  if (!currentUser) {
    const error = new Error("User Not Found");
    error.statusCode = 401;
    throw error;
  }
  await currentUser.update({
    urlImage: data.urlImage || currentUser.urlImage,
  });
}

const getDataUser = async (id) => {
  const currentUser = await User.findByPk(id);

  if (!currentUser) {
    const error = new Error("User Not Found");
    error.statusCode = 401;
    throw error;
  }
  return currentUser
}

module.exports = {
  registerUser,
  loginUser,
  refreshToken,
  getUser,
  updateUserAvatar,
  getDataUser
}