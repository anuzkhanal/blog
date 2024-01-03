const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Parse JSON requests

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://anujkhanal-blog:R7etAvfJVOyDS8z4@cluster0.u3fp1kb.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Define BlogPost model
const BlogPost = mongoose.model("BlogPost", {
  title: String,
  content: String,
});

// API routes
app.get("/api/posts", async (req, res) => {
  // Retrieve all blog posts
  const posts = await BlogPost.find();
  res.json(posts);
});

app.post("/api/posts", async (req, res) => {
  // Create a new blog post
  const { title, content } = req.body;
  const newPost = new BlogPost({ title, content });
  await newPost.save();
  res.json(newPost);
});

// ... Additional routes for updating and deleting posts ...

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
