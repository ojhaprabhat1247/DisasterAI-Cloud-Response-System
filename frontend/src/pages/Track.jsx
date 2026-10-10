import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Track() {
  const [incidentId, setIncidentId] = useState("");
  const [incident, setIncident] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const trackIncident = async () => {
    const id = incidentId.trim().toUpperCase();

    if (!id) {
      setError("Please enter an Incident ID.");
      setIncident(null);
      return;
    }

    setLoading(true);
    setError("");
    setIncident(null);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/incidents/${id}`
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setIncident(data.incident);
      } else {
        setError("Incident not found. Please check the Incident ID.");
      }
    } catch (error) {
      console.error("Tracking Error:", error);
      setError("Unable to connect to the DisasterAI server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reportSite">

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
          <Link to="/report">Report</Link>
          <Link className="active" to="/track">
            Track Incident
          </Link>
          <a href="/#map">Live Map</a>
          <a href="/#about">About</a>
        </nav>

        <div className="navActions">
          <button className="authorityBtn">
            👥 Authority Login
          </button>

          <button className="sosBtn">
            ☎ Emergency SOS
          </button>
        </div>
      </header>

      <main className="reportPage">
        <div className="reportOverlay"></div>

        <div className="reportPageContent">
          <div className="reportPageHeader">
            <span className="emergencyLabel">
              ● INCIDENT TRACKING
            </span>

            <h1>Track Your Incident</h1>

            <p>
              Enter the Incident ID received after submitting your
              emergency report to check its current status.
            </p>
          </div>

          <div className="reportPageCard">
            <div className="reportPageCardHeading">
              <div className="reportPageIcon">🔎</div>

              <div>
                <h2>Incident Status</h2>
                <p>
                  Example Incident ID: INC-D4DCB4C1
                </p>
              </div>
            </div>

            <label>Incident ID</label>

            <input
              className="formControl"
              type="text"
              placeholder="Enter Incident ID"
              value={incidentId}
              onChange={(e) => setIncidentId(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  trackIncident();
                }
              }}
            />

            <button
              className="submitBtn"
              type="button"
              onClick={trackIncident}
              disabled={loading}
            >
              {loading ? "Checking..." : "🔎 Track Incident"}
            </button>

            {error && (
              <div className="trackingError">
                ⚠️ {error}
              </div>
            )}

            {incident && (
              <div className="trackingResult">
                <div className="trackingTop">
                  <div>
                    <small>INCIDENT ID</small>
                    <h3>{incident.incidentId}</h3>
                  </div>

                  <span className="statusBadge">
                    {incident.status}
                  </span>
                </div>

                <div className="trackingDetails">
                  <div>
                    <small>Disaster Type</small>
                    <strong>{incident.disasterType}</strong>
                  </div>

                  <div>
                    <small>Location</small>
                    <strong>{incident.location}</strong>
                  </div>

                  <div>
                    <small>Reported At</small>
                    <strong>
                      {new Date(incident.createdAt).toLocaleString()}
                    </strong>
                  </div>

                  <div>
                    <small>Current Status</small>
                    <strong>{incident.status}</strong>
                  </div>
                </div>

                <div className="trackingDescription">
                  <small>Description</small>
                  <p>
                    {incident.description || "No description provided."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Track;