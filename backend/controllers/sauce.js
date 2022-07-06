const express = require('express');
const router = express.Router();

const Thing = require('../models/sauce.js');

exports.createSauce = (req, res, next) => {
    delete req.body._id; 
    const thing = new Thing({
      ...req.body  
    });
    thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
     Thing.findOne({ _id: req.params.id }) 
     .then(thing => res.status(200).json(thing))
     .catch(error => res.status(404).json({ error }));
};

exports.modifySauce  = (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce  = (req, res, next) => {
    
    Thing.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.getAllSauce  = (req, res, next) => {
    Thing.find()
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
};