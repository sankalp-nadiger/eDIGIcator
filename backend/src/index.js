import dotenv from "dotenv";
import connectDB from "./utils/db.connect.js";
import app from "./app.js";
import { insertDefaultVideos } from "./controllers/Video.controller.js";
import { insertDefaultPreviousPapers } from "./controllers/previousPaper.controller.js";
import { insertDefaultTextbooks } from "./controllers/TextBook.controller.js";

dotenv.config({
    path: "./.env"
});

const PORT = process.env.PORT || 3000;

connectDB()
.then(async () => {
    await insertDefaultVideos();
    await insertDefaultPreviousPapers();
    await insertDefaultTextbooks();
    app.listen(PORT, () => {
        console.log(`⚙️ Server is running at port : ${PORT}`);
    });
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
});
