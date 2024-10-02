const Product = require('./../models/productModel');

exports.createProduct = async (req, res, next) => {
  try {
    console.log(req.file);
    const { name, price, description, stock, category, discountPercentage } =
      req.body;
    const image = req.file.path;

    const product = await Product.create({
      name,
      price,
      description,
      stock,
      category,
      discountPercentage,
      image,
    });
    if (product) {
      res.status(201).json({
        message: 'success',
      });
    }
  } catch (error) {
    next(error);
  }
};


exports.getProduct = async(req,res)=>{
try {
    const product = await Product.find();
    if(product){
        res.status(200).json({
            length : product.length,
            product
        })
    }
} catch (error) {
    next(error)
}
}

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;  // Assuming the product ID is coming from the route parameters (req.params)

    // Try finding the product by its ID
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Delete the product if found
    await Product.findByIdAndDelete(id);

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);  // Pass the error to the error-handling middleware
  }
};
