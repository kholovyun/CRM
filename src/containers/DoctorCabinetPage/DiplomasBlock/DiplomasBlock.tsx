import React, { useState, useRef, createRef, ChangeEvent, useEffect } from "react";
import styles from "./DiplomasBlock.module.css";
import AliceCarousel from "react-alice-carousel";
import { toast } from "react-toastify";
import "./Carousel.css";
import Modal from "../../../components/UI/Modal/Modal";
import AvatarEditor from "react-avatar-editor";
import defaultDiplomaImg from "../../../assets/img/default-diploma.jpg";
import { useCreateDiplomaMutation, useGetDiplomasByDoctorQuery } from "../../../app/services/diplomas";

interface IImageProps {
    image: File | string,
    allowZoomOut: boolean,
    position: {x: number, y: number},
    scale: number,
    borderRadius: number,
    width: number,
    height: number
}

const DiplomasBlock: React.FunctionComponent = (): React.ReactElement => {
    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const {data: diplomas} = useGetDiplomasByDoctorQuery("a05d948b-177e-63e1-0a1c-4120de08ebe1");

    const [createDiploma, 
    ]= useCreateDiplomaMutation();
    

    const [fileName, setFileName] = useState<string>("");
    const editorRef: React.RefObject<AvatarEditor> = createRef();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [imageProps, setImageProps] = useState<IImageProps>({
        image: "",
        allowZoomOut: false,
        position: {x: 0.5, y: 0.5},
        scale: 1,
        borderRadius: 25,
        width: 180,
        height: 266,
    });

    const handlePositionChange = (position: {x: number, y: number}): void => {
        setImageProps(prevState => {
            return {...prevState, position: position};
        });
    };

    const handleScale = (e: ChangeEvent<HTMLInputElement>): void => {
        const scale = Number(e.target.value);
        setRangeValue(scale);
        setImageProps(prevState => {
            return {...prevState, scale: scale};
        });
    };

    const handleNewAvatar = (e: ChangeEvent<HTMLInputElement>): void => {
        e.stopPropagation();
        const file = e.target.files && e.target.files[0];
        if (file) {
            if(file && /\.(jpg|jpeg|png)$/i.test(file.name) && file.size <= 5242880) {
                setImageProps(prevState => {
                    return {...prevState, 
                        image: e.target.files ? e.target.files[0] : ""};
                });
                setFileName(e.target.files && e.target.files[0] ? e.target.files[0].name : "");
            } else if (file.size > 5242880) {
                alert("Слишком большой размер файла");
            } else {
                alert("Пожалуйста выберите соответсвующий формат файла(jpg, jpeg, png)");
            }
        }
    };

    const cancelFileHandler = () => {
        setRangeValue(1);
        setFileName("");
        setImageProps(prevState => {
            return {...prevState, image: "", scale: 1};
        });
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        closeModal();
    };

    const setNewAvatar = async () => {
        if (editorRef.current) {
            const canvasScaled = editorRef.current?.getImageScaledToCanvas();
            await fetch(canvasScaled.toDataURL())
                .then((res) => res.blob())
                .then((blob) => {
                    const file = new File([blob], "sample.png", {type: blob.type});
                    const formData = new FormData();
                    formData.append("url", file);
                    formData.append("doctorId", "a05d948b-177e-63e1-0a1c-4120de08ebe1");
                    createDiploma(formData);
                }
                ).catch((e: Error) => {
                    toast.error(`Ошибка ${e.message}`);
                });
        }
    };

    const [rangeValue, setRangeValue] = useState(1);

    const plusRange = () => {
        if (rangeValue >= 3) return;
        const scale = rangeValue + 0.1;
        setRangeValue(scale); 
        setImageProps(prevState => {
            return {...prevState, scale: scale};
        });
    };

    const minusRange = () => {
        if (rangeValue <= 1) return;
        let scale = rangeValue - 0.1;
        if (scale < 1) scale = 1;
        setRangeValue(scale); 
        setImageProps(prevState => {
            return {...prevState, scale: scale};
        });
    };

    const [diplomasPlus, setDiplomasPlus]= useState((diplomas ?? []).map(el => {
        return  <div className={styles.carouselItem} key={el.id}  role="presentation">
            <img 
                className={styles.diplomaImg}
                onError={(e) => { e.currentTarget.src = defaultDiplomaImg;}}
                src={el?.url !== "" ? `${import.meta.env.VITE_BASE_URL}/uploads/doctorsDiplomas/${el?.url}` : defaultDiplomaImg} alt={"diploma"} />
        </div>; 
    }));

    useEffect(() => {
        setDiplomasPlus([...diplomasPlus,
            <div onClick={openModal} key={"diplomasPlus"} className={`${styles.carouselAddItem} carouselAddItemStop`} role="presentation">
                <div className={styles.carouselAddItemIcon}></div>
            </div>]);
    }, []);
    

    return (
        <div>
            <Modal show={showModal} close={closeModal}>
                <div className={styles.AvatarUploaderBox}>
                    {imageProps.image !== "" &&
                <AvatarEditor 
                    ref={editorRef}
                    scale={imageProps.scale}
                    width={imageProps.width}
                    height={imageProps.height}
                    position={imageProps.position}
                    onPositionChange={handlePositionChange}
                    borderRadius={imageProps.borderRadius}
                    image={imageProps.image}
                    color={[229, 232, 241]}
                    border={0}
                    style={{background: "var(--bg_light_blue)"}}
                /> 
                    }
                    {fileName !== "" ?
                        <div className={styles.rangeInputField}>
                            <div className={styles.rangeMinus} onClick={minusRange}>-</div>
                            <input className={styles.rangeInput}
                                name="scale" 
                                type="range" 
                                onChange={handleScale}
                                min={imageProps.allowZoomOut ? "0.1":"1"}
                                max="3" step="0.01"
                                value={rangeValue}
                            />
                            <div className={styles.rangePlus} onClick={plusRange}>+</div>
                        </div> : null
                    }
                          
                    <label className={styles.inputLabel}>
                        <input type="file" onChange={handleNewAvatar} className={styles.avatarInput} ref={fileInputRef}/> 
                        <p className={styles.avatarBtn}>Выбрать картинку</p>
                    </label>
                    {fileName !== "" ? <span className={styles.fileName}>{fileName}</span> : null}
                    <div className={styles.avatarButtons}>
                        <button 
                            onClick={cancelFileHandler} className={styles.avatarBtn}>Отмена</button> 
                        <button 
                            disabled={fileName !== "" ? false : true}
                            onClick={setNewAvatar} className={styles.avatarBtn}>Установить</button> 
                    </div>                 
                </div>
            </Modal>
            <div className={styles.carouselBlock}>
                <p className={styles.carouselBlockTitle}>Сертификаты о дополнительном образовании</p>
                <div className={styles.carouselBox}>
                    <AliceCarousel disableDotsControls responsive={{800: {
                        items: 4,
                        itemsFit: "contain",
                    }}} items={diplomasPlus}/>
                </div>
            </div>
        </div>
    );
};

export default DiplomasBlock;