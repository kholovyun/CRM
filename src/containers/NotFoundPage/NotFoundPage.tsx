import { FunctionComponent, ReactElement } from "react";
import styles from "./NotFoundPage.module.css";
import {Container} from "../../components/UI/Container/Container";

const NotFoundPage: FunctionComponent = (): ReactElement => {
    return (<div className={styles.bg}>
        <Container>
            <h2 className={styles.title}>404</h2>
            <h3 className={styles.subTitle}>Ничего не найдено...</h3>
            <p className={styles.btn}>Проверьте ссылку</p>
            <p>Или, <a href="/">нажмите сюда</a> чтобы вернуться назад.</p>
        </Container>

    </div>);
};

export default NotFoundPage;
