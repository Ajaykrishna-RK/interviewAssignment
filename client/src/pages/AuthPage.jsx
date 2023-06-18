import { Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLogin } from '../redux/showSlice'

function AuthPage() {

  const dispatch = useDispatch()

const navigate = useNavigate()
    const [auth,setAuth] = useState(false)
const [registerValues,setRegisterValues] = useState({
    name:"",
    email:"",
    password:"",
})
const [loginValues,setLoginValues] = useState({
    email:"",
    password:""
})

const handleChangeRegister = (e)=>{
setRegisterValues({...registerValues,[e.target.name]:e.target.value})
}
const handleChangeLogin = (e)=>{
    setLoginValues({...loginValues,[e.target.name]:e.target.value})
}

const Register = async ()=>{
    try{
       
            const registerApi = await fetch("http://localhost:3001/auth/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(registerValues),
            });
      const response = await registerApi.json()
      
if(registerApi.ok){
  alert("Registration Successfull")
  setAuth(false)
}else{
  alert(response.error)
}

    }catch(err){
console.log(err)
    }
} 

const Login = async ()=>{
    try{
       
            const loginApi = await fetch("http://localhost:3001/auth/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(loginValues),
            });
      const response = await loginApi.json()

     
      

   if(loginApi.ok){
    dispatch(setLogin(response))
   
    navigate('/')
   }else{
    alert(response.error)
   }
    }catch(err){
console.log(err)
    }
} 

const handleSubmit = async (e) =>{
    e.preventDefault()
{auth ? Register() : Login() } 
}




  return (
    <div style={{justifyContent:"center",alignItems:"center",display:"grid", marginTop:"5%"}}>


   <Card sx={{ width:"100%",paddingTop:5 ,}}>
   {auth ? <Typography sx={{textAlign:"center"}} variant='h4'>Register</Typography>: <Typography sx={{textAlign:"center"}} variant='h4'>Login</Typography>}  

   {auth ?  <CardContent>
        <form onSubmit={handleSubmit}>

        <TextField fullWidth label="name" value={registerValues.name} name='name' onChange={(e)=>handleChangeRegister(e)}  id="fullWidth" />

        <TextField fullWidth label="Email" value={registerValues.email} name='email' sx={{marginTop:"15px"}} onChange={(e)=>handleChangeRegister(e)} id="fullWidth" />

        <TextField fullWidth label="password" value={registerValues.password} name='password' sx={{marginTop:"15px"}} onChange={(e)=>handleChangeRegister(e)} id="fullWidth" />
        <div style={{justifyContent:"center",alignItems:"center",display:"grid",marginTop:"15px"}}>
        <Button type='submit' variant="contained"> Register </Button>
</div>

        </form>
      </CardContent> : <CardContent>
        <form onSubmit={handleSubmit}>


        <TextField fullWidth label="Email"  value={loginValues.email} name='email'   onChange={(e)=>handleChangeLogin(e)}  id="fullWidth" />

        <TextField fullWidth label="password" value={loginValues.password} name='password' sx={{marginTop:"15px"}} onChange={(e)=>handleChangeLogin(e)} id="fullWidth" />
<div style={{justifyContent:"center",alignItems:"center",display:"grid",marginTop:"15px"}}>
<Button type='submit'variant="contained">Login </Button>
</div>


        </form>
      </CardContent>  }   
   
   <Typography  onClick={()=>setAuth(!auth)} sx={{fontSize:"14px",textAlign:"center",cursor:"pointer"}}>
    
  {auth ? "Already Have an Account ? Login" : "Dont have an account ? Register"}  
    
     </Typography>


    </Card>


    </div>
  )
}

export default AuthPage