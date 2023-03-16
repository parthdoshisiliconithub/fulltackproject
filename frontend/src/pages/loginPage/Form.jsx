import React, { useState } from "react";
import FlexBetween from "../../components/FlexBetween";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
  Alert,
} from "@mui/material";
import { EditOutlined } from "@mui/icons-material";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../store";
import Dropzone from "react-dropzone";
import axios from "axios";
const registerSchema = yup.object({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValueforRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValueLogin = {
  email: "",
  password: "",
};

const FormPage = () => {
  const [pageType, setPagetype] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const { palette } = useTheme();
  const [error, setError] = useState("");
  const register = async (values, { resetForm }) => {
    const formData = new FormData();
    for (var value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);
    // formik.resetForm();
    resetForm();
    await axios
      .post("http://localhost:3001/auth/register", formData)
      .then((data) => {
        if (data) {
          setPagetype("login");
        }
      });
  };

  const login = async (values, { resetForm, setSubmitting }) => {
    resetForm();
    setSubmitting(false);
    await axios
      .post("http://localhost:3001/auth/login", values)
      .then((data) => {
        dispatch(
          setLogin({
            user: data.data.user,
            token: data.data.token,
          })
        );
        navigate("/home");
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) {
      login(values, onSubmitProps);
    } else {
      register(values, onSubmitProps);
    }
  };

  return (
    <>
      <Typography
        fontWeight={"500"}
        variant="h5"
        sx={{
          mb: "1.5rem",
          textAlign: "center",
          color: "#00D5FA",
          fontSize: "50px",
          fontFamily: "fantasy",
        }}
      >
        {isLogin ? "Login" : "Register"}
      </Typography>
      <Formik
        initialValues={isLogin ? initialValueLogin : initialValueforRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap={"30px"}
              gridTemplateColumns={"repeat(4, minmax(0,1fr))"}
              sx={{ "& > div": { gridColumn: isNonMobile ? "" : "span 4" } }}
            >
              {error && (
                <Alert
                  sx={{
                    textAlign: "center",
                    width: "655px",
                    fontSize: "initial",
                  }}
                  severity="error"
                >
                  <strong>{error}</strong>
                </Alert>
              )}

              {isRegister && (
                <>
                  <TextField
                    name="firstName"
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    error={
                      Boolean(touched.firstName) && Boolean(errors.firstName)
                    }
                    helperText={touched.firstName && errors.firstName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    name="lastName"
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    error={
                      Boolean(touched.lastName) && Boolean(errors.lastName)
                    }
                    helperText={touched.lastName && errors.lastName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label="Location"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                    name="location"
                    error={
                      Boolean(touched.location) && Boolean(errors.location)
                    }
                    helperText={touched.location && errors.location}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    label="Occupation"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.occupation}
                    name="occupation"
                    error={
                      Boolean(touched.occupation) && Boolean(errors.occupation)
                    }
                    helperText={touched.occupation && errors.occupation}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <Box
                    gridColumn="span 4"
                    border={`1px solid ${palette.neutral.medium}`}
                    borderRadius="5px"
                    p="1rem"
                  >
                    <Dropzone
                      acceptedFiles=".jpg,.jpeg,.png"
                      multiple={false}
                      onDrop={(acceptedFiles) =>
                        setFieldValue("picture", acceptedFiles[0])
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={`2px dashed ${palette.primary.main}`}
                          p="1rem"
                          sx={{ "&:hover": { cursor: "pointer" } }}
                        >
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <>
                              <p>Add Picture Here</p>
                            </>
                          ) : (
                            <FlexBetween>
                              <Typography>{values.picture.name}</Typography>
                              <EditOutlined />
                            </FlexBetween>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Box>
                </>
              )}
              <TextField
                name="email"
                label="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              ></TextField>
              <TextField
                label="Password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              ></TextField>
            </Box>
            <Box>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                sx={{
                  m: "2rem 0",
                  p: "1rem",
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  "&:hover": { color: palette.primary.main },
                }}
              >
                {isLogin ? "LOGIN" : "REGISTER"}
              </Button>
              <Typography
                onClick={() => {
                  setError('')
                  setPagetype(isLogin ? "register" : "login");
                  resetForm();
                }}
                sx={{
                  textDecoration: "underline",
                  color: palette.primary.main,
                  "&: hover": {
                    cursor: "pointer",
                    color: palette.primary.light,
                  },
                }}
              >
                {isLogin
                  ? "Don't have an account Please Register"
                  : "Already have an account? Login here"}
              </Typography>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FormPage;
