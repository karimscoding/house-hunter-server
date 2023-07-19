const express = require ("express")
const mongoose = require ("mongoose")
const cors = require ("cors")
const authRouters = require("./routes/auth")

const app = express()

// middleware
app.use(express.json())
app.use(cors())

// routes
app.use("/api", authRouters);
const uri ="mongodb+srv://rejaulkarim:wFtOtoToKiZ1moO6@cluster0.lqmni67.mongodb.net/"

//connect to mongodb atlas
mongoose.connect(uri, {
    useUnifiedTopology: true,

})

// Check database connection status
const db = mongoose.connection;
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

app.get("/", (req, res)=>{
    res.status(201).json({message:"Server is running"})
})

const PORT = 5000;
app.listen(PORT, () =>{
    console.log(`server is running on port: ${PORT}`)
})
