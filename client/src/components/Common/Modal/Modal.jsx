import { FC, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, TextField, Grid, Paper } from "@material-ui/core";
import { Avatar } from "../Avatar/Avatar";
import { useMutation } from "react-query";
import { $api } from "../../../store/api/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import styles from "../../../Pages/Auth/RegisterPage.module.scss";

export const Modal = ({ modal, setModal }) => {
    const GridStyle = {
        fontSize: "2vh",
        height: "40vh",
        width: "40vw",

    };
    const paperStyle = {
        padding: "3vh",
        margin: "0 auto",
    };
    const formStyle = {
        display: "flex", flexDirection: "column", aligItems: "stretch", marginTop: "1rem"
    };
    const signbtnstyle = { fontSize: "2vmin", margin: "1.5rem 8rem 0 8rem", };
    const initialValues = {
        fullName: "",
        email: "",
        password: "",
    };

    const navigate = useNavigate();

    const {
        mutate: register,
        isLoading,
        isSuccess,
        error,
    } = useMutation(
        "Registration",
        (values) =>
            $api({
                url: "/register",
                type: "POST",
                body: values,
                auth: false,
            }),
        {
            onSuccess(data) {
                localStorage.setItem("token", data.data.token);
            },
        }
    );

    const SignupSchema = Yup.object().shape({
        fullName: Yup.string().required("FullName is required"),
        email: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 charaters")
            .required("Password is required"),
    });

    useEffect(() => {
        if (isSuccess) {
            navigate("/");
            setModal(!modal);
            toast.success('🦄 You are registered!', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }, [isSuccess])
    useEffect(() => {
        if(error){
            setModal(!modal);
            toast.error(`🦄 ${error}`, {
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

    function onModalActive() {
        setModal(!modal);
    }

    const handleSubmit = (values, props) => {
        register(values);
        setTimeout(() => {
            props.resetForm();
            props.setSubmitting(false);
        }, 200);
    };

    const handleChange = (e) => {
        e.preventDefault();
    };

    return (
        <div className={styles.modal_wrapper} onClick={onModalActive}>
            <div className={styles.modal_content} onClick={e => e.stopPropagation()}>
                <div className={styles.modal_auth_form}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={SignupSchema}
                        onSubmit={handleSubmit}
                    >
                        <Grid style={GridStyle}>
                            <Paper style={paperStyle}>
                                <FontAwesomeIcon
                                    className={styles.mark_button}
                                    icon={faXmark}
                                    onClick={onModalActive}
                                />
                                <Grid align="center">
                                    <Avatar
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            marginRight: "0",
                                        }}
                                    />
                                    <h2>
                                        Зарегистрируйтесь, чтобы создать
                                        новость!
                                    </h2>
                                </Grid>
                                <Form style={formStyle}>
                                    <Field
                                        as={TextField}
                                        label="FullName"
                                        name="fullName"
                                        type="text"
                                        required
                                        InputProps={{
                                            style: { fontSize: "2vmin" },
                                        }}
                                        InputLabelProps={{
                                            style: { fontSize: "2vmin" },
                                        }}
                                        onCut={handleChange}
                                        onCopy={handleChange}
                                        onPaste={handleChange}
                                    />
                                    <ErrorMessage
                                        name="fullName"
                                        render={(msg) => (
                                            <div className={styles.font_error}>
                                                {msg}
                                            </div>
                                        )}
                                    />
                                    <Field
                                        as={TextField}
                                        label="email"
                                        name="email"
                                        type="text"
                                        required
                                        InputLabelProps={{
                                            style: { fontSize: "2vmin" },
                                        }}
                                        onCut={handleChange}
                                        onCopy={handleChange}
                                        onPaste={handleChange}
                                    />
                                    <ErrorMessage
                                        name="email"
                                        render={(msg) => (
                                            <div className={styles.font_error}>
                                                {msg}
                                            </div>
                                        )}
                                    />
                                    <Field
                                        as={TextField}
                                        label="password"
                                        name="password"
                                        type="password"
                                        required
                                        InputProps={{
                                            style: { fontSize: "2vmin" },
                                        }}
                                        InputLabelProps={{
                                            style: { fontSize: "2vmin" },
                                        }}
                                        onCut={handleChange}
                                        onCopy={handleChange}
                                        onPaste={handleChange}
                                    />
                                    <ErrorMessage
                                        name="password"
                                        render={(msg) => (
                                            <div className={styles.font_error}>
                                                {msg}
                                            </div>
                                        )}
                                    />
                                    <Button
                                        type="submit"
                                        color="primary"
                                        variant="contained"
                                        disabled={isLoading}
                                        style={signbtnstyle}
                                    >
                                        <h2 className={styles.font_edit}>
                                            {isLoading ? "Loading" : "Sign Up"}
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
                                        <h2 className={styles.font_edit}>
                                            Sign In
                                        </h2>
                                    </Link>
                                </Form>
                            </Paper>
                        </Grid>
                    </Formik>
                </div>
            </div>
        </div>
    );
};
