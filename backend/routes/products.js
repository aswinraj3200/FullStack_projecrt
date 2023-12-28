const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const jwt = require('jsonwebtoken');

const router = require("express").Router();

// const FILE_TYPE_MAP = {
//   'image/png': 'png',
//   'image/jpeg': 'jpeg',
//   'image/jpg': 'jpg'
// };
// const multer = require('multer');

// // UPLOAD IMAGE
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const isValid = FILE_TYPE_MAP[file.mimetype];
//     if (!isValid) {
//       const uploadError = new Error('Invalid image type');
//       return cb(uploadError, 'public/uploads');
//     }
//     cb(null, 'public/uploads');
//   },
//   filename: function (req, file, cb) {
//     const fileName = file.originalname.split(' ').join('-');
//     const extension = FILE_TYPE_MAP[file.mimetype];
//     cb(null, `${fileName}-${Date.now()}.${extension}`);
//   }
// });

// const uploadOption = multer({ storage: storage });

// CREATE
router.post("/", verifyTokenAndAdmin/*, uploadOption.single('image')*/, async (req, res) => {
  try {
    const userId = req.user.id;
    // const fileName = req.file.filename;
    // const basePath = `${req.protocol}://${req.get('host')}/public/uploads`;
    const newProduct = new Product({
     
      title: req.body.title,
      desc: req.body.desc,
      image: req.body.image, //`${basePath}/${fileName}` Add a slash between basePath and fileName
      categories: req.body.categories, // Assuming categories is an array
      size: req.body.size,
      color: req.body.color,
      price: req.body.price,
      createdBy: userId,
    });

    const saveProduct = await newProduct.save();

    if (saveProduct) {
      return res.status(200).json(saveProduct);
    } else {
      return res.status(404).json('Product not found');
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json('Internal Server Error');
  }
});


//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategories = req.query.categories;
  const qLimit = parseInt(req.query.limit) || 0;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(qLimit || 3);
    } else if (qCategories) {
      products = await Product.find({
        categories: {
          $in: [qCategories],
        },
      }).limit(qLimit);
    } else {
      products = await Product.find().limit(qLimit);
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});


//get product accoding to adminid
router.get('/adminId', verifyTokenAndAdmin, async (req, res) => {
  try {
    const adminId = req.user.id;
    const productId = await Product.find({ createdBy: adminId });
    res.status(200).json(productId);
  } catch (error) {
    console.error(error);
    res.status(500).json('internal server error');
  }
})

router.get(`/`,async (req,res) => {
  try{
    const limit = parseInt(req.query._limit) || 0;

  const limitedProduct = await Product.slice(0,limit);
  res.status(200).json(limitedProduct);
  } catch (error) {
    res.status(500).json('invalid request');
  }
  
});

router.get("/search", async (req, res) => {
  const { search, limit } = req.query;
  const qLimit = parseInt(limit) || 0;

  try {
    let products;

    if (search) {
      // Use a regular expression to perform a case-insensitive search
      const searchRegex = new RegExp(search, "i");

      products = await Product.find({
        $or: [
          { title: { $regex: searchRegex } },
          { desc: { $regex: searchRegex } },
          { categories: { $in: [searchRegex] } },
          { size: { $regex: searchRegex } },
          { color: { $regex: searchRegex } },
        ],
      }).limit(qLimit);
    } else {
      products = await Product.find().limit(qLimit);
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;