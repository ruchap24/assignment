import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { registerUser } from "../services/api";

// Enhanced schema with more detailed validation
const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  confirmPassword: z.string(),
});

type FormErrors = Record<string, string>;

type RegisterFormContextType = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  errors: FormErrors;
  showPassword: boolean;
  setshowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const RegisterFormContext = createContext<RegisterFormContextType | undefined>(
  undefined,
);

export const RegisterFormProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showPassword, setshowPassword] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    try {
      // Validate entire form data
      schema.parse({ 
        email, 
        password, 
        confirmPassword 
      });
      return true;
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        const errorMap: {[key: string]: string} = {};
        validationError.errors.forEach(err => {
          errorMap[err.path[0]] = err.message;
        });
        setErrors(errorMap);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset previous errors
    setErrors({});
    setIsSubmitting(true);

    // Validate form before submission
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    // Passwords match validation
    if (password !== confirmPassword) {
      setErrors({ 
        confirmPassword: "Passwords do not match" 
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const userData = { 
        email, 
        password, 
        confirmPassword 
      };
      
      console.log("Attempting Registration:", userData);
      
      const response = await registerUser(userData);
      
      console.log("Registration Successful:", response);
      
      // Optional: Show success message
      setErrors({
        form: "Registration successful! Redirecting to login..."
      });
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err: any) {
      console.error("Registration Error:", err);
      
      // More detailed error handling
      setErrors({
        form: err.message || "Registration failed. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RegisterFormContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        errors,
        showPassword,
        setshowPassword,
        handleSubmit,
      }}
    >
      {children}
    </RegisterFormContext.Provider>
  );
};

export const userRegisterForm = () => {
  const context = useContext(RegisterFormContext)
  if (!context) {
     throw new Error(
       "useRegisterForm must be used within a RegisterFormProvider",
     );
  }
  return context
}