import React ,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

    if (error) setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form reload

    // Validate fields before sending request
    if (!credentials.username || !credentials.password) {
      setError("Username and password are required!");
      return; // Stop function execution
    }

    

    try {
      const response = await axios.post("http://localhost:3500/users/login", credentials);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        navigate("/admindashbord");
      } else {
        setError("Invalid username or password!");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      console.log("Error:", err);
    }
  };
  return (
   
    <div className="flex h-screen" style={{ width: "100%", display: "flex", flexDirection: "row", height: "100vh" }}>
      {/* Left Section */}
      <div className=""
        style={{
          width: "45%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "white"
        }}>
        <div className="flex flex-col items-center" style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <img
            src="/logo-lg.png"
            alt="PMS Logo"
            className="mb-4"
            style={{
              height: "180px",
              width: "180px"
            }}
          />
          <h1 className="text-xl" style={{ marginTop: "13px", fontSize: "25px", fontWeight: "bold", color: "#044D81" }}>
            PRISON MANAGEMENT SYSTEM
          </h1>
        </div>
      </div>

      {/* Right Section */}
      <div className=""
        style={{
          width: "55%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // backgroundColor: "#f3f4f6"
          backgroundColor:"#044D81"
        }}>
        <div
          className="bg-white shadow-md rounded-lg p-10 border border-gray-300"
          style={{
            width: "70%", height: "400px",
            backgroundColor: "white",
            // boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            borderRadius: "0.5rem",
            padding: "2.5rem",
            border: "1px solid #D1D5DB",
          }}
        >
          <h1 className="text-2xl font-bold text-left text-gray-800 mb-3"
            style={{
              fontSize: "27px",
              fontSize: "1.5rem",
              fontWeight: "bold",
              textAlign: "left",
              color: "#1F2937",
              marginBottom: "0.75rem",
            }}
          >Dear Admin, Welcome Back</h1>
          <p className=" text-left text-gray-500 mb-6"
            style={{
              textAlign: "left",
              color: "#6B7280",
              marginBottom: "1.5rem",
            }}
          >We are excited to see you again!</p>

{error && alert(error)}

          <form onSubmit={handleLogin}>
            <div className="mb-4" style={{ marginBottom: "2px" }}>
              <label className=" text-left block text-gray-600 font-bold text-md mb-1"
                style={{
                  textAlign: "left",
                  display: "block",
                  color: "#4B5563",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  marginBottom: "0.25rem",
                }}
              >Username</label>
              <input
                type="text"
                placeholder="Enter your Username..."
                value={credentials.username}
                onChange={handleChange}
                className='login-inputs'
                name="username"
                style={{
                  width: "100%",
                  padding: "0.5rem 1rem",
                  border: "1px solid #D1D5DB",
                  borderRadius: "0.375rem",
                  backgroundColor:"#f3f4f6",
                  outline: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s"
                }}


              />
            </div>
            <div className="mb-9" style={{ marginBottom: "35px" }}>
              <label className=" text-left block text-gray-600 font-bold text-md mb-1"
                style={{
                  textAlign: "left",
                  display: "block",
                  color: "#4B5563",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  marginBottom: "0.25rem",
                }}>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your Password..."
                className='login-inputs'
                value={credentials.password}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.5rem 1rem",
                  border: "1px solid #D1D5DB",
                  backgroundColor:"#f3f4f6",
                  borderRadius: "0.375rem",
                  outline: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s"
                }}

              />
            </div>
            <div className="flex justify-between" style={{ display: "flex", justifyContent: "space-between" }}>
              <Link to="/">
                <button
                  type="button"
                  className="px-6 py-2 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-200"
                  style={{
                    padding: "0.5rem 1.5rem",
                    border: "1px solid #9CA3AF",
                    borderRadius: "0.375rem",
                    color: "#374151",
                    backgroundColor: "#f3f4f6",
                    transition: "background-color 0.2s"
                  }}

                >
                  Back
                </button>
              </Link>


              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"

                style={{
                  padding: "0.5rem 1.5rem",
                  backgroundColor: "#044D81",
                  color: "white",
                  borderRadius: "0.375rem",
                  transition: "background-color 0.2s",
                  border: "none"
                }}


              >
                Login
              </button>


            </div>
          </form>
        </div>
      </div>
    </div>

  );


};

export default Login;

// onClick={handleLogin}
