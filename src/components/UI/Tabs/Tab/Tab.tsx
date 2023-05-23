import ITabProps from "./ITabProps";
import styles from "./Tab.module.css";

const Tab: React.FunctionComponent<ITabProps> = ({children}: ITabProps): React.ReactElement => {
    return (
        <div className={styles.content_item}>{children}</div>
    );
};

export default Tab;