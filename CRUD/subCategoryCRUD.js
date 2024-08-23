const SubCategory = require("../Categories/subCategory");
const Category = require("../Categories/category");

// Create a new sub-category under a category
exports.createSubCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.body.category);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const subCategory = new SubCategory(req.body);
    await subCategory.save();
    res.status(201).json(subCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all sub-categories
exports.getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find().populate("category");
    res.status(200).json(subCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all sub-categories under a specific category
exports.getSubCategoriesByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const subCategories = await SubCategory.find({
      category: categoryId,
    }).populate("category");
    res.status(200).json(subCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a sub-category by ID or name
exports.getSubCategoryByIdOrName = async (req, res) => {
  try {
    const { id, name } = req.params;
    const subCategory =
      (await SubCategory.findById(id).populate("category")) ||
      (await SubCategory.findOne({ name }).populate("category"));
    if (!subCategory) {
      return res.status(404).json({ message: "SubCategory not found" });
    }
    res.status(200).json(subCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a sub-category
exports.updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedSubCategory) {
      return res.status(404).json({ message: "SubCategory not found" });
    }
    res.status(200).json(updatedSubCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a sub-category
exports.deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSubCategory = await SubCategory.findByIdAndDelete(id);
    if (!deletedSubCategory) {
      return res.status(404).json({ message: "SubCategory not found" });
    }
    res.status(200).json({ message: "SubCategory deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
