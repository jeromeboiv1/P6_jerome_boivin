const user = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email : req.body.email,
                password : hash
            });
            user.save()
                .then(() => res.status(201).json({message : 'utilisateur créé !'}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({message : "erreur d'identification"}));
};

exports.login = (req, res, next) => {
    User.findOne({email : req.body.email})
        .then(user => {
            if(user === null){
                res.status(401).json({message : 'L\'identifiant et le mot de passe ne correspondent pas'});
            }else{
                bcrypt.compare(req.body.password, user.password)
                    .then(valid =>{
                        if(!valid){
                            res.status(401).json({message : 'L\'identifiant et le mot de passe ne correspondent pas'})
                        }else{
                            res.status(200).json({
                                userId : user._id,
                                token : jwt.sign(
                                    {userId : user._id},
                                    'RANDOM_TOKEN_SECRET',
                                    {expiresIn: '24h'}
                                )
                            });
                       }
                    })
                    .catch(error => res.status(500).json({error}));
            }
        })
        .catch(error => {
            res.status(500).json({error});
        })
};