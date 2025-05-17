import React from 'react'
import styles from "../Register/RegisterForm.module.css";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";

function PasswordInput({password,handlePassword,showPassword,handlePasswordVisibility,errors}) {
  return (
    <div className="form-group relative">
      <label htmlFor="password">Password</label>
      <input
        type={showPassword ? "text" : "password"}
        id="password"
        required
        value={password}
        className={styles.input}
        onChange={handlePassword}
      />
      <span
        onClick={handlePasswordVisibility}
        className="absolute bottom-3 right-3 cursor-pointer"
      >
        {showPassword ? (
          <VscEye className="visible" />
        ) : (
          <VscEyeClosed className="visible" />
        )}
      </span>
      {errors.password && <p className={styles.error}>{errors.password}</p>}
    </div>
  );
}

export default PasswordInput