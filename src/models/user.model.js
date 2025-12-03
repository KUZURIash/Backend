import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
//We are creating the model for Users
const userSchema = new Schema({ //userSchema it define we are creating a new schema for user collection
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullName:{
        type:String,
        required:true,
        trim:true,
        index:true,
    },
    avatar: {
            type: String, // cloudinary url
            required: true,
        },
        coverImage: {
            type: String, // cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }

    },
    {
        timestamps: true
    }

)

userSchema.pre("save",async function(next){ //jab save hoga tab ye function chalega.//pre is a mongoose middleware that runs before saving a document.//function keyword is used to access 'this' keyword which points to the current document being saved.
if (!thish.isModiified("password") ) return next() //if password is not modified then next()
this.password=bcrypt.hash(this.password,10)//if password is modified then hash it with bcrypt
next()//we use next() to proceed to the next middleware or to complete the save operation.
//hashing the password before saving
})


userSchema.methods.isPasswordCorrect=async function (password){
    return await bcrypt.compare(password, this.password)

}
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User=mongoose.model("User",userSchema);//We are creating a model named User using the userSchema defined above.