import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hook';
import { loginAsync } from '../features/auth/authThunks';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import "./css/Login.css"

function Login() {

    interface Credentials {
        email: string;
        password: string;
    }

    const [credentials, setCredentials] = useState<Credentials>({
        email: "",
        password: "",
    })

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";
    const auth = useAppSelector((state) => state.auth);


   
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 
        const result = await dispatch(loginAsync(credentials));
        try {
            if (loginAsync.fulfilled.match(result)) {
                navigate(from, { replace: true });
            } else {
                console.error('Login failed:', result.payload);
            }
        } catch (error) {
             console.error('Unexpected error:', error);
        }
    }

     const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
      setCredentials({...credentials, [e.target.name]: e.target.value})
     }
  
   if (auth.token) {
      return <Navigate to="/" />;
    }
      

  return (
//     <div className="mt-3">
//             <h2>Login to continue in iNotebook</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                     <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
//                     <input type="email" className="form-control" value={credentials.email} id="email" name="email"  onChange={onChange} aria-describedby="emailHelp" />
//                     <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
//                     <input type="password" className="form-control"  value={credentials.password} id="password" name="password" onChange={onChange}/>
//                 </div>
//                 <button type="submit" className="btn btn-primary" >Submit</button>
//           </form>
//           <div className="mt-3">
//   <p>
//     Do not have an account?{' '}
//     <Link to="/signup" className="btn btn-link">
//       Please register
//     </Link>
//   </p>
// </div>
      //         </div>
      
<section className="vh-100">
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="img-fluid" alt="Sample"/>
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form>
          <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
            <p className="lead fw-normal mb-0 me-3">Sign in with</p>
            <button  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-floating mx-1">
              <i className="fab fa-facebook-f"></i>
            </button>

            <button  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-floating mx-1">
              <i className="fab fa-twitter"></i>
            </button>

            <button  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-floating mx-1">
              <i className="fab fa-linkedin-in"></i>
            </button>
          </div>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">Or</p>
          </div>


          <div data-mdb-input-init className="form-outline mb-4">
            <input type="email" id="email" name="email" className="form-control form-control-lg"
              placeholder="Enter a valid email address" onChange={onChange}/>
            <label className="form-label" htmlFor="email">Email address</label>
          </div>


          <div data-mdb-input-init className="form-outline mb-3">
            <input type="password" id="password" name="password" className="form-control form-control-lg"
              placeholder="Enter password" onChange={onChange} />
            <label className="form-label" htmlFor="password">Password</label>
          </div>

          <div className="d-flex justify-content-between align-items-center">
        
            <div className="form-check mb-0">
              <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
              <label className="form-check-label" htmlFor="remember-me">
                Remember me
              </label>
            </div>
            <a href="#!" className="text-body">Forgot password?</a>
          </div>

          <div className="text-center text-lg-start mt-4 pt-2">
                              <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg" onClick={handleSubmit}
                                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>Login</button>
            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? </p>
                               <Link to="/signup" className="btn btn-link">
      Please register
    </Link>
          </div>

        </form>
      </div>
    </div>
  </div>
  <div
    className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">

    <div className="text-white mb-3 mb-md-0">
      Copyright © 2020. All rights reserved.
    </div>
   
    <div>
      <a href="#!" className="text-white me-4">
        <i className="fab fa-facebook-f"></i>
      </a>
      <a href="#!" className="text-white me-4">
        <i className="fab fa-twitter"></i>
      </a>
      <a href="#!" className="text-white me-4">
        <i className="fab fa-google"></i>
      </a>
      <a href="#!" className="text-white">
        <i className="fab fa-linkedin-in"></i>
      </a>
    </div>
 
  </div>
</section>
  )
}

export default Login