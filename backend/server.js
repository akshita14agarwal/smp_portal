import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; 
import path from "path"; // ✅ Import path for static files
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js"; 
import User from "./models/mentor.js"; 
import announcementRoutes from "./routes/announcement.js";
import notesRoutes from "./routes/notes.js"; // ✅ Notes Route Adde
import mentorRoutes from "./routes/mentorRoutes.js";
import previousPaperRoutes from './routes/previouspaperRoutes.js';
dotenv.config();

const app = express();

app.use(express.json());  
// These 3 lines allow __dirname to work with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Serve the uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



const allowedOrigins = ["http://localhost:3000", "http://localhost:3001",];
/*app.use(cors({
    origin: "*",  
    credentials: true,

})
);*/
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, origin); // Allow only specific frontend URLs
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true, // Allow credentials
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
// Handle preflight requests (OPTIONS)
app.options("*", (req, res) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.sendStatus(200);
});



  

// 📌 Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/announcements", announcementRoutes);
app.use("/api/notes", notesRoutes);
app.use("api/mentors", mentorRoutes);
app.use('/api/papers', previousPaperRoutes);
// 📌 Serve static files (PDFs) from "uploads" folder
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"; 

// 📌 MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/smp_portal";
mongoose.connect(MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Register Route
app.post("/api/auth/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Email and Password required!" });

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists!" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ Login Route
app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    console.log("🔍 Incoming login request:", email);

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "User not found!" });

        console.log("🔍 Stored Hashed Password:", user.password);
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials!" });

        const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

        console.log("✅ Login Successful!");
        res.json({ token, user: { id: user._id, email: user.email } });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

