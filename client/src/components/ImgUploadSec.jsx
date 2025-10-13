import { useCallback, useRef, useState } from "react";
import { ImagePlus, CloudUpload } from "lucide-react";
import Button from "./Button";
import axios from "axios";
import { IKContext, IKUpload } from "imagekitio-react";
import toast from "react-hot-toast";
import { useDropzone } from "react-dropzone";

function UploadSection({ setImgURL, customStyle }) {
  const uploadImageRef = useRef(null);

  const authenticator = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/imagekit-auth`
    );
    if (response) {
      return response.data;
    }
  };

  const onUploadProgress = (evt) => {
    toast.loading("Image Uploading...", { id: "img-uploading" });
  };

  const onError = (err) => {
    toast.error("Error uploading image");
  };

  const onSuccess = async (res) => {
    setImgURL(res.url);
    toast.success("Image uploaded");
    toast.dismiss("img-uploading");
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length === 0) toast.error("Select only one file");
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/*": [] },
  });

  return (
    <div
      {...getRootProps()}
      className={`${customStyle} flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer transition
      ${
        isDragActive
          ? "border-teal-400 bg-teal-50"
          : "border-gray-300 bg-gray-50 hover:bg-gray-100"
      }`}
    >
      <IKContext
        publicKey={import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY}
        urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
        authenticator={authenticator}
      >
        <IKUpload
          ref={uploadImageRef}
          onError={onError}
          onSuccess={onSuccess}
          onUploadProgress={onUploadProgress}
          className="hidden"
        />

        <CloudUpload
          size={50}
          className={`${
            isDragActive ? "animate-bounce" : "animate-none"
          }  text-teal-500`}
        />
        {isDragActive ? (
          <p className="text-teal-600 font-medium">Drop your image here...</p>
        ) : (
          <>
            <p className="text-gray-700 font-medium">Drag & drop to upload</p>
            <p className="text-gray-500 text-sm mb-3">or</p>
            <Button
              btnTitle={
                <>
                  <ImagePlus size={20} />
                  <span>Upload Image</span>
                </>
              }
              btnSize="sm"
              btnVariant="secondary"
              onBtnClick={(e) => {
                e.stopPropagation(); // Prevent triggering dropzone click
                uploadImageRef.current.click(); // open native file picker
              }}
              customStyle="flex items-center gap-2"
            />
          </>
        )}
      </IKContext>
    </div>
  );
}
export default UploadSection;
