import { useNavigate } from "react-router-dom"
import SignUp from "../components/SignUp/SignUp"
import { useSelector } from "react-redux";
import { useEffect } from "react";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [navigate, isAuthenticated])


  return (
    <SignUp />
  )
}

export default SignUpPage 