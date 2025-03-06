const express = require('express')
const userRoutes=require("./routes/user.route.js")
const connectDB=require("./config/db.config.js")
const authRoutes=require("./routes/auth.route.js")
const roleRoutes=require("./routes/role.route.js")
const ticketRoutes=require("./routes/ticket.route.js")
const cors=require('cors');
const app = express()
connectDB();
const cookieParser = require('cookie-parser')
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:3001'] ,
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true,
}));
app.use('/api/user',userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/ticket', ticketRoutes);
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
