const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')

//@disc Get goals
//@api GET api/getGoals
//@access Privete
getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })
    res.status(200).json(goals)
})

//@disc Set goal
//@api GET api/setGoal
//@access Privete
setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Bad request.')
    } else {
        const goal = await Goal.create({
            text: req.body.text,
            user: req.user.id
        })
        res.status(200).json(goal)

    }

})

//@disc Update goal
//@api PUT api/updateGoal/:id
//@access Privete
updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
        res.status(400);
        throw new Error('Goal not found.');
    }

    // Check user exist 
    if (!req.user) {
        res.status(401);
        throw new Error('User not exist.')
    }

    // Make sure user is matched to goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized.')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedGoal)


})

//@disc Delete goal
//@api DELETE api/getGoal/:id
//@access Privete
deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
        res.status(400);
        throw new Error('Goal not found.');
    }

    // Check user exist 
    if (!req.user) {
        res.status(401);
        throw new Error('User not exist.')
    }

    // Make sure user is matched to goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized.')
    }
    await goal.remove()
    res.status(200).json({ id: req.params.id })


})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}