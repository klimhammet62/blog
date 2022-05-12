import React, { useEffect, useState } from "react";
import {
    Grid,
    Paper,
    TextField,
    Button,
    Typography,
} from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Avatar } from "../../components/Header/Avatar";
import { useLoginUserMutation } from "../../store/api/authApi";
import { toast } from 'react-toastify';
import { useAppDispatch } from "../../store/dispatchHook";
import { setUser } from "../../store/slices/userSlice";
import styles from './LoginPage.module.scss';
import axios from "axios";

export const LoginPage = ({ }) => {
    const GridStyle = {
        paddingTop: 80,
    }
    const paperStyle = {
        padding: 20,
        height: "73vh",
        width: 300,
        margin: "0 auto",
    };
    const loginbtnstyle = { margin: "8px 0" };
    const backbtnstyle = { margin: "6vh 0" };

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [LoginUser, { data, isError, isSuccess }] =
        useLoginUserMutation();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [timeDebounce, setTimeDebounce] = useState(null);

    const debounceUsername = username => {
        if (timeDebounce) clearTimeout(timeDebounce);
        setTimeDebounce(setTimeout(() => setUsername(username), 350));
    };
    const debouncePassword = password => {
        if (timeDebounce) clearTimeout(timeDebounce);
        setTimeDebounce(setTimeout(() => setPassword(password), 350));
    };
    const handleChange = (e) => {
        e.preventDefault();
    };

    useEffect(() => {
        if (data && data.token) {
            localStorage.setItem("login",
                JSON.stringify({
                    userlogin: true,
                    token: data.token,
                })
            );
        }
        setUsername('');
        setPassword('');
    }, [data, isError])

    if (isError) {
        toast.error("Account does not exist");
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .email("please enter valid email")
            .required("Required"),
        password: Yup.string().required("Required"),
    });

    /* const onSubmit = async (values, props, e) => {
        e.preventDefault();
        LoginUser({ username, password })
        setTimeout(() => {
            props.resetForm();
            props.setSubmitting(false);
        }, 2000);
    }; */

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:5656/api/auth/login", {
                email,
                password,
            })
            .then((response) => {
                console.log("response", response);
                localStorage.setItem(
                    "login",
                    JSON.stringify({
                        userLogin: true,
                        token: response.data.access_token,
                    })
                );
                setError("");
                setEmail("");
                setPassword("");
                setLogoutUser(false);
                history.push("/");
            })
            .catch((error) => setError(error.response.data.message));
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success("User Login Succesfully!");
            dispatch(setUser({ token: data.token, name: data.name }));
            navigate('/')
            localStorage.setItem("token", data.token);
        }
    }, [isSuccess])

    return (
        <div>
            <Grid style={GridStyle}>
                <Paper style={paperStyle}>
                    <Grid align="center">
                        <Avatar sx={{ display: 'flex', alignItems: 'center', marginRight: '0' }} />
                        <h2>Зайдите в аккаунт, чтобы создать новость!</h2>
                    </Grid>
                    <Formik
                        onSubmit={handleLoginSubmit}
                        validationSchema={validationSchema}
                    >
                        {(props) => (
                            <Form>
                                <Field
                                    as={TextField}
                                    label="Username"
                                    name="username"
                                    onChange={e => {
                                        debounceUsername(e.target.value);
                                    }}
                                    placeholder="Enter username"
                                    fullWidth
                                    required
                                    onCut={handleChange}
                                    onCopy={handleChange}
                                    onPaste={handleChange}
                                    helperText={<ErrorMessage name="username" />}
                                />
                                <Field
                                    as={TextField}
                                    label="Password"
                                    name="password"
                                    onChange={e => {
                                        debouncePassword(e.target.value);
                                    }}
                                    placeholder="Enter password"
                                    type="password"
                                    fullWidth
                                    required
                                    onCut={handleChange}
                                    onCopy={handleChange}
                                    onPaste={handleChange}
                                    helperText={<ErrorMessage name="password" />}
                                />
                                <Button
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    disabled={props.isSubmitting}
                                    style={loginbtnstyle}
                                    fullWidth
                                >
                                    {props.isSubmitting ? "Loading" : "Sign in"}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                    <Typography>
                        <Link to="/">Forgot password?</Link>
                    </Typography>
                    <Typography>
                        Don't have an account?
                        <Link to="/register">Sign Up</Link>
                    </Typography>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        style={backbtnstyle}
                    ><Link to="/" className={styles.link}>Home</Link>
                    </Button>
                </Paper>
            </Grid>
        </div >

    );
};