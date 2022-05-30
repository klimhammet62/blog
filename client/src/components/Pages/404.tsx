import {useEffect} from "react";
import { useNavigate } from "react-router-dom";

export const Error404: React.FC = (): JSX.Element => {
    const navigate = useNavigate();
     useEffect(() => {
         setTimeout(() => {
             navigate("/");
         }, 2000);
     });
    return (
        <>
            <div>404 page not found</div>
        </>
    );
};
