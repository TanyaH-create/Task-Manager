// MainPage.tsx 
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "../components/LoginModal";
import ResetPassword from "./ResetPassword";
//import logo from "../assets/images/Logo.png";
import logo from "../assets/images/logo_tm.png"
import AuthService from "../utils/authService"; // Import AuthService to check token

function MainPage () {
  //toggle between registration and login form in same modal
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
  // State for reset password form visibility
  const [isResetPasswordMode, setIsResetPasswordMode] = useState<boolean>(false);

  //states for Quote API
  const [zenQuote, setZenQuote] = useState<string | null>(null);
  const [author, setAuthor] = useState<string | null>(null);
  //const [authorDate, setAuthorDate] = useState<string | null>(null);

  const navigate = useNavigate() as (path:string) => void;  //to navigate to the dashboard upon login

  useEffect(() => {
    // If the user is already logged in, redirect to the dashboard
    if (AuthService.loggedIn()) {
      console.log('Already logged in')
      navigate("/dash");
    }
  }, [navigate]);

  //ZEN GARDEN
  // Fetch Zen quote
  //on render deploy add the render 
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

  useEffect(() => {
    const fetchZenQuote = async () => {
      try {
        console.log("MAin Page Fetching qote from:", `${API_BASE_URL}/zen-quote`);
        const response = await fetch(`${API_BASE_URL}/zen-quote`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Main Page Fetched Zen Quote:", data);
        if (data) {
          setZenQuote(data.quote);
          setAuthor(data.author);
        }
      } catch (error) {
        console.error("Error fetching Zen quote:", error);
        setZenQuote("Could not load Zen quote at the moment.");
      }
    };
  
    fetchZenQuote();
  }, []);

  const handleLoginSuccess = () => {
    // After a successful login, navigate to the dashboard
    console.log('Change to the Dash Page')
    navigate("/dash");
  };
  
  const toggleMode = () => {
    setIsLoginMode(!isLoginMode)
  };

  const handleForgotPasswordClick = () => {
    setIsLoginMode(false); // Switch to register mode (if needed)
    setIsResetPasswordMode(true); // Show the reset password form
  };



  return (
    <>
     <main className="main-container d-flex">
      <div className='left-side'>
         <img 
             src= { logo }  
             alt="logo" 
             className="logo" 
             />
      </div>
      <div className="right-side p-5">
        <div 
           className="login-container" 
           style={{ 
               border: '4px solid black', 
               borderRadius: '10px', // Rounded corners
               padding: '20px', // Space between the inputs and the border
               
            }}>
        <h2>
            {isResetPasswordMode ? "Reset Password" : 
            isLoginMode ? "Welcome Back!" : "Create an Account"}
          </h2>

        {/* Conditionally render Login, Register, or Reset Password */}
          {isResetPasswordMode ? (
            <ResetPassword onCancel={() => setIsResetPasswordMode(false)} />
          ) : (
            <LoginModal
              isLoginMode={isLoginMode}
              onLoginSuccess={handleLoginSuccess}
              onForgotPassword={handleForgotPasswordClick}
            />
          )}
          <p>
               {isLoginMode ? "Don't have an account? " : "Already have an account? "}
               <span className="auth-toggle" onClick={toggleMode}>
                  {isLoginMode ? "Register Here" : "Login Here"}
               </span>            
         </p>
        </div>

          {/* Display Zen quote */}
          {zenQuote && (
            <div className="zen-quote-box mt-4">
              <h3>Zen Quote of the Day</h3>
              <p>"{zenQuote}"</p>
              {author && <p>- {author}</p>}
           {/*   {authorImage && <img src={authorImage} alt={author ? author: "Zen author"} className="author-image" />} */}
            </div>
          )}

     
      {/* Attribution */}
      <footer className="quote-attribution">
        Inspirational quotes provided by{" "}
        <a href="https://zenquotes.io/" target="_blank" rel="noopener noreferrer">
          ZenQuotes API
        </a>
      </footer>
      </div>
     </main>
    </>
  )
}

export default MainPage;