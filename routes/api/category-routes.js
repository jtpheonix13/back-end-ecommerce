const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const allCategories = await Category.findAll(
      {
        // be sure to include its associated Products
        include: [{model: Product}]
      }
    );
    res.status(200).json(allCategories);
  } catch(err) {
    res.status(400).json(err);
  }
  
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const singleCategory = await Category.findByPk( req.params.id, {
      // be sure to include its associated Products
      include: [{ model: Product}]
      }
    );
    if (!singleCategory) {
      res.status(404).json({message: "No category with that ID exists."})
      return;
    }
    res.status(200).json(singleCategory);
  } catch(err) {
    res.status(400).json(err);
  }
});
      

  

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (!deleteCategory) {
      res.status(404).json({ message: 'No Category found with this id!' });
      return;
    }
    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(400).json({message: "This category has been deleted."});
  }
});

module.exports = router;
