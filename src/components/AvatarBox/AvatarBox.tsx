import { FunctionComponent, ReactElement, useState } from "react";
import styles from "./AvatarBox.module.css";
import AvatarUploader from "./AvatarUploader/AvatarUploader";
import Modal from "../UI/Modal/Modal";
import defaultDoctorImg from "../../assets/img/default-doctor.svg";
import defaultChildImg from "../../assets/img/default-child-photo.svg";
import { ERoles } from "../../enums/ERoles";

interface IAvatarBoxProps {
    avatar: string
    id: string
    role: ERoles
    width: number
    height: number
}

const AvatarBox: FunctionComponent<IAvatarBoxProps> = (props): ReactElement => {
    const defaultImg = props.role === ERoles.DOCTOR ? defaultDoctorImg : defaultChildImg;
    const imgSrc = props.role === ERoles.DOCTOR ? "doctorsImgs" : props.role === ERoles.CHILD ? "childrenImgs" : "doctorsImgs";
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const editAvatarModalCloser = () => {
        setShowAvatarModal(false);
    };
    return (
        <>
            <Modal show={showAvatarModal} close={editAvatarModalCloser}>
                <AvatarUploader 
                    role = {props.role}
                    id = {props.id}
                    width={props.width}
                    height={props.height}
                    modalCloser={editAvatarModalCloser}
                />
            </Modal>
            <div 
                className={styles.avatar}
                style={{width: `${props.width}px`, height: `${props.height}px`}}
            >
                <div className={styles.backdrop} onClick={() => {setShowAvatarModal(true);}}></div>
                {props.avatar !== undefined ? 
                    <img 
                        className={styles.avatarImg}
                        onError={(e) => { e.currentTarget.src = defaultImg;}}
                        src={props.avatar !== "" ? `${import.meta.env.VITE_BASE_URL}/uploads/${imgSrc}/${props.avatar}` : defaultImg} alt={"avatar"}
                    /> : <img className={styles.doctorImage} src={defaultImg} alt={"avatar"}/>
                }
            </div>
        </>
        
    );
};

export default AvatarBox;