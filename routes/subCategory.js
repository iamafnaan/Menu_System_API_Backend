const express = require("express");
const {
  createSubCategory,
  getAllSubCategories,
  getSubCategoriesByCategoryId,
  getSubCategoryByIdOrName,
  updateSubCategory,
  deleteSubCategory,
} = require("../CRUD/subCategoryCRUD");
const router = express.Router();

router.post("/", createSubCategory);
router.get("/", getAllSubCategories);
router.get("/category/:categoryId", getSubCategoriesByCategoryId);
router.get("/:id", getSubCategoryByIdOrName);
router.get("/name/:name", getSubCategoryByIdOrName);
router.put("/:id", updateSubCategory);
router.delete("/:id", deleteSubCategory);

module.exports = router;
