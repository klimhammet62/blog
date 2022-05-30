import { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Button, TextField, Grid, Paper } from "@material-ui/core";
import { Avatar } from "../../Common/Avatar/Avatar";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { $authApi } from "../../../service/authService";
import {
    TRegisterSuccess,
    TRegister,
    TRegisterProps,
} from "../../../models/AuthTypes";
import styles from "./RegisterPage.module.scss";

export const RegisterPage: React.FC = (): JSX.Element => {
    const paperStyle: React.CSSProperties = {
        padding: "3vmin",
        height: "32rem",
        width: "40rem",
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
        margin: "2vh 10vw 0 16vw",
    };
    const signbtnstyle: React.CSSProperties = {
        fontSize: "2vmin",
        margin: "3vh 6vw 0 6vw",
    };
    const initialValues = {
        fullName: "",
        email: "",
        password: "",
    };

    const navigate = useNavigate();
    const [
        registerUser,
        {
            data: registerData,
            error: registerError,
            isSuccess: registerSuccess,
            isLoading: registerIsLoading,
        },
    ] = $authApi.useRegisterUserMutation();

   if (registerSuccess && registerData) {
       localStorage.setItem("token", registerData.token);
       navigate("/");
       toast.success("🦄 You are registered!", {
           position: "bottom-right",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
       });
   }
/* ПРИ РЕГЕ РАБОТАЕТ ПРИ ВХОДЕ НЕТ */
    if (registerError) {
        toast.error(`🦄 ${registerError.data.error}`, {
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
        fullName: Yup.string().required("FullName is required"),
        email: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 charaters")
            .required("Password is required"),
    });

    const handleSubmit = async (
        values: TRegister,
        props: FormikHelpers<TRegisterProps>
    ) => {
        await registerUser({ ...values } as TRegisterSuccess);
        setTimeout(() => {
            props.resetForm();
            props.setSubmitting(false);
        }, 200);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
    };
    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={SignupSchema}
                onSubmit={handleSubmit}
            >
                <Paper style={paperStyle}>
                    <Grid>
                        <Avatar />
                        <h2>Зарегистрируйтесь, чтобы создать новость!</h2>
                    </Grid>
                    <Form style={formStyle}>
                        <Field
                            as={TextField}
                            label="FullName"
                            name="fullName"
                            type="text"
                            required
                            onCut={handleChange}
                            onCopy={handleChange}
                            onPaste={handleChange}
                            autoComplete="fullName"
                        />
                        <ErrorMessage
                            name="fullName"
                            render={(msg) => (
                                <div className={styles.font_error}>{msg}</div>
                            )}
                        />
                        <Field
                            as={TextField}
                            label="email"
                            name="email"
                            type="text"
                            required
                            onCut={handleChange}
                            onCopy={handleChange}
                            onPaste={handleChange}
                            autoComplete="email"
                        />
                        <ErrorMessage
                            name="email"
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
                            onCut={handleChange}
                            onCopy={handleChange}
                            onPaste={handleChange}
                            autoComplete="current-password"
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
                            disabled={registerIsLoading}
                            style={signbtnstyle}
                        >
                            <h2 className={styles.font_edit}>
                                {registerIsLoading ? "Loading" : "Sign Up"}
                            </h2>
                        </Button>
                        <Link to="/">
                            <h2 className={styles.font_edit}>
                                Forgot password?
                            </h2>
                        </Link>
                        <h2 className={styles.font_edit}>
                            Do you have an account?
                        </h2>
                        <Link to="/login">
                            <h2 className={styles.font_edit}>Sign In</h2>
                        </Link>
                        <Link to="/" className={styles.link}>
                            <Button
                                color="primary"
                                variant="contained"
                                style={backBtnStyle}
                                disabled={registerIsLoading}
                            >
                                Home
                            </Button>
                        </Link>
                    </Form>
                </Paper>
            </Formik>
        </>
    );
};
