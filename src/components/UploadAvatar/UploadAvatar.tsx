import React, {useState, ChangeEvent, createRef} from "react";
import AvatarEditor from "react-avatar-editor";
import IImageProps from "./IImageProps";
import styles from "./UploadAvatar.module.css";
import { useEditDoctorMutation, useGetDoctorByUserIdQuery } from "../../app/services/doctors";
import IUploadAvatarProps from "./IUploadAvatarProps";

const UploadAvatar: React.FunctionComponent<IUploadAvatarProps> = (props): React.ReactElement => { 
    const [editAvatar]= useEditDoctorMutation();
    //const [descriptionErrorMessage, setImageDescriptionErrorMessage] = useState<string>("");
    const [fileName, setFileName] = useState<string>("");
    const {data: doctor} = useGetDoctorByUserIdQuery();
    const editorRef: React.RefObject<AvatarEditor> = createRef();
    const [imageProps, setImageProps] = useState<IImageProps>({
        image: "",
        allowZoomOut: false,
        position: {x: 0.5, y: 0.5},
        scale: 1,
        rotate: 0,
        borderRadius: 25,
        preview: "null",
        width: 300,
        height: 320,
    });
    const handlePositionChange = (position: {x: number, y: number}): void => {
        setImageProps(prevState => {
            return {...prevState, position: position};
        });
    };

    const handleScale = (e: ChangeEvent<HTMLInputElement>): void => {
        const scale = parseFloat(e.target.value);
        setImageProps(prevState => {
            return {...prevState, scale: scale};
        });
    };

    const handleNewAvatar = (e: ChangeEvent<HTMLInputElement>): void => {
        //setImageDescriptionErrorMessage("");
        const file = e.target.files && e.target.files[0];
        if (file) {
            if(file && /\.(jpg|jpeg|png)$/i.test(file.name)) {
                setImageProps(prevState => {
                    return {...prevState, 
                        image: e.target.files ? e.target.files[0] : ""};
                });
                setFileName(e.target.files && e.target.files[0] ? e.target.files[0].name : "");
            } else {
                alert("Please select a valid image file (jpg, jpeg, png or gif)");
            }
        }
    };

    const cancelFileHandler = () => {
        // editorRef.current?.setState();
        setFileName("");
        setImageProps(prevState => {
            return {...prevState, image: ""};
        });
        props.click();
    };

    const setNewAvatar = async () => {
        if (editorRef.current) {
            const canvasScaled = editorRef.current?.getImageScaledToCanvas();
            await fetch(canvasScaled.toDataURL())
                .then((res) => res.blob())
                .then((blob) => {
                    const file = new File([blob], "sample.png", {type: blob.type});
                    const formData = new FormData();
                    formData.append("photo", file);
                    editAvatar({id: doctor?.id || "", doctor:formData});
                }
                );
        }
    };
    return (
        <div className={styles.uploadAvatarBox}>
            <AvatarEditor 
                ref={editorRef}
                scale={imageProps.scale}
                width={imageProps.width}
                height={imageProps.height}
                position={imageProps.position}
                onPositionChange={handlePositionChange}
                rotate={imageProps.rotate}
                borderRadius={imageProps.borderRadius}
                image={imageProps.image}
                color={[229, 232, 241]}
                border={0}
                style={{background: "var(--bg_light_blue)"}}
            />
                                
            <label className={styles.inputLabel}>
                <input type="file" onChange={handleNewAvatar} className={styles.avatarInput}/> 
                <p>Выбрать файл</p>
            </label>
            <input className={styles.rangeInput}
                name="scale" 
                type="range" 
                onChange={handleScale}
                min={imageProps.allowZoomOut ? "0.1":"1"}
                max="2" step="0.01"
                defaultValue={"1"}
                disabled={fileName !== "" ? false : true}
            />
            <span className={styles.fileName}>{fileName}</span>
            <div className={styles.avatarButtons}>
                <button 
                    onClick={cancelFileHandler} className={styles.avatarBtn}>Отмена</button> 
                <button 
                    disabled={fileName !== "" ? false : true}
                    onClick={setNewAvatar} className={styles.avatarBtn}>Установить</button> 
            </div>                 
        </div>
    );
};

export default UploadAvatar;