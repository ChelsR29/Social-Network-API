// const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// Aggregate function to get the number of students overall
// const headCount = async () => {
//   const numberOfStudents = await Student.aggregate()
//     .count('studentCount');
//   return numberOfStudents;
// }

// // Aggregate function for getting the overall grade using $avg
// const thought = async (userId) =>
//   User.aggregate([
//     // only include the given student by using $match
//     { $match: { _id: new ObjectId(userId) } },
//     {
//       $unwind: '$assignments',
//     },
//     {
//       $group: {
//         _id: new ObjectId(studentId),
//         overallGrade: { $avg: '$assignments.score' },
//       },
//     },
//   ]);

module.exports = {
  // Get all students
  async getUsers(req, res) {
    try {
      const users = await User.find();

      const userObj = {
        users,
      };

      res.json(userObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single student
  async getUserById(req, res) {
    try {
      const userId = req.params.id;
  
      // Find the user by _id and populate 'thoughts' and 'friends'
      const user = await User.findById(userId)
        .populate('thoughts')
        .populate('friends');
  
      // If user is not found, return 404
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return the user data
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new student
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // New route to update a user by _id
  async updateUserById(req, res) {
    try {
      const userId = req.params.id;

      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $set: req.body },
        { new: true }
      )
        // .populate('thoughts')
        // .populate('friends');

      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a student and remove them from the course
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }

      // Remove associated thoughts
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
  
      // Remove the user
      await User.findByIdAndDelete(user);
  
      res.json({ message: 'User and associated thoughts deleted successfully' });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Add an assignment to a student
  async addFriend(req, res) {
    console.log('You are adding a friend');
    console.log(req.body);

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove assignment from a student
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friend: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
