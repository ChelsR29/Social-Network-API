const router = require('express').Router();
const {
  getThoughts,
  getThoughtById,
  createThought,
  updateThoughtbyId,
  deleteThought,
} = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThoughtbyId)
  .delete(deleteThought);

module.exports = router;
