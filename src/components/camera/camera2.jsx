import React from 'react';
import { useCallback, useEffect, useRef, useState } from "react";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import Webcam from "react-webcam";
import { PacmanLoader } from "react-spinners";
import './camera.css';
import mixedImg from "./inne.png";
import paperImg from "./paper.png";
import glassImg from "./glass.png";
import bioImg from "./bio.png";
import plasticImg from "./plastic.png";
import humanImg from "./human.png";
import bean from "./bean.png";
import LoginIcon from "@mui/icons-material/Login";
import { useParams } from 'react-router-dom';
import doneImg from "./done.png";

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

const Camera2 = (): JSX.Element => {
  const { collectorId } = useParams();
  const [ isLogged, setIsLogged ] = useState(true);
  const [ balance, setBalance ] = useState(true);
  const [ photoUrl, setPhotoUrl ] = useState("");
  const [ cameraOn, setCameraOn ] = useState(true);
  const [ isDone, setIsDone ] = useState(false);
  const webcamRef = useRef(null);
  const [ isSending, setSending ] = useState(false);
  const [ result, setResult ] = useState(false);
  const [ imagePath, setImagePath ] = useState("");
  const [ isHuman, setHuman ] = useState(false);
  const [ wasteType, setWasteType ] = useState("");
  const [ isProper, setIsProper ] = useState("none");
  // const [ count, setCount ] = useState(0);

  // const history = useHistory();

  // const collectorId = window.location.href.split('/').pop();

  const imageMap = {
    PAPER: paperImg, GLASS: glassImg, PLASTIC_METAL: plasticImg, BIO: bioImg, MIXED: mixedImg, HUMAN: humanImg
  };

  // const startTimer = useCallback(() => {
  //   // setImagePath(paperImg);
  //   const timer = setInterval(() => {
  //     setCount((prevCount) => prevCount - 1);
  //   }, 1000);

  //   return ()=> clearInterval(timer);
  // }, [])

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
  }, [ cameraOn ]);

  const sendPhoto = useCallback((photo) => {
    // console.log(photoUrl);
    // const image = photoUrl.split(',').pop();
    const image = photoUrl.replace("data:image/jpeg;base64,", "");;
    const body = JSON.stringify({collectorId, image, userId: "5502"});
    console.log(body);

    return new Promise((resolve, reject) => {
      //https://hackyeah-back-production.up.railway.app/api/analyze
      //http://localhost:8080/analyze
      fetch("https://hackyeah-back-production.up.railway.app/analyze", {
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
            // setCount(5);
            setCameraOn(false);
          } else {
            // setCount(5);
            // startTimer();
            setWasteType(data.wasteType);
            setCameraOn(false);
          }
          setImagePath(imageMap[data.wasteType]);
        })
        .catch((error) => {
          reject(error);
        });
      setSending(false);
    });
  }, [collectorId, imageMap, photoUrl]);

  const sendIfDOne = useCallback(() => {
    const body = JSON.stringify({collectorId,  wasteType});
    console.log(body);

    return new Promise((resolve, reject) => {
      //https://hackyeah-back-production.up.railway.app/api/analyze
      //http://localhost:8080/analyze
      fetch("https://hackyeah-back-production.up.railway.app/done", {
        method: "POST", headers: {
          "Content-Type": "application/json"
        }, body
      })
        // .then(response => response.json())
        .then(data => {
          console.log(data.status);
          if (data.status === 200) setIsProper("true");
          else if (data.status === 201) setIsProper("false");
          // setResult(data);
          // setIsProper(data);
        })
        .catch((error) => {
          reject(error);
        });
      setSending(false);
    });
  }, [collectorId, imageMap, photoUrl]);

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
    width: 332,
    height: 200,
    facingMode: "user",
  };

  if (!result) {
    return (
      <Stack sx={{ m: 2, alignItems: 'center' }}>
        {/*{!isLogged? <Button*/}
        {/*  color="primary"*/}
        {/*  startIcon={<LoginIcon />}*/}
        {/*  // component={Link}*/}
        {/*  // to="/login"*/}
        {/*>*/}
        {/*  Logowanie*/}
        {/*</Button> :*/}
        {/*  <Stack>*/}
        {/*    <Typography>Twoje konto: 300 points</Typography>*/}
        {/*    <Button color="primary" size="large">Leaderboard: </Button>*/}
        {/*  </Stack>*/}
        {/*}*/}
        <Typography variant="h4" m={4}>
          Pora wyciepać tego śmiecia
        </Typography>

        {cameraOn ? (<Webcam
                        audio={false}
                        ref={webcamRef}
                        videoConstraints={videoConstraints}
                    />) : (<img src={photoUrl} alt="Captured"/>)}
        <img src={bean} alt="bean" />

        <Typography variant="h5" color="#E9E7E7" m={4}>
          Najpierw zrób śmieciowi zdjęcie...
        </Typography>

        {cameraOn ?
          <IconButton onClick={handleCaptureClick}>
              <RadioButtonCheckedIcon color="primary" sx={{ width: 64, height: 64 }} />
          </IconButton>
          : <PacmanLoader
              color="#D6C934"
              loading={true}
              size={40}
            />
        }
      </Stack>
     );} 
     else if (isProper === "true" || isProper === "false") {
      if (isProper === "true") {
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
      } else {
        return (
          <div className="v16_271"><span className="v16_272">Wyrzuciles do zlego pojemnika :(</span>
              <div className="v16_281">
                  <div className="v16_279"></div>
                  <div className="v16_278"></div>
              </div>
              <span className="v16_273">Miales wyrzucic do {wasteType}</span>
              <div className="v16_282" onClick={() => window.location.reload()}>
                  <div className="v16_283"></div>
                  <div className="v16_285">
                      <div className="v16_286"></div>
                  </div>
              </div>
              <div className="last-trash"></div>
          </div>);
      }
    }
     else if (result) {
        // if (count > 0) {
        return (//{`Wyrzuć ${result.trashType} do ${result.trashFraction}`}
            <div className="v2_137">
                {isHuman ? <div></div> :
                    <span className="v2_141">{`Wyrzuć ${result.wasteItem} do ${result.wasteType}`}</span>} <span
                className="v1_988">{isHuman ? "Cóż za piękność!" : "Hashok wydał werdykt!"}</span>
                {isHuman ? <div className="v2_143" style={isHuman && {top: "361px"}}></div> : <div className="timer">
                <img src={doneImg} alt="Done" onClick={sendIfDOne}/>
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
        }
};

export default Camera2;