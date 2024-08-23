const Item = require("../Categories/items");
const SubCategory = require("../Categories/subCategory");
const Category = require("../Categories/category");

// Create a new item under a sub-category or category
exports.createItem = async (req, res) => {
  try {
    if (req.body.subCategory) {
      const subCategory = await SubCategory.findById(req.body.subCategory);
      if (!subCategory) {
        return res.status(404).json({ message: "SubCategory not found" });
      }
    } else if (req.body.category) {
      const category = await Category.findById(req.body.category);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
    }

    const item = new Item(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find()
      .populate("category")
      .populate("subCategory");
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all items under a specific category
exports.getItemsByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const items = await Item.find({ category: categoryId })
      .populate("category")
      .populate("subCategory");
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all items under a specific sub-category
exports.getItemsBySubCategoryId = async (req, res) => {
  try {
    const { subCategoryId } = req.params;
    const items = await Item.find({ subCategory: subCategoryId })
      .populate("category")
      .populate("subCategory");
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get an item by ID or name
exports.getItemByIdOrName = async (req, res) => {
  try {
    const { id, name } = req.params;
    const item =
      (await Item.findById(id).populate("category").populate("subCategory")) ||
      (await Item.findOne({ name })
        .populate("category")
        .populate("subCategory"));
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an item
exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = await Item.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an item
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search for items by name
exports.searchItemByName = async (req, res) => {
  try {
    const { name } = req.query;
    const items = await Item.find({ name: new RegExp(name, "i") })
      .populate("category")
      .populate("subCategory");
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
