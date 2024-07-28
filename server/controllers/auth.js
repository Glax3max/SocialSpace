import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../model/User.js"  //Creating User.js in model file

/* Register User*/

export const register = async(req,res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;
        
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt);
        
        const newUser = new User({
            firstName,
            lastName,
            email,
            password:passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile:Math.floor(Math.random() * 10000),
            impression:Math.floor(Math.floor()*10000)
        })

        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json({error:err.message});
    }
};

/*Logging IN*/ 

export const login = async(req,res) => {
    try {
        const  {email,password} = req.body
        const user = await User.findOne({email:email})
        if(!user) return res.status(400).json({msg:"User does not exist"})
        /*Here we are using mongooo try to find the one specific email*/ 
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({msg:"Wrong password Try Again!!"});
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);

        delete user.password;
        res.status(200).json({token,user})
    } catch (err) {
        res.status(500).json({error:err.message});
    }      
}
