"use client";
import { useRef, useState } from "react";

import classes from "./image-picker.module.css";
import Image from "next/image";

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();
  const imageInputRef = useRef();

  function handlePickClick() {
    imageInputRef.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label html={name}>{label}</label>
      <div className={classes.control}>
        <div className={classes.preview}>
          {pickedImage ? (
            <Image
              src={pickedImage}
              alt="The image selected by the user."
              fill
            />
          ) : (
            <p>No image picked yet.</p>
          )}
        </div>
      </div>
      <input
        ref={imageInputRef}
        className={classes.input}
        type="file"
        id={name}
        accept="image/png, image/jpeg"
        name={name}
        onChange={handleImageChange}
        required
      />
      <button
        className={classes.button}
        type="button"
        onClick={handlePickClick}>
        Pick an image
      </button>
    </div>
  );
}
