import { useState, useEffect } from "react";
import * as Yup from "yup";
import {
    Grid,
    Paper,
    TextField,
    Button,
    Typography,
} from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/dispatchHook";
import { toast } from 'react-toastify';
import { Avatar } from "../../components/Header/Avatar";
import styles from './LoginPage.module.scss';
import { useIsAuthUserMutation, useSignUpUserMutation } from "../../store/api/authApi";
import registerSlice from "../../store/slices/registerSlice";


export const RegisterPage = ({ }) => {
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
    const backbtnstyle = { margin: "3vh 0 40" };

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [signUpUser, { data, isLoading, isSuccess, isError }] =
        useSignUpUserMutation();
    const [IsAuthUser, {isAuth}] =
        useIsAuthUserMutation();

    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");

    const [timeDebounce, setTimeDebounce] = useState(null);

    const debounceEmail = email => {
        if (timeDebounce) clearTimeout(timeDebounce);
        setTimeDebounce(setTimeout(() => setEmail(email), 750));
    };
    const debounceFullName = fullName => {
        if (timeDebounce) clearTimeout(timeDebounce);
        setTimeDebounce(setTimeout(() => setFullName(fullName), 750));
    };
    const debouncePassword = password => {
        if (timeDebounce) clearTimeout(timeDebounce);
        setTimeDebounce(setTimeout(() => setPassword(password), 750));
    };
    const validationSchema = Yup.object().shape({
        fullName: Yup.string()
            .email("please enter valid email")
            .required("Required"),
        password: Yup.string().required("Required"),
    });

    const handleChange = (e) => {
        e.preventDefault();
    };
    useEffect(() => {
        if (isSuccess) {
            dispatch(registerSlice.getUser({ fullName: data.fullName, email: data.email, password: data.password }));
            toast.success("You signed up!");
            navigate("/");
            localStorage.setItem("token", data.token);

        };
    }, [isSuccess])

    return (
        <Formik
            initialValues={{ fullName: "", email: "", password: "" }}
            onSubmit={(values) => {
                dispatch(signUpUser({ ...values }));
            }}
            validationSchema={validationSchema}
        >
            <Grid style={GridStyle}>
                <Paper style={paperStyle}>
                    <Grid align="center">
                        <Avatar sx={{ display: 'flex', alignItems: 'center', marginRight: '0' }} />
                        <h2>Зарегистрируйтесь, чтобы создать новость!</h2>
                    </Grid>
                    <Form>
                        <Field
                            as={TextField}
                            label="FullName"
                            name="FullName"
                            placeholder="Enter last name"
                            onChange={e => {
                                debounceFullName(e.target.value);
                                console.log(fullName);
                            }}
                            onCut={handleChange}
                            onCopy={handleChange}
                            onPaste={handleChange}
                            type="FullName"
                            fullWidth
                            required
                            autoComplete="off"
                            helperText={<ErrorMessage name="FullName" />}
                        />
                        <Field
                            as={TextField}
                            label="Email"
                            name="Email"
                            placeholder="Enter email"
                            onChange={e => {
                                debounceEmail(e.target.value);
                                console.log(email);
                            }}
                            type="Email"
                            fullWidth
                            required
                            helperText={<ErrorMessage name="Email" />}
                        />
                        <Field
                            as={TextField}
                            label="Password"
                            name="Password"
                            placeholder="Enter password"
                            onChange={e => {
                                debouncePassword(e.target.value);
                                console.log(password);
                            }}
                            onCut={handleChange}
                            onCopy={handleChange}
                            onPaste={handleChange}
                            type="Password"
                            fullWidth
                            required
                            autoComplete="off"
                            helperText={<ErrorMessage name="Password" />}
                        />
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            disabled={isLoading}
                            style={loginbtnstyle}
                            fullWidth
                        >
                            {isLoading ? "Loading" : "Sign Up"}
                        </Button>
                    </Form>

                    <Typography>
                        <Link to="/">Forgot password ?</Link>
                    </Typography>
                    <Typography>
                        Do you have an account?<Link to="/login">Sign In</Link>
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
        </Formik>
    );
};
