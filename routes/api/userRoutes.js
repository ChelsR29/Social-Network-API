const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController.js');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getUserById).put(updateUserById).delete(deleteUser);

// // /api/users/:userId/friends
// router.route('/:userId/friends')

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
