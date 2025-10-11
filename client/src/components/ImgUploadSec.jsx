import { useRef } from "react";
import { ImagePlus } from "lucide-react";
import CloudC from "./../assets/cloud-computing.png";
import Button from "./Button";
import axios from "axios";
import { IKContext, IKUpload } from "imagekitio-react";
import toast from "react-hot-toast";

function UploadSection({ setImgURL, customStyle }) {
  const selectImage = useRef();

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

  return (
    <div
      className={`${customStyle} flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition`}
    >
      <IKContext
        publicKey={import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY}
        urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
        authenticator={authenticator}
      >
        <IKUpload
          ref={selectImage}
          onError={onError}
          onSuccess={onSuccess}
          onUploadProgress={onUploadProgress}
          className="hidden"
        />
        <img src={CloudC} alt="Upload" className="w-12 h-12 mb-3 opacity-80" />
        <p className="text-gray-700 font-medium">Drag & drop to upload</p>
        <p className="text-gray-500 text-sm mb-3">or</p>
        <Button
          btnTitle={
            <>
              <ImagePlus size={20} />
              <span>Update Image</span>
            </>
          }
          btnSize="sm"
          btnVariant="secondary"
          onBtnClick={() => {
            selectImage.current.click();
          }}
          customStyle="flex items-center gap-2"
        />
      </IKContext>
    </div>
  );
}
export default UploadSection;
