import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Report() {
  const [location, setLocation] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);
  const [disasterType, setDisasterType] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState(null);

  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLocation(
          `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
        );

        setLocationLoading(false);
      },
      (error) => {
        setLocationLoading(false);

        if (error.code === 1) {
          alert("Please allow location permission.");
        } else {
          alert("Unable to detect your location.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const recorder = new MediaRecorder(stream);

      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });

        const url = URL.createObjectURL(audioBlob);

        setAudioURL(url);

        stream.getTracks().forEach((track) => {
          track.stop();
        });
      };

      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error(error);
      alert("Microphone permission is required to record voice.");
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleReport = async () => {
    if (!location) {
      alert("Please detect your location first.");
      return;
    }
  
    if (!disasterType) {
      alert("Please select a disaster type.");
      return;
    }
  
    if (!description.trim() && !audioURL) {
      alert("Please describe the incident or record a voice report.");
      return;
    }
  
    const incident = {
      location,
      disasterType,
      description,
      media: media ? media.name : null,
      voiceReport: Boolean(audioURL),
    };
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/incidents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(incident),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Backend Response:", data);
      
        alert(
          `Emergency report submitted successfully!\n\nIncident ID: ${data.incident.incidentId}`
        );
      
        setDisasterType("");
        setDescription("");
        setMedia(null);
        setAudioURL("");
      } else {
        console.error("Server Error:", data);
        alert("Failed to submit report.");
      }
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Unable to connect to backend.");
    }
  };
    


  return (
    <div className="reportSite">

      {/* NAVBAR */}
      <header className="navbar">
        <div className="brand">
          <div className="brandMark">🌊</div>

          <div>
            <h2>
              Disaster<span>AI</span>
            </h2>

            <p>AI-Powered Cloud Disaster Management</p>
          </div>
        </div>

        <nav className="navLinks">
          <Link to="/">Home</Link>

          <Link className="active" to="/report">
            Report
          </Link>

          <a href="/#map">Live Map</a>
          <a href="/#features">Resources</a>
          <a href="/#about">About</a>
          <a href="/#contact">Contact</a>
        </nav>

        <div className="navActions">
          <select className="language">
            <option>English</option>
            <option>Hindi</option>
          </select>

          <button className="authorityBtn">
            👥 Authority Login
          </button>

          <button className="sosBtn">
            ☎ Emergency SOS
          </button>
        </div>
      </header>

      {/* REPORT PAGE */}
      <main className="reportPage">
        <div className="reportOverlay"></div>

        <div className="reportPageContent">

          <div className="reportPageHeader">
            <span className="emergencyLabel">
              ● EMERGENCY RESPONSE
            </span>

            <h1>Report an Emergency</h1>

            <p>
              Provide accurate incident information so emergency
              teams can respond as quickly as possible.
            </p>
          </div>

          <div className="reportPageCard">

            <div className="reportPageCardHeading">
              <div className="reportPageIcon">
                🚨
              </div>

              <div>
                <h2>Emergency Incident Report</h2>

                <p>
                  Your information will help authorities understand
                  the situation and coordinate the nearest response team.
                </p>
              </div>
            </div>

            <label>Your Location</label>

            <div className="locationRow">
              <div className="fakeInput">
                📍 {location || "Detect your current location"}
              </div>

              <button
                type="button"
                onClick={detectLocation}
                disabled={locationLoading}
              >
                {locationLoading ? "Detecting..." : "Detect"}
              </button>
            </div>

            <label>Disaster Type</label>

            <select
              className="formControl"
              value={disasterType}
              onChange={(e) => setDisasterType(e.target.value)}
            >
              <option value="">Select disaster type</option>
              <option value="Fire">🔥 Fire</option>
              <option value="Flood">🌊 Flood</option>
              <option value="Earthquake">🌍 Earthquake</option>
              <option value="Landslide">⛰️ Landslide</option>
              <option value="Cyclone">🌀 Cyclone</option>
              <option value="Road Accident">🚗 Road Accident</option>
              <option value="Other Emergency">
                ⚠️ Other Emergency
              </option>
            </select>

            <label>Describe the Incident</label>

            <textarea
              className="formControl"
              placeholder="Describe what happened, number of people affected, visible damage or any immediate danger..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="reportMediaGrid">

              <div>
                <label>Photo / Video</label>

                <input
                  className="reportFileInput"
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e) => setMedia(e.target.files[0])}
                />

                {media && (
                  <p className="selectedFile">
                    ✓ {media.name}
                  </p>
                )}
              </div>

              <div>
                <label>Voice Report</label>

                {!isRecording ? (
                  <button
                    type="button"
                    className="voiceRecordBtn"
                    onClick={startRecording}
                  >
                    🎙️ Record Voice
                  </button>
                ) : (
                  <button
                    type="button"
                    className="voiceStopBtn"
                    onClick={stopRecording}
                  >
                    ⏹ Stop Recording
                  </button>
                )}
              </div>

            </div>

            {audioURL && (
              <div className="audioPreview">
                <span>
                  ✓ Voice report recorded
                </span>

                <audio controls src={audioURL} />

                <button
                  type="button"
                  onClick={() => setAudioURL("")}
                >
                  Remove
                </button>
              </div>
            )}

            <button
              className="submitBtn"
              type="button"
              onClick={handleReport}
            >
              🚨 Submit Emergency Report
            </button>

            <p className="secureText">
              🔒 Your report is securely processed for emergency response.
            </p>

          </div>

        </div>
      </main>

    </div>
  );
}
export default Report;