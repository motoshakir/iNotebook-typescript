import React,{useState} from 'react'
//import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hook';
import { signupAsync } from '../features/auth/authThunks';


function SignUp() {
    // Define the interface for credentials
    interface Credential {
        name: string;
        email: string;
        password: string;
        cpassword: string;
    }

    // Initialize the state with all properties in the interface
    const [credentials, setCredentials] = useState<Credential>({
        name: '',
        email: '',
        password: '',
        cpassword: '',  // Added missing properties
    });

    const dispatch = useAppDispatch();

    //let navigate =  useNavigate();

    // Handle change in the input fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,  // Update the corresponding field
        });
    };

    // Handle form submission
     const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();  // Prevent form default behavior

         //const { name, email, password } = credentials;
         
         dispatch(signupAsync(credentials));

        // try {
        //     const response = await axios.post('http://localhost:5000/api/auth/createuser', {
        //         name,
        //         email,
        //         password,
        //     });

        //     const json = response.data;  // Access the data directly from the response

        //     console.log(json);
        //     dispatch(login(json));

        //     if (json.success) {
        //         // Save the auth token in localStorage
                
        //         localStorage.setItem('token', json.authtoken);
        //         localStorage.setItem('name', json.name);

        //         // Redirect to the "addnote" page
        //        // navigate("/addnote");
        //     } else {
        //         // Handle unsuccessful response (e.g., show error message)
        //         console.error("Error:", json.message || "An error occurred");
        //     }
        // } catch (error) {
        //     // Handle any error that occurs during the request
        //     console.error("Request failed:", error);
        // }
    };


    return (
        // <div>
            
        //     <h2>Sign Up</h2>
        //     <form onSubmit={handleSubmit}>
        //         <input
        //             type="text"
        //             name="name"
        //             value={credentials.name}
        //             onChange={handleChange}
        //             placeholder="Name"
        //         />
        //         <input
        //             type="email"
        //             name="email"
        //             value={credentials.email}
        //             onChange={handleChange}
        //             placeholder="Email"
        //         />
        //         <input
        //             type="password"
        //             name="password"
        //             value={credentials.password}
        //             onChange={handleChange}
        //             placeholder="Password"
        //         />
        //         <input
        //             type="password"
        //             name="cpassword"
        //             value={credentials.cpassword}
        //             onChange={handleChange}
        //             placeholder="Confirm Password"
        //         />
        //         <button type="submit">Sign Up</button>
        //     </form>
        // </div>  
        <section className="vh-100" style={{ backgroundColor: "#eee"}}>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-lg-12 col-xl-11">
        <div className="card text-black" style={{borderRadius: "25px"}}>
          <div className="card-body p-md-5">
            <div className="row justify-content-center">
              <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form className="mx-1 mx-md-4">

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div data-mdb-input-init className="form-outline flex-fill mb-0">
                      <input type="text" id="name" name="name" className="form-control"  value={credentials.name} onChange={handleChange}/>
                      <label className="form-label" htmlFor="name">Your Name</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div data-mdb-input-init className="form-outline flex-fill mb-0">
                      <input type="email" id="email" name="email" className="form-control" value={credentials.email} onChange={handleChange}/>
                      <label className="form-label" htmlFor="email">Your Email</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div data-mdb-input-init className="form-outline flex-fill mb-0">
                      <input type="password" id="password" name="password" className="form-control" value={credentials.password} onChange={handleChange}/>
                      <label className="form-label" htmlFor="password">Password</label>
                    </div>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div data-mdb-input-init className="form-outline flex-fill mb-0">
                      <input type="password" id="confirm-password" name="cpassword" className="form-control" value={credentials.cpassword} onChange={handleChange}/>
                      <label className="form-label" htmlFor="confirm-password">Repeat your password</label>
                    </div>
                  </div>

                  <div className="form-check d-flex justify-content-center mb-5">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                    <label className="form-check-label" htmlFor="form2Example3">
                      I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                  </div>

                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg">Register</button>
                  </div>

                </form>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  className="img-fluid" alt="Sample"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
       
    );
}

export default SignUp;