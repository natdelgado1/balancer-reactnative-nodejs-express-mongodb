const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const PasswordToken = require("../models/passwordToken.model");
const { generateTempToken } = require("../util/generateToken");

const {
  sendConfirmationEmail,
  sendPasswordToken,
} = require("../config/email.config"); // Importa funciones para enviar correos electrónicos de confirmación y restablecimiento de contraseña

const secretKey = process.env.JWT_SECRET_KEY; // Obtiene la clave secreta para firmar los tokens JWT desde las variables de entorno

// Controlador para crear un nuevo usuario
module.exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body); // Crea un nuevo usuario utilizando los datos proporcionados en la solicitud
    const emailResponse = await sendConfirmationEmail(req.body); // Envía un correo electrónico de confirmación al nuevo usuario
    console.log(emailResponse);
    res.status(200);
    res.json(newUser);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

// Controlador para obtener todos los usuarios
module.exports.findAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Obtiene todos los usuarios de la base de datos
    res.status(200);
    res.json(users);
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

// Controlador para obtener un usuario por su ID
module.exports.findUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }); // Busca un usuario por su ID
    if (user) {
      res.status(200);
      res.json(user);
      return;
    }
    res.status(404);
    res.json({ error: "User not found" });
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

// Controlador para actualizar un usuario
module.exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    ); // Busca y actualiza un usuario por su ID utilizando los datos proporcionados en la solicitud
    res.status(200);
    res.json(updatedUser);
  } catch (error) {
    res.status(500);
    res.json(error);
  }
};

// Controlador para eliminar un usuario
module.exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.deleteOne({ _id: req.params.id }); // Elimina un usuario por su ID
    res.status(200);
    res.json(deletedUser);
  } catch (error) {
    res.status(500);
    res.json({ error: error });
  }
};

/* METODOS DE SESSION */

// Controlador para iniciar sesión
module.exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }); // Busca un usuario por su dirección de correo electrónico
    if (user === null) {
      res.status(404);
      res.json({
        errors: {
          email: {
            message: "user not found",
          },
        },
      });
      return;
    }
    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    ); // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos
    if (validatePassword === false) {
      res.status(400);
      res.json({
        errors: {
          password: {
            message: "Wrong Password",
          },
        },
      });
      return;
    }
    const newJWT = jwt.sign(
      {
        _id: user._id,
        level: user.level,
      },
      secretKey,
      { expiresIn: "10m" }
    ); // Genera un nuevo token JWT con la información del usuario y una clave secreta

    res.cookie("userToken", newJWT, { httpOnly: true }); // Establece una cookie con el token JWT en la respuesta
    res.status(200);
    res.json({ user, accessToken: newJWT });
  } catch (error) {
    res.status(500);
    res.json({
      errors: {
        server: {
          message: error,
        },
      },
    });
  }
};

// Controlador para cerrar sesión
module.exports.logout = async (req, res) => {
  try {
    res.clearCookie("userToken"); // Borra la cookie del token JWT en la respuesta
    res.status(200);
    res.json({ msg: "Logout successful." });
  } catch (error) {
    res.status(500);
    res.json({
      errors: {
        server: {
          message: error,
        },
      },
    });
  }
};

/* RESET PASSWORD */

// Controlador para generar un token de restablecimiento de contraseña
module.exports.passwordResetToken = async (req, res) => {
  const { email } = req.query;
  console.log(email);
  try {
    const user = await User.findOne({ email: email }); // Busca un usuario por su dirección de correo electrónico
    if (!user) {
      res.status(404);
      res.json({ error: "User not found" });
      return;
    }
    const token = await PasswordToken.findOne({ user: user._id }); // Busca si el usuario ya tiene un token de restablecimiento de contraseña
    console.log(token);
    if (token) {
      await PasswordToken.deleteOne({ _id: token._id }); // Si el usuario ya tiene un token, se elimina
    }
    const rawToken = generateTempToken(6); // Genera un nuevo token temporal
    const newToken = await PasswordToken.create({
      token: rawToken,
      user: user._id,
      valid: true,
    }); // Crea un nuevo token de restablecimiento de contraseña en la base de datos
    const emailToken = await sendPasswordToken({ user: user, token: rawToken }); // Envía un correo electrónico con el token de restablecimiento de contraseña
    console.log(emailToken);
    res.status(200);
    res.json(newToken);
  } catch (error) {
    res.status(500);
    res.json({
      errors: {
        server: {
          message: error,
        },
      },
    });
  }
};

// Controlador para restablecer la contraseña
module.exports.passwordReset = async (req, res) => {
  const { email, password, confirmPassword, token } = req.body;
  const data = {
    password,
    confirmPassword,
  };
  console.log(email, password, confirmPassword, token);
  try {
    const user = await User.findOne({ email: email }); // Busca un usuario por su dirección de correo electrónico
    if (!user) {
      res.status(404);
      res.json({ error: "User not found" });
      return;
    }
    const activeToken = await PasswordToken.findOne({ user: user._id }); // Busca si el usuario tiene un token de restablecimiento de contraseña activo
    console.log(token);
    if (!activeToken || !activeToken.valid) {
      res.status(401);
      res.json({ error: "Token Expired" });
      return;
    }
    const validate = await bcrypt.compare(token, activeToken.token); // Valida el token ingresado con el token almacenado en la base de datos
    if (!validate) {
      res.status(401);
      res.json({ error: "Invalid Token" });
      return;
    }

    const userPatch = await User.findOneAndUpdate({ email: email }, data, {
      new: true,
      runValidators: true,
    }); // Actualiza la contraseña del usuario
    const tokenPatch = await PasswordToken.findOneAndUpdate(
      { user: user._id },
      { valid: false },
      { new: true, runValidators: true }
    ); // Invalida el token de restablecimiento de contraseña
    console.log(tokenPatch);
    res.status(200);
    res.json(userPatch);
  } catch (error) {
    res.status(500);
    res.json({
      errors: {
        server: {
          message: error,
        },
      },
    });
  }
};
