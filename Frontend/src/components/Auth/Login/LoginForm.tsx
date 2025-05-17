import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormWrapper from "../components/FormWrapper";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import { loginUser } from "../../../services/api";

function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  // Validation function
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) return;

    try {
      const response = await loginUser({ email, password });
      
      // More robust token handling
      if (response.token) {
        // Set secure, httpOnly cookie
        document.cookie = `token=${response.token}; path=/; secure; samesite=strict`;
        
        // Optional: Store in localStorage as backup
        localStorage.setItem('userToken', response.token);
        
        navigate("/home");
      } else {
        setErrors({ form: "Login failed. Please try again." });
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setErrors({ 
        form: err.response?.data?.message || "An unexpected error occurred" 
      });
    }
  }

  return (
    <div className="p-12">
      <FormWrapper title="Login" handleSubmit={handleSubmit}>
        <EmailInput 
          email={email} 
          handleEmail={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}           errors={errors} 
        />
        <PasswordInput
          password={password}
          handlePassword={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}          showPassword={showPassword}
          handlePasswordVisibility={() => setShowPassword(!showPassword)}
          errors={errors}
        />
        {errors.form && (
          <p className="text-red-500 text-sm">{errors.form}</p>
        )}
        <p>
          Don't have an account? <a href="/register" className="text-blue-500 underline">Sign Up</a>
        </p>
      </FormWrapper>
    </div>
  );
}

export default LoginForm;
