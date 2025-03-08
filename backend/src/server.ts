import express from "express"
import dotenv from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route"
import prodcutRoute from "./routes/product.route"
import transactionRoute from "./routes/transaction.route";
import reviewRoute from "./routes/review.route"

dotenv.config();

const PORT = process.env.PORT || 5000
const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoute);
app.use("/api/product", prodcutRoute);
app.use("/api/transactions", transactionRoute);
app.use("/api/review", reviewRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
