import { FunctionComponent, ReactElement } from "react";
import defaultImage from "../../assets/img/icon_children_sidebar.svg";
import styles from "./ChildCabinetPage.module.css";
import { Container } from "../../components/UI/Container/Container";

export const ChildCabinetPage: FunctionComponent = (): ReactElement => {
    return (
        <Container>
            <img className={styles.childPageIcon} src={defaultImage} alt="babyIcon" />
            <h1 className={styles.childPageTitle}>Страничка находиться на стадии разработки</h1>
        </Container>
    );
};
