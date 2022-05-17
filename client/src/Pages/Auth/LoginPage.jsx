import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, TextField, Grid, Paper } from "@material-ui/core";
import { toast } from 'react-toastify';
import { useMutation } from "react-query";
import { Avatar } from "../../components/Common/Avatar/Avatar";
import { Link, useNavigate } from "react-router-dom";
import { $api } from "../../store/api/api";
import styles from "./LoginPage.module.scss";

export const LoginPage = () => {
    const GridStyle = {
        marginTop: "14vh",
        fontSize: "2vmin",
    }
    const paperStyle = {
        padding: "3vmin",
        height: "30rem",
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
        password: "",
    }

    const navigate = useNavigate();

    const {
        mutate: auth,
        isLoading,
        error,
    } = useMutation(
        'Auth',
        () =>
            $api({
                url: '/login',
                type: 'POST',
                body: { ...initialValues },
                auth: false,
            }),
    )

    const SignupSchema = Yup.object().shape({
        fullName: Yup.string()
            .required("FullName is required"),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string()
            .min(6, "Password must be at least 6 charaters")
            .required("Password is required"),
    });

    useEffect(() => {
        if (error) {
            toast('🦄 Auth error!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
}
    }, [error])

    const handleSubmit = (values, props) => {
        console.log(values);
        auth();
        setTimeout(() => {
            props.resetForm()
            props.setSubmitting(false)
        }, 200)
    }

    const handleChange = (e) => {
        e.preventDefault();
    };

    return (
        <Formik initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
        >
            <Grid style={GridStyle}>
                <Paper style={paperStyle}>
                    <Grid align="center">
                        <Avatar sx={{ display: 'flex', alignItems: 'center', marginRight: '0' }} />
                        <h2>Войдите в аккаунт, чтобы создать новость!</h2>
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
                            <h2 className={styles.font_edit}>{isLoading ? "Loading" : "Sign In"}</h2>
                        </Button>
                            <Link to="/"><h2 className={styles.font_edit}>Forgot password?</h2></Link>
                            <h2 className={styles.font_edit}>Don't have an account?</h2>
                            <Link to="/register"><h2 className={styles.font_edit}>Sign Up</h2></Link>
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
    );
};
