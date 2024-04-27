import express from 'express';
import { verifyToken, verifyTokenAdmin } from '../middleware/verifyToken.js';
import { createProduct, deleteProduct, findProductById, getProduct, updateProduct } from '../controller/productController.js';

const router = express.Router();

router.post('/', verifyTokenAdmin, createProduct);

router.get('/find/:id',verifyToken, findProductById);

router.get('/', verifyToken, getProduct);

router.put('/:id', verifyTokenAdmin, updateProduct);

router.delete('/:id', verifyTokenAdmin, deleteProduct);

export default router;