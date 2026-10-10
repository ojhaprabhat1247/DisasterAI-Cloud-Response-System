from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timezone
import uuid


app = FastAPI(
    title="DisasterAI API",
    version="1.0.0"
)


# =========================
# CORS CONFIGURATION
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================
# TEMPORARY INCIDENT STORAGE
# =========================

incidents = []


# =========================
# INCIDENT MODEL
# =========================

class IncidentReport(BaseModel):
    location: str
    disasterType: str
    description: Optional[str] = ""
    media: Optional[str] = None
    voiceReport: bool = False


# =========================
# BASIC ROUTES
# =========================

@app.get("/")
def root():
    return {
        "message": "DisasterAI Backend Running"
    }


@app.get("/api/health")
def health():
    return {
        "status": "ok"
    }


# =========================
# CREATE INCIDENT
# =========================

@app.post("/api/incidents")
def create_incident(report: IncidentReport):

    incident_id = f"INC-{uuid.uuid4().hex[:8].upper()}"

    incident = {
        "incidentId": incident_id,
        "location": report.location,
        "disasterType": report.disasterType,
        "description": report.description,
        "media": report.media,
        "voiceReport": report.voiceReport,
        "status": "REPORTED",
        "createdAt": datetime.now(timezone.utc).isoformat()
    }

    incidents.append(incident)

    print("\n--- NEW INCIDENT REPORT ---")
    print("Incident ID:", incident_id)
    print("Location:", report.location)
    print("Disaster Type:", report.disasterType)
    print("Status: REPORTED")

    return {
        "success": True,
        "message": "Incident report received successfully",
        "incident": incident
    }


# =========================
# GET ALL INCIDENTS
# =========================

@app.get("/api/incidents")
def get_incidents():

    return {
        "success": True,
        "count": len(incidents),
        "incidents": incidents
    }
    
# =========================
# GET INCIDENT BY ID
# =========================

@app.get("/api/incidents/{incident_id}")
def get_incident_by_id(incident_id: str):

    for incident in incidents:
        if incident["incidentId"] == incident_id.upper():
            return {
                "success": True,
                "incident": incident
            }

    return {
        "success": False,
        "message": "Incident not found"
    }