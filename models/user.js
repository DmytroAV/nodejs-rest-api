const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helpers');

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
// const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const listSubscription = ["starter", "pro", "business"]


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: emailRegex,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        minLength: 6,
        required: [true, 'Set password for user'],
    },
    subscription: {
        type: String,
        trim: true,
        enum: listSubscription,
        default: "starter"
    },
    token: {
        type: String,
        default: ""
    },
    avatarURL: {
        type: String,
        required: true
    }
}, { versionKey: false, timestamps: true });

userSchema.post("save", handleMongooseError);

const registerUser = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(6).required(),
    subscription: Joi.string(),
    // reapedPassword: Joi.ref("password"),
});

const loginUser = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().min(6).required(),
});

const subscriptionSchema = Joi.object({
    subscription: Joi.string()
        .valid(...listSubscription)
        .required(),
})

const User = model("user", userSchema);

const schemas = {
    registerUser,
    loginUser,
    subscriptionSchema
}

module.exports = {
    User,
    schemas,
}
