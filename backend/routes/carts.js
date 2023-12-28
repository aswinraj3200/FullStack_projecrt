const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/",verifyToken, async (req, res) => {
  try {
      const { title, productId, quantity, userId , id , image , price } = req.body;
      

      const newCart = new Cart({
          title,
          userId,
          quantity,
          productId,
          id,
          image,
          price,
      });

      const savedCart = await newCart.save();
      res.status(200).json(savedCart);
  } catch (err) {
      console.error('Error adding product to cart:', err);
      res.status(500).json('Cannot add product');
  }
});


//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  } 
});

//GET USER CART
router.get(`/`,verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.find({ userId:userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json('cannot find error');
  }
});

// //GET ALL

router.get("/find",  async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;