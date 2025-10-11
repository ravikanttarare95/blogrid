import { ImagePlus } from "lucide-react";
import CloudC from "./../assets/cloud-computing.png";
import Button from "./Button";
import axios from "axios";
import { IKContext } from "imagekitio-react";

function UploadSection({ onSelectImage }) {
  const authenticator = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/imagekit-auth`
    );
    if (response) {
      return response.data;
    }
  };
  return (
    <div className="mb-6 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition">
      <IKContext
        publicKey={import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY}
        urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
        authenticator={authenticator}
      >
        <img src={CloudC} alt="Upload" className="w-12 h-12 mb-3 opacity-80" />
        <p className="text-gray-700 font-medium">Drag & drop to upload</p>
        <p className="text-gray-500 text-sm mb-3">or</p>
        <Button
          btnTitle={
            <>
              <ImagePlus size={20} />
              <span>Select Image</span>
            </>
          }
          btnSize="sm"
          btnVariant="secondary"
          onBtnClick={onSelectImage}
          customStyle="flex items-center gap-2"
        />
        {/* {authenticator()} */}
      </IKContext>
    </div>
  );
}
export default UploadSection;
