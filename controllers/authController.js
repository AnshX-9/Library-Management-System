//  signup 
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');

dotenv.config();

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({
      msg: "Please Enter all the required fields"
    })
  }
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({
        msg: "User alrdy exist"
      })
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
      createdAt: new Date()
    });
    res.status(200).json({
      msg: "Signup successfully",
      newUser
    })

  } catch (e) {
    console.log(e)
    res.status(400).json({
      msg: "Failed to signup try again"
    })
  }
}

// login 

const login = async (req, res) => {
  const { email, password, } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      msg: "Please Enter full detail"
    })
  }
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const decodedUser = bcrypt.compare(password, existingUser.password);
  if (!decodedUser) {
    res.status(400).json({
      msg: 'Password incorrect'
    })
  }

  const token = jwt.sign({
    id: existingUser._id, role: existingUser.role
  },
    process.env.JWT_SECRET, { expiresIn: '1h' })

  res.status(200).json({
    token
  })
}

module.exports = { register, login };