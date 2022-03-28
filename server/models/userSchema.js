const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true

    },

    lastName: {
        type: String,
        required: true

    },

    userName: {
        type: String,
        unique:true
    },

    bio: {
        type: String,
    }, 

    email: {
        type: String, 
        unique: true,
        required: true
    },
    
    phone: {
        type: Number,
        required: true
    },

    role: {
        type: String,
        required: true

    },

    password: {
        type: String,
        required: true
        
    },

    confirmpassword: {
        type: String,
        required: true
        
    },

    genres: [
        {
            type: String,
        }
    ],
    
    NFT: [
        {
            title: {
                type: String,
            },
            description: {
                type: String,
            },
            coverImage: {
                type: String,
            },
            audioFile: {
                type: String,
            },
            price: {
                type: String,
            },
            createAt: {
                type: Date,
                default: Date.now
            },
        }
    ],
    
    Token: [
        {
            token: {
                type: String,
                // required: true
            }
        }
    ]
})

//========================== BCRYPT PASSWORD ====================================//
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.confirmpassword = await bcrypt.hash(this.confirmpassword, 12);        
    }
    next();
})

//========================== GENERATE TOKEN ====================================//
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEYS)
        this.Token = this.Token.concat({ token });
        
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }    
}

const User = mongoose.model('User', userSchema)
module.exports = User;