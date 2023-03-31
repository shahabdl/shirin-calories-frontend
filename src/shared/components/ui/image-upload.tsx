import { useEffect, useRef, useState } from "react";
import SvgIcon from "./icons";
import React from "react";

interface Props {
    onImageChange: Function,
}

const ImageUpload = ({ onImageChange }: Props) => {
    const [fileName, setFileName] = useState("");
    const [imageFile, setImageFile] = useState<File>();

    const openRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (imageFile) {
            onImageChange(imageFile);
        }
    }, [imageFile])


    const openDialogueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            let file = e.currentTarget.files[0];            
            setImageFile(file);
            let imageUrl = URL.createObjectURL(file);
            setFileName(imageUrl)
        }
    }

    const clearFileHandler = () => {
        setFileName("");
    }

    const dropHandler = (e: React.DragEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.currentTarget.classList.remove("border-[3px]");
        e.currentTarget.classList.add("border-[2px]")
        let imageUrl = "";
        const draggedFiles = e.dataTransfer.files;
        for (let file in draggedFiles) {
            if (!draggedFiles[file].type.match("image")) continue;
            setImageFile(draggedFiles[file]);
            imageUrl = URL.createObjectURL(draggedFiles[file]);
            break;
        }
        if (imageUrl !== "") setFileName(imageUrl);
    }
    const dragOverHandler = (e:React.DragEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.currentTarget.classList.remove("border-[2px]")
        e.currentTarget.classList.add("border-[3px]")
    }
    const dragExitHandler = (e:React.DragEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.currentTarget.classList.remove("border-[3px]");
        e.currentTarget.classList.add("border-[2px]")
    }

    return (
        <div className="relative rounded-lg overflow-hidden mb-2">
            <input
                style={{ display: "none" }}
                accept=".jpg,.jpeg,.png"
                ref={openRef}
                type="file"
                onChange={openDialogueHandler}
            />
            <button
                id="drop-image-target"
                onDrop={dropHandler}
                onDragOver={dragOverHandler}
                onDragLeave={dragExitHandler}
                onClick={() => { openRef.current?.click(); }}
                className="w-full h-[150px] border-border dark:border-border-dark border-[2px] rounded-lg dark:bg-primary-dark bg-primary grid items-center justify-center border-dashed transition-[border]">
                <SvgIcon icon="uploadImageIcon" className="fill-none stroke-[.3px] stroke-border-dark" width="100" height="100" />
            </button>
            {fileName ?
                <>
                    <img src={fileName} className="absolute top-0 left-0 object-cover w-full h-full" alt="Upload Food Preview"/>
                    <div
                        onClick={clearFileHandler}
                        className="absolute top-0 right-0 z-20 w-[40px] bg-primary dark:bg-primary-dark text-center select-none cursor-pointer hover:bg-button dark:hover:bg-button-dark">X</div>

                </>
                :
                ""
            }
        </div>
    )
}

export default ImageUpload;