import React, { useState, useRef, useEffect } from 'react';
import Cropper from 'cropperjs';
import { IonContent } from '@ionic/react';

interface UpLoadPhotoProps {
    setUp: (value: boolean) => void;
    image: string;
}

export const UploadPhoto = ({ setUp, image }: UpLoadPhotoProps) => {
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const cropperRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        if (cropperRef.current && image) {
            const cropperInstance = new Cropper(cropperRef.current, {
                aspectRatio: 16 / 9, 
                cropBoxResizable: true, 
                crop: () => {
                    const croppedCanvas = cropperInstance.getCroppedCanvas();
                    if (croppedCanvas) {
                        const croppedDataUrl = croppedCanvas.toDataURL('image/jpeg');
                        setCroppedImage(croppedDataUrl);
                    }
                },
            });

            cropperRef.current = cropperInstance;
        }
    }, [image]);

    return (
        <IonContent>
            <div className="upload-ph-container">
                <h4 onClick={() => setUp(false)}>close</h4>
                <h1>hello upload</h1>
                {croppedImage ? (
                    <img
                        src={croppedImage}
                        alt="Cropped"
                        style={{ width: '100%', height: 'auto' }} // Establece el tamaño deseado
                    />
                ) : (
                    <>
                        <div>
                            <img
                                ref={cropperRef}
                                src={"data:image/jpeg;base64," + image}
                                alt="Uploaded"
                                style={{ maxWidth: '100%', height: 'auto' }}
                            />
                        </div>
                    </>
                )}
            </div>
        </IonContent>
    );
};
