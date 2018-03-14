const mongoose = require('mongoose');

const flashCardsSchema = mongoose.Schema({
	question:{
    type: String,
    require: true
	 },
   hint:{
    type: String,
  },
  answer: {
    type: String,
    required:true
  }
});

const FlashCards = module.exports = mongoose.model('flashcards', flashCardsSchema);

module.exports.getFlashCards = (callback) => FlashCards.find(callback);

module.exports.addFlashCards = (flashCard, callback) => FlashCards.create(flashCard, callback);
