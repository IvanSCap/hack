import * as React from 'react';
import './camera.css'
import Webcam from "react-webcam";
import {useCallback, useEffect, useRef, useState} from "react";
import {PacmanLoader} from "react-spinners";
import mixedImg from "./inne.png";
import paperImg from "./paper.png";
import glassImg from "./glass.png";
import bioImg from "./bio.png";
import plasticImg from "./plastic.png";
import humanImg from "./human.png";
// import {useHistory} from "react-router-dom";

function convertWebpToJpeg(webpData) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const image = new Image();

    return new Promise((resolve, reject) => {
        image.onload = function () {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);

            canvas.toBlob(function (blob) {
                const reader = new FileReader();
                reader.onloadend = function () {
                    resolve(reader.result);
                };
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            }, "image/jpeg", 1);
        };

        image.onerror = reject;
        image.src = webpData;
    });
}

const Camera = () => {
    const [photoUrl, setPhotoUrl] = useState("");
    const [cameraOn, setCameraOn] = useState(true);
    const webcamRef = useRef(null);
    const [isSending, setSending] = useState(false);
    const [result, setResult] = useState(false);
    const [imagePath, setImagePath] = useState("");
    const [isHuman, setHuman] = useState(false);
    const [count, setCount] = useState(0);

    // const history = useHistory();

    const collectorId = window.location.href.split('/').pop();

    const imageMap = {
        PAPER: paperImg, GLASS: glassImg, PLASTIC_METAL: plasticImg, BIO: bioImg, MIXED: mixedImg, HUMAN: humanImg
    };

    const startTimer = useCallback(() => {
        // setImagePath(paperImg);
        const timer = setInterval(() => {
            setCount((prevCount) => prevCount - 1);
        }, 1000);

        // Clean up the timer when the component unmounts
        return () => clearInterval(timer);
    }, [])

    const handleCaptureClick = useCallback(() => {
        if (cameraOn) {
            const capturedPhoto = webcamRef.current.getScreenshot();

            convertWebpToJpeg(capturedPhoto)
                .then((jpegData) => {
                    // console.log(jpegData);
                    setPhotoUrl(jpegData);
                })
                .catch((error) => {
                    console.error("Error converting image:", error);
                });


            setCameraOn(false);
        }
    }, [cameraOn]);

    const sendPhoto = useCallback((photo) => {
        // console.log(photoUrl);
        // const image = photoUrl.split(',').pop();
        const image = photoUrl;
        const body = JSON.stringify({collectorId, image});
        console.log(image);

        return new Promise((resolve, reject) => {
            //http://hack-hashok.koyeb.app/analyze
            //http://localhost:8080/analyze
            fetch("https://hack-hashok.koyeb.app/analyze", {
                method: "POST", headers: {
                    "Content-Type": "application/json"
                }, body
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setResult(data);
                    // console.log(result)
                    if (data.wasteType === "HUMAN") {
                        setHuman(true);
                        setCount(5);
                    } else {
                        setCount(5);
                        startTimer();
                    }
                    setImagePath(imageMap[data.wasteType]);
                })
                .catch((error) => {
                    reject(error);
                });
            setSending(false);
        });
    }, [collectorId, imageMap, photoUrl, startTimer]);

    useEffect(() => {
        if (photoUrl && !isSending && !result) {
            setCameraOn(false);
            setSending(true);
            sendPhoto(photoUrl);
            // setResult(true);
            // setImagePath(imageMap["paper"]);
            // console.log("Uploading photo:", photoUrl);
        }
    }, [imageMap, isSending, photoUrl, result, sendPhoto]);

    const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);
    const facingMode = isMobileDevice ? 'environment' : 'user';
    const videoConstraints = {
        width: 160, height: 250, facingMode // or "environment" for back camera
    };

    if (!result) {
        return (<div className="v1_129">
            <div className="v1_95">
                {cameraOn ? <div className="v1_114" onClick={handleCaptureClick}></div> :
                    <div className="pacman-container">
                        <PacmanLoader
                            color="rgba(242,210,48,0.8500000238418579)"
                            loading={true}
                            size={40}
                        />
                    </div>}
                <div className="v1_111">
                    {cameraOn ? (<Webcam
                        audio={false}
                        ref={webcamRef}
                        videoConstraints={videoConstraints}
                    />) : (<img src={photoUrl} alt="Captured"/>)}
                </div>
                <span className="v1_97">Najpierw zrób śmieciowi zdjęcie...</span>
                <span className="v1_98">Pora wyciepać tego śmiecia!!!!!!!!!</span>
                <div className="v1_109"></div>
            </div>
        </div>);
        // } else if (isSending) {
        //     return (<div className="v6_250">
        //         <span className="v6_252">Hashok wydał werdykt!</span>
        //         <div className="v1_1099"></div>
        //         <span className="v6_256">Hashok sortuje śmieci....</span>
        //         <div className="v1_1111">
        //             <img src={photoUrl} alt="Captured"/>
        //         </div>
        //         <div className="pacman-container">
        //             <PacmanLoader
        //                 color="rgba(242,210,48,0.8500000238418579)"
        //                 loading={true}
        //                 size={40}
        //             />
        //         </div>
        //     </div>);
    } else if (result && count > 0) {
        // if (count > 0) {
        return (//{`Wyrzuć ${result.trashType} do ${result.trashFraction}`}
            <div className="v2_137">
                {isHuman ? <div></div> :
                    <span className="v2_141">{`Wyrzuć ${result.wasteItem} do ${result.wasteType}`}</span>} <span
                className="v1_988">{isHuman ? "Cóż za piękność!" : "Hashok wydał werdykt!"}</span>
                {isHuman ? <div className="v2_143" style={isHuman && {top: "361px"}}></div> : <div className="timer">
                    <h1>{count}</h1>
                </div>}
                {isHuman && <div className="v16_282" onClick={() => window.location.reload()}>
                    <div className="v16_283"></div>
                    <div className="v16_285">
                        <div className="v16_286"></div>
                    </div>
                </div>}
                <div className="v2_145">{imagePath && (<img src={imagePath} alt="Img"/>)}</div>
                {!isHuman && < span className="v2_147">Uważasz, że Hashok się pomylił?
                    Zgłoś niewłaściwą klasyfikację!</span>}
                    </div>);
                } else if (count <= 0) {
        return (
            <div className="v16_271"><span className="v16_272">Hashok dziękuje Ci za poprawne wyrzucenie śmiecia!</span>
                <div className="v16_281">
                    <div className="v16_279"></div>
                    <div className="v16_278"></div>
                </div>
                <span className="v16_273">Śmieć wrzucony!</span>
                <div className="v16_282" onClick={() => window.location.reload()}>
                    <div className="v16_283"></div>
                    <div className="v16_285">
                        <div className="v16_286"></div>
                    </div>
                </div>
                <div className="last-trash"></div>
            </div>);
    }
};

export default Camera;
