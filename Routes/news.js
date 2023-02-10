const express = require('express');
const router = express.Router();

const News = require('../models/Newsmodal');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
//const { findById } = require('../models/Newsmodal');


// Route 1 : to get all news ; Login required - /api/news/fetchallnews

// for user specific news

// router.get('/fetchallnews', fetchuser, async (req, res) => {
//   try {
//     const news = await News.find({ user: req.user.id })
//     res.json(news)
  
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Some Error Occurred!")
//   }
// })

router.get('/fetchallnews', async function (req, res) {
   let news = News.find({}, function(err, news){
    if(err){
        console.log(err);
    }
    else {
        res.json(news);
    }
});
});
// Route 2 : to add news ; Login required - /api/news/addnews
router.post('/addnews', fetchuser, [

  body('title', 'Enter Title').isLength({ min: 3 }),
  body('description', 'Enter description').isLength({ min: 5 }),
  body('publisher', 'Enter Publisher Name').isLength({ min: 3 }),
  body('tag', 'Enter tags').isLength({ min: 3 })


], async (req, res) => {
  
  try {

    const { title, description, tag, publisher } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });  // for print error if validation false
    }
    const news = new News({
      title, description, tag, publisher, user: req.user.id
    })
    const savedNews = await news.save();
    res.json(savedNews);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error Occurred!")
  }
})

// Route 3 : to update news ; Login required  -/api/news/updatenews
router.put('/updatenews/:id', fetchuser, async (req, res) => {
  const { title, description, publisher, tag } = req.body

  // createing new News object
  const newNews = {};
  if (title) { newNews.title = title };
  if (description) { newNews.description = description };
  if (publisher) { newNews.publisher = publisher };
  if (tag) { newNews.tag = tag };

  //find the News to updated and update it
  let news = await News.findById(req.params.id);

  if (!news) { return res.status(404).send('Not found') }  // if news not found
  //if (news.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") } // if news is not belongs to loggedin user

  news = await News.findByIdAndUpdate(req.params.id, { $set: newNews }, { new: true })
  res.json({ news })

})

// Route 3 : to delete news ; Login required  -/api/news/deletenews
router.delete('/deletenews/:id', fetchuser, async (req, res) => {
  const { title, description, publisher, tag } = req.body

  //find the News to delete and delete it
  let news = await News.findById(req.params.id);

  if (!news) { return res.status(404).send('Not found') }  // if news not found
  //if (news.user.toString() !== req.user.id) { return res.status(401).send("Not Allowed") } // if news is not belongs to loggedin user

  news = await News.findByIdAndDelete(req.params.id)
  res.json({ "Success": "News has been deleted", news: news })

})
module.exports = router 