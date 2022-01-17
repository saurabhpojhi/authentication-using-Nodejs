const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    patientid: {
        type: Number,
        required: true
    },
    vital_sign: {
        type: Number,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

// using hashing for  password

userSchema.pre('save', async function (next) {
    console.log(" hi from inside");
    if (this.isModified('password')) {
        console.log('hi aim pre password');
        this.password = bcrypt.hash(this.password, 12);
        this.cpassword = bcrypt.hash(this.cpassword, 12);
    }
    next();
});
// Generating  a token 
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
        
        // get token from cookies

        res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly:true
        });

    } catch (err) {
        console.log(err);
    }
}

const User = mongoose.model('USER', userSchema);

module.exports = User;
