const router = require("express").Router();
const User = require("../models/User");
const Sign = require("../models/Signup");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const newUser = new User({
    username,
    email,
    password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
  });

  try {
    const savedUser = await newUser.save();

    // Generate access token for the registered user
    const accessToken = jwt.sign(
      {
        id: savedUser._id,
        isAdmin: savedUser.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    // Exclude the password from the response
    const { password, ...others } = savedUser._doc;

    // Include the access token in the response
    res.status(201).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json("Wrong User Name");
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const inputPassword = req.body.password;

    if (originalPassword !== inputPassword) {
      return res.status(401).json("Wrong Password");
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
});

//saperate login and sign up for user
router.post(`/signup`, async (req, res) => {
  const { username, email, password } = req.body;

  const newUser = new Sign({
    username,
    email,
    password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString(),
  });

  try {
    const savedSignupUser = await newUser.save();

    // Generate access token for the registered user
    const accessToken = jwt.sign(
      {
        id: savedSignupUser._id,
        // Include any additional user properties you want in the token payload
      },
      process.env.JWT_SEC,
      { expiresIn: '3d' }
    );

    // Exclude the password from the response
    const { password, ...others } = savedSignupUser._doc;

    // Include the access token in the response
    res.status(201).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});
//saperate login for user
router.post('/signin',async (req,res) => {
  try{
    const signIn = await Sign.findOne({ email : req.body.email})
    if (!signIn) {
      return res.status(401).json("Wrong user information");
    }
    const hashedPassword = CryptoJS.AES.decrypt(
      signIn.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    const inputPassword = req.body.password;
    if (originalPassword !== inputPassword) {
      return res.status(401).json("worng password");
    }
    const accessToken = jwt.sign(
      {
        id: signIn._id,
        isAdmin: signIn.isAdmin
      },process.env.JWT_SEC,{expiresIn: "3d"}
    );
    const { password, ...others } = signIn._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    res.status(500).json(error)
  }
})




module.exports = router;