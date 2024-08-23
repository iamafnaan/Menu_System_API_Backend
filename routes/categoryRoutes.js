const express = require("express");
const {
  createCategory,
  getAllCategories,
  getCategoryByIdOrName,
  updateCategory,
  deleteCategory,
} = require("../CRUD/categoryCRUD");
const router = express.Router();

router.post("/", createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryByIdOrName);
router.get("/name/:name", getCategoryByIdOrName);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
