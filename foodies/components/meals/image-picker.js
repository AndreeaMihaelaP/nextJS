"use client";
import { useRef, useState } from "react";

import classes from "./image-picker.module.css";

export default function ImagePicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();
  const imageInputRef = useRef();
  function handlePickClick() {
    imageInputRef.current.click();
  }
  return (
    <div className={classes.picker}>
      <label html={name}>{label}</label>
      <div className={classes.control}>
        <input
          ref={imageInputRef}
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePickClick}
        >
          Pick an image
        </button>
      </div>
    </div>
  );
}
