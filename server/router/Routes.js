const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const Genres = require('../models/genresSchema');
const authenticate = require('../middleware/CheckAuth');
const bcrypt = require('bcrypt');
const path = require('path');
const cloudinary = require('../utils/cloudinary');
const upload = require('../utils/multer');

//================================== For Register User ===================================//
router.post('/signUp', async (req, res) => {
        const { user, genres } = req.body
    try {
        const usernameExist = await User.findOne({userName: user.userName})
        const emailExist = await User.findOne({ email: user.email })
        if (emailExist) {
            res.send("Email already Exists")
        } else {
            const result = await User(user).save();
            await User.updateOne({userName: user.userName }, {$push: {genres: genres}})
            res.send("Register Sucessfully")
        }
    }
    catch (err) {
        console.log(err);
        res.send("error" + err)
    };
})

//================================== For Login User ===================================//
router.post('/signIn', async (req, res) => {
    try {
        let token;
        const { email, password } = req.body;

        const userLogin = await User.findOne({ email: email })
        
        if (userLogin) {
            const validate = await bcrypt.compare(password, userLogin.password);

            if (!validate) {
                res.status(400).send({ error: 'Invalid Credentials!' });
            } else {
                token = await userLogin.generateAuthToken();

                res.cookie("jwtLogin", token, {
                    expires: new Date(Date.now() + 1 * 3600 * 1000),
                })

                res.send({msg: "User Login Successfully!"});
            }
            
        } else {
            res.status(400).send({ error: "Invalid Credientials!" });
            
        }
    } catch (err) {
        console.log(err);
    }
})

//================================== For get User Profile ===================================//
router.get('/getUserProfile', authenticate, async (req, res) => {
    try {
        const LoginUser = req.authenticateUser
        res.send({LoginUser})
    } catch (err) {
        console.log(err);
    }
})

//================================== For Update User Profile ===================================//
router.put('/updateUserProfile/:id/:email', authenticate, async (req, res) => {
    try {
        const id = req.params.id;
        const updateValue = req.body;
        const email = req.params.email;

        await User.findByIdAndUpdate(id, updateValue, { new: true });
        res.json('Profile Updated Successfully!')
        
    } catch (err) {
        console.log(err);
    }
})
//================================== For Post Genres ===================================//
router.post('/addGenres', async (req, res) => {
    try {
        const genres = req.body;
        await Genres(genres).save();
        res.send("Genres Added");
    } catch (err) {
        console.log("error" + err);
    }
})

//================================== For Get Genres ===================================//
router.get('/getGenres', async (req, res) => {
    try {
        const page = req.query.page;
        const search = req.query.search;
        let limit = 5;
        let skip = (page - 1) * limit
        
        aggregateQuery = []

        aggregateQuery.push(
            { $sort: { "title": 1 } },            
        )

        if (search === "") {
            aggregateQuery.push(
                {
                    $skip: skip
                },
                {
                    $limit: limit
                }
            )
        } else if(search !== "") {
            aggregateQuery.push(
                {
                    $match: {
                        $or: [
                            { "title": new RegExp("^" + search, 'i') },
                        ]
                    }
                },
                {$skip: skip},{$limit: limit}
            )
        }

        const matchUser = await Genres.aggregate([{ $sort: { "title": 1 } }])
        let totalPage = Math.ceil(matchUser.length / limit);
        const genres = await Genres.aggregate([aggregateQuery]);
        res.send({totalPage, genres});
    } catch (err) {
        console.log(err);
    }
})

//================================== For Update Genres ===================================//
router.put('/updateGenres', async (req, res) => {
    try {
        const id = req.query.id;
        const updateValue = req.body

        await Genres.findByIdAndUpdate(id, updateValue, { new: true })
        res.send({msg: "Genres Updated Successfully!"})
    } catch (err) {
        console.log("error", err);
    }
})

//================================== For Delete Genres ===================================//
router.delete('/deleteGenres', authenticate, async (req, res) => {
    try {
        const id = req.query.id
        await Genres.findByIdAndDelete(id)
        res.send({msg: "Generes Deleted"})        
    } catch (err) {
        console.log(err);
    }
})

//================================== For Get Artist ===================================//
router.get('/getArtist', async (req, res) => {
    try {
        const page = req.query.page;
        const search = req.query.search;
        let limit = 5;
        let skip = (page - 1) * limit;
        
        aggregateQuery = []

        aggregateQuery.push(
            {$match: {'role' : "artist"}},
        )

        if (search === "") {
            aggregateQuery.push(
                { $skip: skip }, { $limit: limit}
            )
        } else if (search !== "") {
            aggregateQuery.push(
                {
                    $match: {
                        $or: [
                            { "userName": new RegExp("^" + search, 'i') },
                            {"email" : new RegExp(search, "i")}
                        ]
                    },
                },
                { $skip: skip }, { $limit: limit}
            )
        }
        
        const matchUser = await User.aggregate([{ $match: { "role": "artist" } }]);
        let totalPage = Math.ceil(matchUser.length / limit);
        const artist = await User.aggregate([aggregateQuery])
        res.send({artist, totalPage})

    } catch (err) {
        console.log("error" + err);
    }
})
//================================== For Update Artist Profile ===================================//
router.put('/updateArtistProfile/:id', authenticate, async (req, res) => {
    try {
        const genres = req.body.checkGenres;
        const { _id, firstName, lastName, email, bio, userName, password, role } = req.body.values;

        const updateValues = {
            _id, firstName, lastName, email, bio, userName, password, role, genres
        }

        await User.findByIdAndUpdate({ _id: req.params.id }, updateValues, { new: true })
        res.send("Artist Profile Updated Succesfully!")
    } catch (err) {
        console.log("error", err);
    }
})

//================================== For CreateNft ===================================//
router.post('/uploadNFT', authenticate, async (req, res) => {
    try {
        const userId = req.query.Id;
        // console.log("userId", userId);

        const { title, description, price } = req.body.values
        
        const audioFile = req.body.AudioFile

        const coverImage = req.body.CoverImage

        const nft = { title, description, price, audioFile, coverImage } 
        // console.log("nft", nft);
        
        const newNFT = await User.updateOne({ _id: userId }, { $push: { NFT: nft }})
        // console.log("newNFT", newNFT);
        
        res.send({msg: "NFT create Sucessfully!"})
                
    } catch (err) {
        console.log(err);
    }
})

//================================== For Add Image of NFT ===================================//
router.post('/addNFTImage', authenticate, upload.single('image'), async (req, res) => {
    try {
        const photo = req.file;

        const uploadPhoto = await cloudinary.uploader.upload(photo.path, { resource_type: 'auto' })
        
        res.send(uploadPhoto.secure_url)
    } catch (err) {

        res.status(400).send({error: "CoverImage Not Add"})
    }
})

//============================= Add Audio Nft =============================
router.post('/uploadAudioFile',authenticate, upload.single('audio'), async (req, res) => {

    try {
        const file = req.file;
        // console.log("file", file);

        const type = path.extname(file.originalname);
        // console.log("type", type);

        if (type !== '.mp3' && type !== '.wav' && type !== '.sit') {

            res.status(400).send({ error: 'File Is Not An Audio file!' })
        }
        else {
            const uploadFiles = await cloudinary.uploader.upload(file.path, { resource_type: 'auto' });

            const audioFile = uploadFiles.secure_url;

            res.send(audioFile);

        }
    }
    catch (err) {
        res.status(err)
    }
});

//================================== For CreateNft ===================================//
router.get('/getNFT', async (req, res) => {
           

    try {
       
        let aggregateQuery = [];

        aggregateQuery.push(
            {
                $unwind: "$NFT"
            },
            {
                $sort: {
                    "NFT.createAt": -1
                }
            }
        );

        const playList = await User.aggregate([aggregateQuery]);
            console.log("playList", playList);
        res.send(playList)
    }
    catch (err) {
        //============================= Send Error Message =============================
        res.send(err)
    }
});

//================================== For Change Password ===================================//
router.put('/changePassword/:id', authenticate, async (req, res) => {
    try {
        const id = req.params.id;
        const { oldPassword, password, confirmpassword } = req.body;

        const userLogin = await User.findOne({ _id: id })

        if (userLogin) {
            const validate = await bcrypt.compare(oldPassword, userLogin.password);

            if (validate) {
                const bcryptPass = await bcrypt.hash(password, 10);
                const bcryptCPass = await bcrypt.hash(confirmpassword, 10);
                await User.findByIdAndUpdate(req.params.id, { password: bcryptPass, confirmpassword: bcryptCPass }, { new: true });
                res.send({msg: "password change"})
            } else {
                res.status(400).send("Password does not match")
            }
        }
        
    } catch (err) {
        console.log("error", err);
    }
})

router.get('/getArtistAndGenresCount', authenticate, async (req, res) => {
    try {
        const aggregateQuery = []

        aggregateQuery.push(
            {$match : {role: "artist"}}
        )

        const Artist = await User.aggregate([aggregateQuery])
        const artistCount = Artist.length;

        const genres = await Genres.find();
        const genresCount = genres.length;

        res.send({artistCount, genresCount})
    } catch(err) {
        console.log(err);
    }
})

//================================== For Logout User ===================================//
router.get('/logout', authenticate, async (req, res) => {
    try {
        req.authenticateUser.Token = req.authenticateUser.Token.filter((elem) => {
            return elem.token !== req.token
        })

        res.clearCookie("jwtLogin");
        await req.authenticateUser.save();
        res.status(200).send("user Logout");

    } catch (err) {
        console.log(err);
    }
})

module.exports = router

