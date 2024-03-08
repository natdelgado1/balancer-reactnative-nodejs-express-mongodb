const mongoose = require("mongoose");
const bcrypt = require('bcrypt');



const PasswordTokenSchema = new mongoose.Schema({

    token: {
        type: String,
        defaultValue: ""
    },
    valid: {
        type: Boolean,
        required: true,
        defaultValue: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }


}, { timestamps: true, versionKey: false });



PasswordTokenSchema.pre('save', function (next) {
    bcrypt.hash(this.token, 10)
        .then(hash => {
            this.token = hash;
            next();
        });
});


const PasswordToken = new mongoose.model("PasswordToken", PasswordTokenSchema);

module.exports = PasswordToken;