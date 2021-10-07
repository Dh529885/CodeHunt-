// Require and setup Depencies
const { application } = require('express');
const express = require('express');
const codeRouter = express.Router();
const Codehunt = require('../models/codehunt.js');

// ROUTES
// SEED
const seed = require('../models/seed.js');
codeRouter.get('/seed', (req, res) => {
  Codehunt.deleteMany({}, (error, allCodeHunt) => { });

    Codehunt.create(seed, (error, data) => {
      res.redirect('/codehunt');
    });
  });
application.get('/', (req,res) => {
    res.redirect('/codehunt');
})
// Index
codeRouter.get('/', (req, res) => {
  Codehunt.find({}, (error, allCodeHunt) => {
    res.render('index.ejs', { codehunts: allCodeHunt });
  });
});
// NEW
codeRouter.get('/new', (req, res) => {
  res.render('new.ejs');
});
//DELETE
codeRouter.delete('/:id', (req, res) => {
  Codehunt.findByIdAndDelete(req.params.id, (error, deletedCodehunt) => {
    //res.send({ success: true });
    res.redirect('/codehunt');
  });
});

// SHOW
codeRouter.get("/:id", (req, res) => {
  Codehunt.findById(req.params.id, (error, showCodehunt) => {
    res.render("show.ejs", { codehunts: showCodehunt });
  });
});
//UPDATE
codeRouter.put('/:id', (req, res) => {
  Codehunt.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedCodehunt) => {
        console.log(updatedCodehunt)
      res.redirect(`/codehunt/${req.params.id}`);
    });
});
// CREATE/SAVE
codeRouter.post('/', (req, res) => {
  Codehunt.create(req.body, (error, createdStore) => {
    res.redirect('/codehunt');
  });
});
//EDIT
codeRouter.get('/:id/edit', (req, res) => {
  Codehunt.findById(req.params.id, (error, allCodeHuntToEdit) => {
    res.render('edit.ejs', {
      codehunts: allCodeHuntToEdit
    });
  });
});

// Export functionlity 
module.exports = codeRouter;