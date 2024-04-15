import mongoose from 'mongoose';

const sequenceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, default: 1 },
});

module.exports = mongoose.model('Sequence', sequenceSchema);