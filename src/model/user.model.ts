import mongoose from "mongoose"
import bcrypt from "bcrypt"
import config from "config"
import log from "../logger";

export interface userDocument extends mongoose.Document {
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}


const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true
    }
);


userSchema.pre("save", async function (next: mongoose.HookNextFunction) {
    let user = this as userDocument;

    // only hash the password if it has been modified or is new
    if (!user.isModified("password")) return next();

    // generate salt & hash
    const salt = await bcrypt.genSalt(config.get("saltFactor"));
    const hash = await bcrypt.hashSync(user.password, salt);

    // replace plaintext pwd with the hash
    user.password = hash;

    return next();

});

userSchema.methods.comparePassword = async function (candidatePassword: string) {
    const user = this as userDocument;
    return bcrypt.compare(candidatePassword, user.password).catch(e => false)
}

const User = mongoose.model<userDocument>("User", userSchema);

export default User;