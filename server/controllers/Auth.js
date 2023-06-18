import Useers from "../model/UserModel.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

export const RegisterUser = async (req,res)=>{
    try{
const {name,email,password} = req.body
const salt = await bcrypt.genSalt()
const passwordHash = await bcrypt.hash(password, salt);

const register = await Useers.create({
name,
email,
password:passwordHash
})

return res.status(200).json(register)

    }catch(err){
      return res.status(500).json({ error: err.message });
    }
}


export const Login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await Useers.findOne({email})
  
      if (!user) return res.status(400).json({ error: "USer Does Not Exist" })
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ error: "invalid crendentials" })
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
  
    return  res.status(200).json({ token, user });
    } catch (err) {
     return res.status(500).json({ error: err.message });
    }
  };