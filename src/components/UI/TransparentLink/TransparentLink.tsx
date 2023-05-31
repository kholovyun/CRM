import { NavLink } from "react-router-dom";
import ITransparentLinkProps from "./ITransparentLinkProps";
import styles from "./TransparentLink.module.css";

const TransparentLink: React.FC<ITransparentLinkProps> = (props: ITransparentLinkProps): React.ReactElement => {
    return (
        <NavLink to={props.pathTo} className={`${styles.transparent_link} ${styles[props.size || ""]}`}>
            {props.title}
        </NavLink>
    );
};

export default TransparentLink;