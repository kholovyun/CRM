import styles from "./Сarousel.module.css";
import AliceCarousel from "react-alice-carousel";
import {FunctionComponent, ReactElement} from "react";

type TCarouselBox = {
    text: string,
};
export const Carousel: FunctionComponent<TCarouselBox> = (props): ReactElement => {
    return (
        <div className={styles.carouselBox}>
            <p className={styles.carouselTitle}>{props.text}</p>
            <AliceCarousel
                disableDotsControls responsive={{0: {
                    items: 1,
                    itemsFit: "fill",
                }, 570: {
                    items: 2,
                    itemsFit: "fill",
                }, 790: {
                    items: 3,
                    itemsFit: "fill",
                }, 970: {
                    items: 4,
                    itemsFit: "fill",
                }}}/>
        </div>
    );
};