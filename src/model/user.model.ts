import * as bcrypt from "bcrypt";
import mongoose from "mongoose";
import config from "config";

export interface UserDocument extends mongoose.Document {
    email: string,
    password: string,
    createdAt: Date,
    updateAt: Date,
    comparePassword: (candidatePassword: string) => Promise<boolean>
}


const UserSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    },
    {timestamps: true}
);

UserSchema.pre("save", async function(next: mongoose.CallbackWithoutResultAndOptionalError){
    const user = this as UserDocument;

    // only hash the password if it has been modified (or new)
    if (!user.isModified("password")){
        return next();
    }

    const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));

    const hash = bcrypt.hashSync(user.password, salt);

    user.password = hash;
    
    return next();
})

// Used for loggin in
UserSchema.methods.comparePassword = async function (candidatePassword: string) {
    const user = this as UserDocument;
    return bcrypt.compare(candidatePassword, user.password).catch(() => false)
}

const User = mongoose.model("User", UserSchema);


export default User;
