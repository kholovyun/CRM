import styles from "./Home.module.css";
import { Container } from "../../components/UI/Container/Container";
import { Button } from "../../components/UI/Button/Button";
import { useNavigate } from "react-router-dom";
import { EButton } from "../../enums/EButton";
import { toast } from "react-toastify";

export const Home = () => {
    const navigator = useNavigate();
    return (
        <Container>
            <div className={styles.home}>
                <div>
                    <h1 className={styles.homeTitle}>Надежный партнер в заботе о Вашем ребенке</h1>
                    <div>
                        <Button name={"Вход"} onclick={() => navigator("/login")} />
                        <Button name={"Подписка ==>"} onclick={() => toast.info("Функционал пока недоступен")} size={EButton.small} />
                    </div>
                </div>
            </div>
        </Container>
    );
};
