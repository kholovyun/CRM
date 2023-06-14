import styles from "./Сarousel.module.css";
// import AliceCarousel from "react-alice-carousel";
import { FunctionComponent, ReactElement } from "react";
import {CardTitle} from "../UI/ParrentUi/CardTitle/CardTitle.tsx";

type TCarouselBox = {
    text: string,
};
export const Carousel: FunctionComponent<TCarouselBox> = ({text}): ReactElement => {
    // const [showModal, setShowModal] = useState(false);
    // const openModal = () => {
    //     setShowModal(true);
    // };
    // const closeModal = () => {
    //     setShowModal(false);
    // };

    // const items = [
    //     <div  key={"Abc"} className={styles.carouselAddItem}>
    //         <div className={styles.carouselAddItemIcon}></div>
    //     </div>]
    // ;
    //     .concat(massive && massive.map(el => {
    //     return  <div className={styles.carouselItem} key={el.id}>
    //         <img
    //             className={styles.diplomaImg}
    //             onError={(e) => { e.currentTarget.src = defaultChildImg;}}
    //             src={el?.photo !== "" ? `${import.meta.env.VITE_BASE_URL}/uploads/childrenImgs/${el?.photo}` : defaultChildImg} alt={"childPicture"} />
    //     </div>;
    // }));

    return (
        <div className={styles.carouselBox}>
            <CardTitle title={text} />
        </div>
    );
};