const RegisterSuccess = {
    _id: "61ca26319536ce2a60ec54f2",
    fullName: "User Test",
    email: "test@test.ru",
    password: "$2a$10$SILGY9XbHXr3aXMQXDEuNe9PkjP5RufOCrMoBPd9mpgy.ISbQEAZu",
    createdAt: "2021-12-27T20:46:41.497Z",
    updatedAt: "2021-12-27T20:46:41.497Z",
    __v: 0,
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWNhMjYzMTk1MzZjZTJhNjBlYzU0ZjIiLCJpYXQiOjE2NDA2MzgyNjQsImV4cCI6MTY0MzIzMDI2NH0.T8wiKcAXFtpkSdeAawYK_JIkiaJACeIHexcdyw-bWnk",
};
const LoginSuccess = {
    _id: "628baec21d48afbf81beec02",
    fullName: "dsadsadas",
    email: "edsassdsa@gmail.com",
    password: "$2a$10$admdD3RYA5QMFI5sM7SrwevPl8MwwncQdZ0pr3yTI.Xszy4213YaO",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MWNhMjYzMTk1MzZjZTJhNjBlYzU0ZjIiLCJpYXQiOjE2NDA2MzgyNjQsImV4cCI6MTY0MzIzMDI2NH0.T8wiKcAXFtpkSdeAawYK_JIkiaJACeIHexcdyw-bWnk",
};
const IsAuth = {
    _id: "61ca26319536ce2a60ec54f2",
    fullName: "Vasya Pupkin",
    email: "test@test.ru",
    createdAt: "2021-12-27T20:46:41.497Z",
    updatedAt: "2021-12-27T20:46:41.497Z",
    __v: 0,
};
const initialLoginValues = {
    email: "",
    password: "",
};
const initialRegisterValues = {
    fullName: "",
    email: "",
    password: "",
};
export type TIsAuth = typeof IsAuth;
export type TLoginProps = typeof initialLoginValues;
export type TRegisterProps = typeof initialRegisterValues;

export type TLogin = {
    email: string;
    password: string;
};
export type TRegister = {
    fullName: string;
    email: string;
    password: string;
};
export type TRegisterSuccess = typeof RegisterSuccess;
export type TLoginSuccess = typeof LoginSuccess;
