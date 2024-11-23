import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";

const adminLogin = async(req, res) => {
    const { data } = req.body;
    console.log(req.body)
    try {
        const admin = await Admin.findOne({ username : data.username });
        if (!admin) {
            return res.status(401).json({ error: "Admin not found" });
        }
        if (admin.password !== data.password) {
            return res.status(401).json({ error: "Invalid password" });
        }
        const token = jwt.sign({ admin }, process.env.JWT_SECRET);
          res.cookie('token', token, {
      httpOnly: true,      
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'Strict',   
      maxAge: 3600000,      
    });
        res.status(200).json({
            success: true,
            message: "Admin login successfully",
            token,
            admin,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const addAdmin = async(req, res) => {
    try {
        let newAdmin = new Admin({ ...req.body});
        await newAdmin.save();
        res.status(201).json({ message: "Admin created successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message , message: "Admin not created" });
    }
}   

const listAdmin = async(req, res) => {
    try {
        const admin = await Admin.find();
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}   

const removeAdmin = async(req, res) => {
    const { id } = req.params;
    try {
        const admin = await Admin.findByIdAndDelete(id);
        res.status(200).json({ admin });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateAdmin = async(req, res) => {
    const { id } = req.params;
    try {
        const admin = await Admin.findByIdAndUpdate(id, { ...req.body });
        res.status(200).json({ admin });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}   

const admindetail = async(req,res) => {
    const { id } = req.params;
       try {
        const admin = await Admin.findOne({_id:id});
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const logout = async(req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successfully" });
}   

export default {
    adminLogin,
    addAdmin,
    listAdmin,
    removeAdmin,
    updateAdmin,
    admindetail,
    logout
};
