import { useState, useRef, useEffect, FormEvent, ChangeEventHandler, FunctionComponent, ReactElement } from "react";
import styles from "./DoctorDiplomas.module.css";
import AliceCarousel from "react-alice-carousel";
import "./Carousel.css";
import "react-alice-carousel/lib/alice-carousel.css";
import Modal from "../../../components/UI/Modal/Modal";
import defaultDiplomaImg from "../../../assets/img/default-diploma-photo.svg";
import { useCreateDiplomaMutation } from "../../../app/services/diplomas";
import IDiplomaCreateDto from "../../../interfaces/IDiploma/IDiplomaCreateDto";
import IDoctorDiplomasProps from "./IDoctorDiplomasProps";
import { toast } from "react-toastify";
import { errorHandler } from "../../../helpers/errorHandler";
import { fileToDataString } from "../../../helpers/fileToDataString";

const DoctorDiplomas: FunctionComponent<IDoctorDiplomasProps> = ({diplomas, id}): ReactElement => {
    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
    };

    const [showFullImageModal, setShowFullImageModal] = useState(false);
    const openFullImageModal = () => {
        setShowFullImageModal(true);
    };
    const closeFullImageModal = () => {
        setShowFullImageModal(false);
    };

    const initStateValues: IDiplomaCreateDto = {
        doctorId: id,
        url: undefined
    };
    const [inputValues, setInputValues] = useState<IDiplomaCreateDto>(initStateValues);
    const [previewImageSrc, setPreviewImageSrc] = useState<string>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const [createDiploma, {isError, isSuccess, error}] = useCreateDiplomaMutation();

    const [clickedImage, setClickedImage] = useState<string>("");
    useEffect(() => {
        isError && errorHandler(error);
    }, [isError]);

    useEffect(() => {
        isSuccess && toast.info("Сертификат создан");
    }, [isSuccess]);

    
    const handleClick = (url: string) => {
        openFullImageModal();
        setClickedImage(url);
    };

    const items = (diplomas && diplomas.map(el => {
        return  <div className={styles.carouselItem} key={el.id} onClick={() => {handleClick(el.url);}}>
            <img 
                className={styles.diplomaImg}
                onError={(e) => { e.currentTarget.src = defaultDiplomaImg;}}
                src={el?.url !== "" ? `${import.meta.env.VITE_BASE_URL}/uploads/doctorsDiplomas/${el?.url}` : defaultDiplomaImg} alt={"diploma"} />
        </div>; 
    }));

    const handleChangeFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if(file && /\.(jpg|jpeg|png)$/i.test(file.name) && file.size <= 5242880) {
            try {
                setPreviewImageSrc(await fileToDataString(file));
                setFileName(e.target.files && e.target.files[0] ? e.target.files[0].name : "");
                setInputValues(prevState => {
                    return {
                        ...prevState,
                        url: e.target.files ? e.target.files[0] : undefined
                    };
                }); 
            } catch (e) {
                console.error(e);
            }
        } else if (file.size > 5242880) {
            alert("Слишком большой размер файла");
        } else {
            alert("Пожалуйста выберите соответсвующий формат файла(jpg, jpeg, png)");
        }
    };

    const cancelFileHandler = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        setFileName("");
        closeModal();
    };

    const [fileName, setFileName] = useState<string>("");

    const uploadNewDiploma = async (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(inputValues).forEach(entry => {
            const [key, value] = entry;
            formData.append(key, value);
        });
        await createDiploma(formData);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        setFileName("");
        setInputValues(initStateValues);
        closeModal();
    };

    

    return (
        <div>
            <Modal show={showFullImageModal} close={closeFullImageModal}>
                <div className={styles.fullImage}>
                    <img
                        onError={(e) => { e.currentTarget.src = defaultDiplomaImg;}}
                        src={clickedImage !== "" ? `${import.meta.env.VITE_BASE_URL}/uploads/doctorsDiplomas/${clickedImage}` : defaultDiplomaImg} alt={"diploma"} />
                </div>
            </Modal>
            <Modal show={showModal} close={closeModal}>
                <div className={styles.diplomaUploaderBox}>
                    {fileName !== "" && <div className={styles.previewBox}>
                        <img src={previewImageSrc} alt="diploma" />
                    </div>}
                    <label className={styles.inputLabel}>
                        <input className={styles.diplomaInput} type="file" onChange={handleChangeFile} ref={fileInputRef}/> 
                        <p className={styles.diplomaBtn}>Выбрать файл</p>
                    </label>
                    {fileName !== "" ? <span className={styles.fileName}>{fileName}</span> : null}
                    <div className={styles.diplomaButtons}>
                        <button className={styles.diplomaBtn}
                            onClick={cancelFileHandler}>Отмена</button> 
                        <button 
                            className={styles.diplomaBtn}
                            disabled={fileName !== "" ? false : true}
                            onClick={uploadNewDiploma}>Установить</button> 
                    </div>   
                </div>
            </Modal>

            <div className={styles.carouselBlock}>
                <p className={styles.carouselTitle}>Сертификаты о дополнительном образовании</p>
                <AliceCarousel 
                    responsive={{0: {
                        items: 1,
                        itemsFit: "fill",
                    }, 420: {
                        items: 2,
                        itemsFit: "fill",
                    }, 700: {
                        items: 3,
                        itemsFit: "contain",
                    }, 900: {
                        items: 4,
                        itemsFit: "contain",
                    }}} 
                    
                    renderKey={1}
                    disableDotsControls 
                    items={items}/>
                    
                <div className={styles.plus}>
                    <div className={styles.addBtn} onClick={openModal}>
                        +
                    </div>
                    <p className={styles.addTitle}>Добавить сертификат</p>
                </div>
            </div>
            
        </div>
    );
};

export default DoctorDiplomas;