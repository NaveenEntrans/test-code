import { useState } from "react";
// import ConfirmPasswordComponent from "../../components/Login/confirmPasswordComponent";
import ConfirmPasswordComponent from "../../components/Login/ConfirmPasswordComponent";

export const ConfirmPassword = () => {

  const [newPassword,setNewPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')

  return (
    <div>
      <ConfirmPasswordComponent 
      newPassword = {newPassword}
      setNewPassword = {setNewPassword}
      confirmPassword = {confirmPassword}
      setConfirmPassword = {setConfirmPassword}
      />
    </div>
  );
};
