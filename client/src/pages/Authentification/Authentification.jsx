import React, {useState} from "react";
import './Authentification.css'
import Logo from '../../img/sample.jpg'
import {useDispatch, useSelector} from 'react-redux'
import { signUp , logIn} from "../../actions/AuthAction";


const Authentification = () =>{
  const dispatch = useDispatch()
  const loading = useSelector((state)=>state.authReducer.loading)
  const [isSignUp, setIsSignUp] = useState(true);
  console.log(loading)
  const [data , setData] = useState({
      firstname: '',
      lastname: '',
      password: '',
      confirmpass: '', 
      username: ''
  })

  const [confirmPass, setConfirmPass] = useState(true)

  const handleChange = (e)=>{
    setData({...data,[e.target.name]: e.target.value})
  } 

const handleSubmit = (e)=>{
  e.preventDefault()

  if(isSignUp){
    data.password === data.confirmpass 
    ? dispatch(signUp(data)) : setConfirmPass(false);
    } else{
      dispatch(logIn(data))
    }
  }


const resetForm = () =>{
  setConfirmPass(true);
  setData({firstname: '',
      lastname: '',
      password: '',
      confirmpass: '', 
      username: '',
    })
}

return (
    <div className="Authentification">
      <div className="a-left">
      <div className="Webname">
      <h1>DocConnect</h1>
     
      
        </div>
      </div>

    
   
    {/*   Right side  */}
    <div className="a-right">
      <form className="infoForm authForm" onSubmit={handleSubmit}>
        <h3>{isSignUp ? "Sign up" : "Log in"}</h3>

     

        {isSignUp &&   
        <div>
            <input
              type="text"
              placeholder="First Name"
              className="infoInput"
              name="firstname"
              onChange = {handleChange}
                   value={data.firstname}
              />
              <input
              type="text"
              placeholder="Last Name"
              className="infoInput"
              name="lastname"
              onChange = {handleChange}
                   value={data.lastname}
              /></div>
      }
        

        <div>
          <input
            type="text"
            className="infoInput"
            name="username"
            placeholder="Usernames"
            onChange = {handleChange}
                 value={data.username}
          />
        </div>

        <div>
          <input
            type="password"
            className="infoInput"
            name="password"
            placeholder="Password"
              onChange = {handleChange}
              value={data.password}
          />
          {isSignUp &&
           <input
            type="password"
            className="infoInput"
            name="confirmpass"
            placeholder="Confirm Password"
              onChange = {handleChange}
                   value={data.confirmpass}
          />
       
          }
          </div>
          <span
            style={{
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
              display: confirmPass ? "none" : "block",
            }}
          >
            *Confirm password is not same
          </span>
          <div>
            <span
              style={{
                fontSize: "12px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                resetForm();
                setIsSignUp((prev) => !prev);
              }}
            >
              {isSignUp
                ? "Already have an account Login"
                : "Don't have an account Sign up"}
            </span>
            <button
              className="button infoButton"
              type="Submit"
              disabled={loading}
            >
              {loading ? "Loading..." : isSignUp ? "SignUp" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Authentification