import { useEffect, Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Button, TextField, Grid, Paper } from "@material-ui/core";
import { Avatar } from "../Avatar/Avatar";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TModal, TRegisterErrors } from "../../../models/modalType";
import { $authApi } from "../../../service/authService";
import {
    TRegister,
    TRegisterProps,
    TRegisterSuccess,
} from "../../../models/AuthTypes";
import styles from "../../Pages/Auth/RegisterPage.module.scss";
import { useActions } from "../../../hooks/useActions";

export const Modal: React.FC<TModal> = (): JSX.Element => {
    const paperStyle: React.CSSProperties = {
        padding: "3vh",
        margin: "0 auto",
    };
    const formStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        marginTop: "1rem",
    };
    const signBtnStyle: React.CSSProperties = {
        fontSize: "2vmin",
        margin: "1.5rem 8rem 0 8rem",
    };
    const initialValues = {
        fullName: "",
        email: "",
        password: "",
    };

    const navigate = useNavigate();
    const { setModal } = useActions();

    const [
        registerUser,
        {
            data: registerData,
            error: registerError,
            isLoading: registerIsLoading,
            isSuccess: registerSuccess,
        },
    ] = $authApi.useRegisterUserMutation();

    const { data: isAuthData } = $authApi.useIsAuthUserQuery();

    if (registerSuccess && registerData && setModal) {
        localStorage.setItem("token", registerData.token);
        setModal(true);
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

    if (isAuthData) {
        navigate("/");
    }

    useEffect(() => {
        if (
            registerError &&
            "status" in registerError &&
            typeof registerError?.data === "object" &&
            registerError?.data !== null
        ) {
            const data = registerError?.data as TRegisterErrors;
            toast.error(
                `🦄 ${data.errors ? data.errors[0].message : data.error}`,
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }
            );
        }
    }, [registerError]);

    const SignupSchema = Yup.object().shape({
        fullName: Yup.string().required("FullName is required"),
        email: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 charaters")
            .required("Password is required"),
    });

    function onModalActive() {
        console.log(setModal);

        if (setModal) {
            setModal(!modal);
        } else console.log("any");
    }

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

    return (
        <div className={styles.modal_wrapper} onClick={onModalActive}>
            <div
                className={styles.modal_content}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={styles.modal_auth_form}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={SignupSchema}
                        onSubmit={handleSubmit}
                    >
                        <Paper style={paperStyle}>
                            <FontAwesomeIcon
                                className={styles.mark_button}
                                icon={faXmark}
                                onClick={onModalActive}
                            />
                            <Grid>
                                <Avatar />
                                <h2>
                                    Зарегистрируйтесь, чтобы создать новость!
                                </h2>
                            </Grid>
                            <Form style={formStyle}>
                                <Field
                                    as={TextField}
                                    label="FullName"
                                    name="fullName"
                                    type="text"
                                    autoFocus
                                    required
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
                                    autoComplete="password"
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
                                    disabled={registerIsLoading}
                                    style={signBtnStyle}
                                >
                                    <h2 className={styles.font_edit}>
                                        {registerIsLoading
                                            ? "Loading"
                                            : "Sign Up"}
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
                    </Formik>
                </div>
            </div>
        </div>
    );
};
