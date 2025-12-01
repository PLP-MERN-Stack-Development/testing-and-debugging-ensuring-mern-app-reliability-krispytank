// bugController.js
const Bug = require('../models/Bug');
const { validateBugPayload } = require('../utils/validation');

exports.createBug = async (req, res, next) => {
  try {
    const { valid, errors } = validateBugPayload(req.body);
    if (!valid) return res.status(400).json({ errors });

    const bug = new Bug({
      title: req.body.title,
      description: req.body.description || '',
      status: req.body.status || 'open'
    });

    const saved = await bug.save();
    res.status(201).json(saved);
  } catch (err) { next(err); }
};

exports.getAllBugs = async (req, res, next) => {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 });
    res.json(bugs);
  } catch (err) { next(err); }
};

exports.updateBug = async (req, res, next) => {
  try {
    const id = req.params.id;
    // apply validation
    const { valid, errors } = validateBugPayload(req.body);
    if (!valid) return res.status(400).json({ errors });

    const updated = await Bug.findByIdAndUpdate(
      id,
      { $set: { title: req.body.title, description: req.body.description, status: req.body.status } },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Bug not found' });
    res.json(updated);
  } catch (err) { next(err); }
};

exports.deleteBug = async (req, res, next) => {
  try {
    const removed = await Bug.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ message: 'Bug not found' });
    res.json({ message: 'Bug deleted' });
  } catch (err) { next(err); }
};
