import ErrorHandler from "../middleware/errorHandler.js"
import Product from "../models/productModel.js"


export const getProduct = async(req, res, next) => {
    try{
        const products = await Product.find(req.query)
        return res.status(200).json(products)

    }catch(error){
        console.log(error)
        return next(new ErrorHandler(error.message, 500));
    }
}

export const findProductById = async(req, res, next) => {
    try{
        const productId = req.params.id
        const product = await Product.findById(productId);
        if(!product){
            return res.status(500).json({msg:'product not found'})
        }
        return res.status(200).json(product)

    }catch(error){
        console.log(error)
        return next(new ErrorHandler(error.message, 500));
    }
}

export const createProduct = async(req, res, next) => {
    try{
        const newProduct = await Product.create({...req.body})
        return res.status(201).json(newProduct)

    }catch(error){
        console.log(error)
        return next(new ErrorHandler(error.message, 500));
    }
}

// Update a product
export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        return res.status(200).json(updatedProduct);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Internal server error' });
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        return res.status(200).json({ msg: 'Product deleted successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Internal server error' });
    }
};



