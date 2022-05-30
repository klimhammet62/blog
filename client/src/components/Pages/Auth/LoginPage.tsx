import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Button, TextField, Grid, Paper } from "@material-ui/core";
import { toast } from "react-toastify";
import { Avatar } from "../../Common/Avatar/Avatar";
import { Link, useNavigate } from "react-router-dom";
import { $authApi } from "../../../service/authService";
import { TLoginSuccess, TLogin, TLoginProps } from "../../../models/AuthTypes";
import styles from "./LoginPage.module.scss";

export const LoginPage: React.FC = (): JSX.Element => {
    const paperStyle: React.CSSProperties = {
        padding: "3vmin",
        height: "30rem",
        width: "30rem",
        margin: "8% auto",
    };
    const formStyle: React.CSSProperties = {
        fontSize: "2vmax",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
    };
    const backBtnStyle: React.CSSProperties = {
        fontSize: "2vmin",
        margin: "2rem 10vw 0 10vw",
    };
    const signBtnStyle: React.CSSProperties = {
        fontSize: "2vmin",
        margin: "3vh 6vw 0 6vw",
    };
    const initialValues = {
        email: "",
        password: "",
    };

    const navigate = useNavigate();
    const [
        loginUser,
        {
            data: loginData,
            isLoading: loginIsLoading,
            error: LoginError,
            isSuccess: isLoginSuccess,
        },
    ] = $authApi.useLoginUserMutation();

    if (isLoginSuccess && loginData) {
        navigate("/");
        toast.success(`🦄 You are logging in!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    if (LoginError) {
        toast.error(`🦄 ${LoginError}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const SignupSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 charaters")
            .required("Password is required"),
    });

    const handleSubmit = async (
        values: TLogin,
        props: FormikHelpers<TLoginProps>
    ) => {
        await loginUser({ ...values } as TLoginSuccess);
        setTimeout(() => {
            props.resetForm();
            props.setSubmitting(false);
        }, 200);
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
        >
            <Paper style={paperStyle}>
                <Grid>
                    <Avatar />
                    <h2>Войдите в аккаунт, чтобы создать новость!</h2>
                </Grid>
                <Form style={formStyle}>
                    <Field
                        as={TextField}
                        label="email"
                        name="email"
                        type="text"
                        required
                        autoComplete="email"
                    />
                    <ErrorMessage
                        name="fullName"
                        render={(msg) => (
                            <div className={styles.font_error}>{msg}</div>
                        )}
                    />
                    <Field
                        as={TextField}
                        label="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="password"
                    />
                    <ErrorMessage
                        name="password"
                        render={(msg) => (
                            <div className={styles.font_error}>{msg}</div>
                        )}
                    />
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        disabled={loginIsLoading}
                        style={signBtnStyle}
                    >
                        <h2 className={styles.font_edit}>
                            {loginIsLoading ? "Loading" : "Sign In"}
                        </h2>
                    </Button>
                    <Link to="/">
                        <h2 className={styles.font_edit}>Forgot password?</h2>
                    </Link>
                    <h2 className={styles.font_edit}>Don't have an account?</h2>
                    <Link to="/register">
                        <h2 className={styles.font_edit}>Sign Up</h2>
                    </Link>
                    <Link to="/" className={styles.link}>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            style={backBtnStyle}
                            disabled={loginIsLoading}
                        >
                            Home
                        </Button>
                    </Link>
                </Form>
            </Paper>
        </Formik>
    );
};
