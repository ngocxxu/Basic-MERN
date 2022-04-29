import express from "express";
// Middleware
import bodyParser from "body-parser";
import cors from "cors";
import posts from "./routers/posts.js";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 5000;

const URI =
  "mongodb+srv://admin:Ngocquach4397@cluster0.rbdq7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// limit dùng để giới hạn ng dùng submit gửi dữ liệu lên server
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());

// Viet route thông qua express
// Cách viết ngắn gọn
// Bằng cách import router tương ứng
// http://localhost:5000/posts/
app.use("/posts", posts);

// Goi mongoose để connect tới database, vì đây là 1 promise nên dùng then()
mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to DB");

    // Khi connect database tren mongoose thành công thì ta mới chạy server
    // Bên dưới là đoạn code để khởi chạy server
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("err", err);
  });

// Viet route
// khi truy cập vào đường dẫn http://localhost:5000/ thì res trên server sẽ trả về success
// app.get('/', (req, res) => {
//   res.send('success');
// });

// Muốn route đó dc chạy qua cors()
// app.use('/home', cors()); => https://localhost:5000/home sẽ luôn chạy qua cors()

// khi server chạy thành công thì console.log sẽ in ra
// app.listen(PORT, () => {
//   console.log(`Server is running on ${PORT}`);
// });
