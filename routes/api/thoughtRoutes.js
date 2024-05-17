const router = require('express').Router();
const {
  getThoughts,
  getThoughtById,
  createThought,
  updateThoughtbyId,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('/')
  .get(getThoughts)
  .post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThoughtbyId)
  .delete(deleteThought);

router.route('/:thoughtId/reactions') 
  .post(createReaction)

router.route('/:thoughtId/reactions/:reactionId') 
  .delete(deleteReaction)

module.exports = router;
