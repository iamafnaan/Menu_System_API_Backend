const express = require("express");
const {
  createItem,
  getAllItems,
  getItemsByCategoryId,
  getItemsBySubCategoryId,
  getItemByIdOrName,
  updateItem,
  deleteItem,
  searchItemByName,
} = require("../CRUD/itemsCRUD");
const router = express.Router();

router.post("/", createItem);
router.get("/", getAllItems);
router.get("/category/:categoryId", getItemsByCategoryId);
router.get("/subcategory/:subCategoryId", getItemsBySubCategoryId);
router.get("/:id", getItemByIdOrName);
router.get("/name/:name", getItemByIdOrName);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);
router.get("/search", searchItemByName);

module.exports = router;
