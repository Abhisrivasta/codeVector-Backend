import dotenv from "dotenv";
import app from "./app.js";
import cors from "cors";


dotenv.config();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://code-vector-frontend-blond.vercel.app",
    ],
  })
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});