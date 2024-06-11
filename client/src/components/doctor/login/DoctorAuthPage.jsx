import { Box, TextField, Button, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedIn, setUser, setRole } from "../../../Store/authSlice";
import axios from "axios";
import toast from "react-hot-toast";

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesLogin = {
  email: "",
  password: "",
};

const headers = {
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
};

const DoctorAuthPage = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const login = async (values, onSubmitProps) => {
    try {
      const response = await axios.post("/doctor/login", values, { headers });
      if (response.status === 200) {
        toast.success("Login Successful");
        dispatch(setIsLoggedIn({ isLoggedIn: true }));
        dispatch(setUser({ user: response.data.user }));
        dispatch(setRole({ role: "doctor" }));
        Navigate(`/doctor/${response.data.doctor._id}/dashboard`);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        toast.error(error.response.data.msg);
      } else {
        toast.error("An error occurred during login.");
      }
    }
  };

  const submitFormHandler = async (values, onSubmitProps) => {
    await login(values, onSubmitProps);
  };

  return (
    <>
      <Formik
        onSubmit={submitFormHandler}
        initialValues={initialValuesLogin}
        validationSchema={loginSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: "url(/images/Hospital.jpg)",
                backgroundSize: "cover", // Optional: ensures the image covers the entire element
                backgroundPosition: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  background: "rgba(255, 255, 255, 0.53)",
                  borderRadius: "16px",
                  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(7.3px)",
                  WebkitBackdropFilter: "blur(7.3px)", // Note the camelCase for WebKit prefix
                  padding: "5rem 3rem",
                }}
              >
                <Typography sx={{ marginBottom: "1rem" }}>
                  Doctor's Login
                </Typography>
                <Box>
                  <TextField
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    fullWidth
                    sx={{
                      marginBottom: "1rem",
                    }}
                  />
                </Box>
                <Box>
                  <TextField
                    label="Password"
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={
                      Boolean(touched.password) && Boolean(errors.password)
                    }
                    helperText={touched.password && errors.password}
                    fullWidth
                    sx={{
                      marginBottom: "1rem",
                    }}
                  />
                </Box>

                <Button
                  fullWidth
                  type="submit"
                  variant="outlined"
                  sx={{
                    m: "2rem 0",
                    p: "1rem",
                  }}
                >
                  LOGIN
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default DoctorAuthPage;
