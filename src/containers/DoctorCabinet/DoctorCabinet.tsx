import { useEffect } from "react";
import { Container } from "../../components/UI/Container/Container";
import styles from "./DoctorCabinet.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/authSlice";

export const DoctorCabinet = () => {
    const { user } = useAppSelector(state => state.auth);
    const dispatcher = useAppDispatch();
    const navigator = useNavigate();

    useEffect(() => {
        !user && navigator("/");
    }, [user]);

    return (
        <Container>
            <div className={styles.doctorCabinet}>
                <h1>DoctorCabinet</h1>
                <button onClick={() => dispatcher(logout())}>Logout</button>
            </div>
        </Container>
    );
};
