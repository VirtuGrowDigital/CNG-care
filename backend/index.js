import express from "express";
import bodyParser from "body-parser";
import connectDb from "./connectDb.js";
import userControl from "./controler/userControl.js";
import adminControl from "./controler/adminControl.js";
import productControl from "./controler/productControl.js";
import orderControl from "./controler/orderControl.js";
import cors from "cors";
import path from "path";
import multer from "multer";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"
dotenv.config();

const { userLogin, signup, sendOtp, listUser, removeUser } = userControl;
const { adminLogin, addAdmin, listAdmin, removeAdmin, updateAdmin , admindetail,logout} =
  adminControl;
const {
  addProduct,
  listProduct,
  removeProduct,
  updateProduct,
  listSingleProduct,
} = productControl;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const fileExtension = path.extname(file.originalname).toLowerCase();
    const allowedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

    if (allowedExtensions.includes(fileExtension)) {
      cb(null, Date.now() + fileExtension);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
});

// connect to database
connectDb();

//constants
const upload = multer({ storage: storage });
const app = express();

//middlewares
app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const port = process.env.PORT || 4000;
// User routes
app.post("/user/login", userLogin);
app.get("/user/all-users", listUser);
app.post("/user/register", signup);
app.delete("/user/remove-user/:id", removeUser);
app.post("/user/send-otp", sendOtp);

// Admin routes
app.post("/admin/login", adminLogin);
app.post("/admin/add-admin", addAdmin);
app.get("/admin/list-admin", listAdmin);
app.get("/admin/admindetail/:id", admindetail);
app.delete("/admin/remove-admin/:id", removeAdmin);
app.put("/admin/update-admin/:id", updateAdmin);
app.get("/admin/all-users", listUser);
app.post("/admin/logout", logout);

//Order Routes
app.post("/order/add-order", orderControl);

//Product routes
app.post("/product/add-product", upload.array("images", 12), addProduct);
app.get("/product/list-product", listProduct);
app.get("/product/get-product/:id", listSingleProduct);
app.delete("/product/remove-product/:id", removeProduct);
app.put("/product/update-product/:id", updateProduct);

app.listen(port, () => {
  console.log(
    `Server started on port ${
      port
    } and URL is ${`http://localhost:${port}`}`
  );
});
