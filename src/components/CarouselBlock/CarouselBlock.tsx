import { useState, useRef, useEffect, FormEvent, ChangeEventHandler, FunctionComponent, ReactElement, MouseEvent } from "react";
import styles from "./CarouselBlock.module.css";
import AliceCarousel from "react-alice-carousel";
import "./Carousel.css";
import "react-alice-carousel/lib/alice-carousel.css";
import Modal from "../UI/Modal/Modal";
import defaultDiplomaImg from "../../assets/img/default-diploma-photo.svg";
import { useCreateDiplomaMutation, useDeleteDiplomaMutation, useGetDiplomasByDoctorQuery } from "../../app/services/diplomas";
import IDiplomaCreateDto from "../../interfaces/IDiploma/IDiplomaCreateDto";
import ICarouselBlockProps from "./ICarouselBlockProps";
import { toast } from "react-toastify";
import { errorHandler } from "../../helpers/errorHandler";
import { fileToDataString } from "../../helpers/fileToDataString";
import { ERoles } from "../../enums/ERoles";
import { useCreateDocumentMutation, useDeleteDocumentMutation, useGetDocumentsByChildIdQuery } from "../../app/services/documents";
import IDocumentCreateDto from "../../interfaces/IDocument/IDocumentCreateDto";

const CarouselBlock: FunctionComponent<ICarouselBlockProps> = ({id, role, blockTitle}): ReactElement => {
    const {data: elements} = role === ERoles.DOCTOR ? useGetDiplomasByDoctorQuery(id) : useGetDocumentsByChildIdQuery(id);
    
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
        setClickedImageUrl("");
        setClickedImageId("");
    };

    const initDiplomaState: IDiplomaCreateDto = {
        doctorId: id,
        url: undefined
    };

    const initDocumentState: IDocumentCreateDto = {
        childId: id,
        url: undefined,
    };
    const [inputValues, setInputValues] = useState<IDiplomaCreateDto | IDocumentCreateDto>(role === ERoles.DOCTOR ? initDiplomaState : initDocumentState);
    const [previewImageSrc, setPreviewImageSrc] = useState<string>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const [createElement, {isError, isSuccess, error}] = (role === ERoles.DOCTOR ? useCreateDiplomaMutation() : useCreateDocumentMutation());

    const [clickedImageUrl, setClickedImageUrl] = useState<string>("");
    const [clickedImageId, setClickedImageId] = useState<string>("");
    useEffect(() => {
        isError && errorHandler(error);
    }, [isError]);

    useEffect(() => {
        isSuccess && toast.info(role === ERoles.DOCTOR ? "Сертификат добавлен" : "Документ добавлен");
    }, [isSuccess]);

    const handleClick = (url: string, id: string) => {
        openFullImageModal();
        setClickedImageUrl(url);
        setClickedImageId(id);
    };

    const items = (elements && elements.map(el => {
        return  <div className={styles.carouselItem} key={el.id} onClick={() => {handleClick(el.url, el.id);}}>
            <img 
                className={styles.diplomaImg}
                onError={(e) => { e.currentTarget.src = defaultDiplomaImg;}}
                src={el?.url !== "" ? `${import.meta.env.VITE_BASE_URL}/uploads/${role === ERoles.DOCTOR ? "doctorsDiplomas" : "childrenDocuments"}/${el?.url}` : defaultDiplomaImg} alt={role} />
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
        await createElement(formData);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
        setFileName("");
        setInputValues(role === ERoles.DOCTOR ? initDiplomaState : initDocumentState);
        closeModal();
    };

    const [deleteElement, {isError: isErrorDelete, isSuccess: isSuccessDelete, error: errorDelete}] = role === ERoles.DOCTOR ? useDeleteDiplomaMutation() : useDeleteDocumentMutation();

    useEffect(() => {
        isErrorDelete && errorHandler(errorDelete);
    }, [isErrorDelete]);

    useEffect(() => {
        if (isSuccessDelete) {
            closeFullImageModal();
            toast.info(role === ERoles.DOCTOR ? "Сертификат удален" : "Документ удален");
        }
    }, [isSuccessDelete]);
    
    const deleteButtonHandler = (e: MouseEvent<HTMLButtonElement>, id: string) => {
        e.stopPropagation();
        deleteElement(id);
        setClickedImageId("");
        setClickedImageUrl("");
    };


    return (
        <div>
            <Modal show={showFullImageModal} close={closeFullImageModal}>
                <div className={styles.fullImage}>
                    <img
                        onError={(e) => { e.currentTarget.src = defaultDiplomaImg;}}
                        src={clickedImageUrl !== "" ? `${import.meta.env.VITE_BASE_URL}/uploads/doctorsDiplomas/${clickedImageUrl}` : defaultDiplomaImg} alt={"diploma"} />
                    <button className={styles.deleteDiplomaBtn} onClick={(e) => deleteButtonHandler(e, clickedImageId)}>Delete</button>
                </div>
            </Modal>
            <Modal show={showModal} close={closeModal}>
                <div className={styles.diplomaUploaderBox}>
                    {fileName !== "" && <div className={styles.previewBox}>
                        <img src={previewImageSrc} alt="diploma" />
                    </div>}
                    <label className={styles.inputLabel}>
                        <input className={styles.diplomaInput} type="file" onChange={handleChangeFile} ref={fileInputRef}/> 
                        <p className={styles.diplomaBtn}>{"Выбрать файл"}</p>
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
                <p className={styles.carouselTitle}>{blockTitle}</p>
                {elements && elements.length === 0 ? null
                    :
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
                        items={items}
                    />
                }      
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

export default CarouselBlock;