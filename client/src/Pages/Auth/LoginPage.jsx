import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, TextField, Grid, Paper } from "@material-ui/core";
import { toast } from 'react-toastify';
import { useMutation } from "react-query";
import { Avatar } from "../../components/Common/Avatar/Avatar";
import { Link, useNavigate } from "react-router-dom";
import { $api } from "../../http/authApi";
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
        email: "",
        password: "",
    }

    const navigate = useNavigate();

    const {
        mutate: auth,
        isLoading,
    } = useMutation(
        'Auth',
        (values) =>
            $api({
                url: '/login',
                type: 'POST',
                body: values,
                auth: false,
            }),
            {
                onSuccess(data) {
                    isAuth(data.data.token);
                    navigate('/');
                    toast.success(`🦄 You are logging in!`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }, 
                onError(data) {
                    toast.error(`🦄 ${data.error}`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            }
    )
    const {
        mutate: isAuth,
        isLoading: isAuthLoading,
    } = useMutation(
        'Auth',
        () =>
            $api({
                url: '/me',
                type: 'GET',
                auth: false,
            }),
    )

    const SignupSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string()
            .min(6, "Password must be at least 6 charaters")
            .required("Password is required"),
    });

    const handleSubmit = (values, props) => {
        auth(values);
        setTimeout(() => {
            props.resetForm()
            props.setSubmitting(false)
        }, 200)
    }

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
                            label="email"
                            name="email"
                            type="text"
                            required
                            autoComplete="on"
                            InputProps={{ style: { fontSize: "2vmin" } }}
                            InputLabelProps={{ style: { fontSize: "2vmin" } }}
                        />
                        <ErrorMessage name='email' render={msg => <div className={styles.font_error}>{msg}</div>} />
                        <Field as={TextField}
                            label="password"
                            name="password"
                            type="password"
                            required
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
