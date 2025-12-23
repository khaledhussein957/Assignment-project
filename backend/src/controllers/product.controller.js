import { connectedDB } from "../config/db.js";
import cloudinary from "../config/cloudinary.js";

export const getProducts = async (req, res) => {
  try {
    const result = await connectedDB.query("SELECT * FROM products");
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No products found" });
    }
    res.json(result.rows); // Return all products as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await connectedDB.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(result.rows[0]); // Return the specific product as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    const files = req.files;

    if (!name || !description || !price || !quantity) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "At least one image is required" });
    }

    const imageUrls = [];

    for (const file of files) {
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "products",
      });
      imageUrls.push(uploadResult.secure_url);
    }

    const productData = {
      name,
      description,
      price: parseFloat(price),
      images: imageUrls,
      quantity: parseInt(quantity),
    };

    const query =
      "INSERT INTO products (name, description, price, images, quantity) VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const values = [
      productData.name,
      productData.description,
      productData.price,
      productData.images,
      productData.quantity,
    ];

    const result = await connectedDB.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, quantity } = req.body;

    const imageUrls = [];

    if (req.files) {
      for (const file of req.files) {
        const uploadResult = await cloudinary.uploader.upload(file.path, {
          folder: "products",
        });
        imageUrls.push(uploadResult.secure_url);
      }
    }

    const productData = {
      name,
      description,
      price: parseFloat(price),
      images: imageUrls,
      quantity: parseInt(quantity),
    };

    const query =
      "UPDATE products SET name = $1, description = $2, price = $3, images = $4, quantity = $5 WHERE id = $6 RETURNING *";
    const values = [
      productData.name,
      productData.description,
      productData.price,
      productData.images,
      productData.quantity,
      id,
    ];

    const result = await connectedDB.query(query, values);
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await connectedDB.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete product" });
  }
};
