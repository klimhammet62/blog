import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, TextField, Grid, Paper } from "@material-ui/core";
import { useMutation } from "react-query";
import { Avatar } from "../../components/Common/Header/Avatar";
import { Link, useNavigate } from "react-router-dom";
import { $api } from "../../store/api/api";
import { toast } from 'react-toastify';
import styles from "./RegisterPage.module.scss";


export const RegisterPage = () => {
    const GridStyle = {
        marginTop: "14vh",
        fontSize: "2vmin",
    }
    const paperStyle = {
        padding: "3vmin",
        height: "32rem",
        width: "60vh",
        margin: "0 auto",
    };
    const formStyle = {
        fontSize: "2vmax",
        display: "flex", flexDirection: "column", aligItems: "stretch",
    };
    const backbtnstyle = { fontSize: "2vmin", margin: "2rem 10vw 0 10vw" };
    const signbtnstyle = { fontSize: "2vmin", margin: "3vh 6vw 0 6vw" };

    const initialValues = {
        fullName: "",
        email: "",
        password: "",
    }

    const navigate = useNavigate();

    const {
        mutate: register,
        isLoading,
        isSuccess,
        error
    } = useMutation(
        'Registration',
        (values) =>
            $api({
                url: '/register',
                type: 'POST',
                body: values,
                auth: false
            }),
        {
            onSuccess(data) {
                localStorage.setItem('token', data.data.token);
            }
        });

    const SignupSchema = Yup.object().shape({
        fullName: Yup.string()
            .required("FullName is required"),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string()
            .min(6, "Password must be at least 6 charaters")
            .required("Password is required"),
    });

    const handleSubmit = (values, props) => {
        register(values);
        setTimeout(() => {
            props.resetForm()
            props.setSubmitting(false)
        }, 200)
    }

    useEffect(() => {
        if (isSuccess) {
            navigate("/creater");
            toast.success('🦄 You are logging in!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                type: "light"
            });
        }
    }, [isSuccess])

    const handleChange = (e) => {
        e.preventDefault();
    };
    return (
        <>
            <Formik initialValues={initialValues}
                validationSchema={SignupSchema}
                onSubmit={handleSubmit}
            >
                <Grid style={GridStyle}>
                    <Paper style={paperStyle}>
                        <Grid align="center">
                            <Avatar sx={{ display: 'flex', alignItems: 'center', marginRight: '0' }} />
                            <h2>Зарегистрируйтесь, чтобы создать новость!</h2>
                        </Grid>
                        <Form style={formStyle}>
                            <Field as={TextField}
                                label="FullName"
                                name="fullName"
                                type="text"
                                required
                                InputProps={{ style: { fontSize: "2vmin" } }}
                                InputLabelProps={{ style: { fontSize: "2vmin" } }}
                                onCut={handleChange}
                                onCopy={handleChange}
                                onPaste={handleChange}
                            />
                            <ErrorMessage name='fullName' render={msg => <div className={styles.font_error}>{msg}</div>} />
                            <Field as={TextField}
                                label="email"
                                name="email"
                                type="text"
                                required
                                InputProps={{ style: { fontSize: "2vmin" } }}
                                InputLabelProps={{ style: { fontSize: "2vmin" } }}
                                onCut={handleChange}
                                onCopy={handleChange}
                                onPaste={handleChange}
                            />
                            <ErrorMessage name='email' render={msg => <div className={styles.font_error}>{msg}</div>} />
                            <Field as={TextField}
                                label="password"
                                name="password"
                                type="password"
                                required
                                InputProps={{ style: { fontSize: "2vmin" } }}
                                InputLabelProps={{ style: { fontSize: "2vmin" } }}
                                onCut={handleChange}
                                onCopy={handleChange}
                                onPaste={handleChange}
                            />
                            <ErrorMessage name='password' render={msg => <div className={styles.font_error}>{msg}</div>} />
                            <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                                disabled={isLoading}
                                style={signbtnstyle}
                            >
                                <h2 className={styles.font_edit}>{isLoading ? "Loading" : "Sign Up"}</h2>
                            </Button>
                            <Link to="/"><h2 className={styles.font_edit}>Forgot password?</h2></Link>
                            <h2 className={styles.font_edit}>Do you have an account?</h2>
                            <Link to="/login"><h2 className={styles.font_edit}>Sign In</h2></Link>
                            <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                                style={backbtnstyle}
                                disabled={isLoading}
                            >
                                <Link to="/" className={styles.link}>Home</Link>
                            </Button>
                        </Form>
                    </Paper>
                </Grid>
            </Formik>
        </>
    );
};
