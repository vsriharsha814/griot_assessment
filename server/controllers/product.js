// server/controllers/product.js
const Product = require("../models/Product");
const { validateBid, formatBidHistory } = require("../utils/bidValidation");
const { isOwner } = require("../utils/productOwnership");
require("dotenv").config();
exports.createProduct = async (req, res) => {
    try {
        // const imagePath = req.file.path;
        const { name, description, startingBid, minBidAmount } = req.body;
        const imagePath = req.file ? req.file.path : null;
        console.log("request recieved", req.body);
        const newProduct = new Product({
            name,
            description,
            startingBid,
            minBidAmount,
            imageUrl: imagePath,
            userId: req.user?._id,
        });
        const savedProduct = await newProduct.save();
        console.log("Product saved successfully"); // Log success

        res.status(201).json(savedProduct);
        console.log(savedProduct);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.getProductById = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// New function to handle placing bids
exports.placeBid = async (req, res) => {
    const { productId } = req.params;
    const { bidderName, bidAmount } = req.body;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const bidValidation = validateBid(product, bidAmount);
        if (!bidValidation.isValid) {
            return res.status(400).json({ message: bidValidation.message });
        }

        // Add the bid to the bid history
        product.bidHistory.push({ bidderName, bidAmount });

        // Save the updated product
        await product.save();
        console.log("Bid placed successfully:", { bidderName, bidAmount });

        res.status(200).json({ message: "Bid placed successfully" });
    } catch (error) {
        console.error("Error placing bid:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getBidHistory = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const bidHistory = formatBidHistory(product);
        res.status(200).json(bidHistory);
    } catch (error) {
        console.error("Error fetching bid history:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getModel = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Extract bid history from the product
        const bidHistory = product.bidHistory;

        console.log("bid hisotry", Array.isArray(product.bidHistory));
        res.status(200).json(bidHistory);
    } catch (error) {
        console.error("Error fetching bid history:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getInventoryForUser = async (req, res) => {
    try {
        const userEmail = req.user.email; // Assuming you have stored user information in the request object after authentication
        const inventory = await Product.find({ userEmail });

        res.json(inventory);
    } catch (error) {
        console.error("Error fetching inventory for user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.updateProduct = async (req, res) => {
    const { productId } = req.params;
    const { name, description, startingBid, minBidAmount } = req.body;

    try {
        // Find the product by productId
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (!isOwner(product.userId, req.user?._id)) {
            return res.status(403).json({ message: "You can only update your own listings" });
        }

        // Update product details
        if (name !== undefined) product.name = name;
        if (description !== undefined) product.description = description;
        if (startingBid !== undefined) product.startingBid = startingBid;
        if (minBidAmount !== undefined) product.minBidAmount = minBidAmount;

        // Save the updated product
        await product.save();

        res.status(200).json({
            message: "Product updated successfully",
            updatedProduct: product,
        });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.deleteProduct = async (req, res) => {
    const { productId } = req.params;

    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (!isOwner(product.userId, req.user?._id)) {
            return res.status(403).json({ message: "You can only delete your own listings" });
        }

        await product.deleteOne();
        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
