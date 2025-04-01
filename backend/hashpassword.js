import bcrypt from "bcrypt";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const User = mongoose.model("User", new mongoose.Schema({
    email: String,
    password: String, // Hashed password
}));

const hashPassword = async (email, rawPassword) => {
    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    await User.findOneAndUpdate({ email }, { password: hashedPassword });
    console.log(`✅ Updated password for ${email}`);
};

const updateAllPasswords = async () => {
    const users = await User.find();
    for (let user of users) {
        await hashPassword(user.email, user.password);
    }
    console.log("✅ All passwords updated!");
    process.exit();
};

updateAllPasswords();
