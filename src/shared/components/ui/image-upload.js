import { useEffect, useRef, useState } from "react";
import SvgIcon from "./icons";

const ImageUpload = (props) => {
    const [fileName, setFileName] = useState("");
    const [imageFile, setImageFile] = useState();
    const openRef = useRef();

    useEffect(() => {
        if (imageFile) {
            props.onImageChange(imageFile);
        }
    }, [imageFile])


    const openDialogueHandler = (e) => {
        let file = e.target.files[0];
        setImageFile(file);
        let imageUrl = URL.createObjectURL(file);
        setFileName(imageUrl)
    }

    const clearFileHandler = () => {
        setFileName("");
    }

    const dropHandler = (e) => {
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
    const dragOverHandler = (e) => {
        e.preventDefault();
        e.currentTarget.classList.remove("border-[2px]")
        e.currentTarget.classList.add("border-[3px]")
    }
    const dragExitHandler = (e) => {
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
                onClick={() => { openRef.current.click(); }}
                className="w-full h-[150px] border-border dark:border-border-dark border-[2px] rounded-lg dark:bg-primary-dark bg-primary grid items-center justify-center border-dashed transition-[border]">
                <SvgIcon icon="uploadImageIcon" className="fill-none stroke-[.3px] stroke-border-dark" width="100" height="100" />
            </button>
            {fileName ?
                <>
                    <img src={fileName} className="absolute top-0 left-0 object-cover w-full h-full" />
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