import React from "react";
import { userRegisterForm } from "../../../contexts/RegisterFormContext";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import ConfirmPasswordInput from "../components/ConfirmPasswordInput";
import FormWrapper from "../components/FormWrapper";

function RegisterForm() {
 const {
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
 } = userRegisterForm();

  // Enhanced error display
  return (
    <div className="p-12">
      <FormWrapper title="Register" handleSubmit={handleSubmit}>
        <EmailInput 
          email={email} 
          handleEmail={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}           errors={errors} 
        />
        <PasswordInput
          password={password}
          handlePassword={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          showPassword={showPassword}
          handlePasswordVisibility={() => setshowPassword(!showPassword)}
          errors={errors}
        />
        <ConfirmPasswordInput
          confirmPassword={confirmPassword}
          handleConfirmPassword={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}          errors={errors}
        />
        {errors.form && (
          <p className="text-red-500 text-sm">{errors.form}</p>
        )}
        <p>
          Already have an account? <a href="/login" className="underline text-blue-500">Log In</a>
        </p>
      </FormWrapper>
    </div>
  );
}

export default RegisterForm;
