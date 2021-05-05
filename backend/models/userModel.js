import mongoose from "mongoose"
import bcrypt from "bcryptjs"

// schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
},
    { timestamps: true }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// runs before save/create new user instance
// cannot use arrow function here for some reason
userSchema.pre('save', async function (next) {
    // prevents hashing multiple times
    if (!this.isModified("password")) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hashSync(this.password, salt)
})


// model
const User = mongoose.model('User', userSchema)


export default User