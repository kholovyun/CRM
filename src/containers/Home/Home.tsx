import styles from "./Home.module.css";
import btnStyles from "../../components/UI/Button/Button.module.css";
import { Container } from "../../components/UI/Container/Container";

export const Home = () => {
    return (
        <Container>
            <div className={styles.home}>
                <div>
                    <h1>Надежный партнер в заботе о Вашем ребенке</h1>
                    <div>
                        <a href="/login" className={btnStyles.bigBtn}>Вход</a>
                        <a href="/login">Подписка {"--->"}</a>
                    </div>
                </div>
                <div className={styles.image}>
                    IMG
                </div>
            </div>
        </Container>
    );
};
