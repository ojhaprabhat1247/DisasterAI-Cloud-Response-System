import { Link } from "react-router-dom";
import "../App.css";

function Home() {
  return (
    <div className="site">

      {/* ================= NAVBAR ================= */}

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
          <a className="active" href="#home">
            Home
          </a>

          <Link to="/report">
            Report
          </Link>

          <a href="#map">
            Live Map
          </a>

          <a href="#features">
            Resources
          </a>

          <a href="#about">
            About
          </a>

          <a href="#contact">
            Contact
          </a>
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

      <main>

        {/* ================= HERO ================= */}

        <section className="hero" id="home">

          <div className="heroContent">

            <div className="heroBadge">
              ♡ Together for a Safer Tomorrow
            </div>

            <h1>
              Faster Response.
              <br />

              <span>
                Safer Communities.
              </span>
            </h1>

            <p className="heroText">
              Report disasters, get real-time help, and enable authorities
              to respond faster with AI-powered incident analysis and
              cloud-based emergency coordination.
            </p>

            <div className="heroButtons">

              <Link
                to="/report"
                className="primaryBtn"
              >
                🚨 Report an Emergency →
              </Link>

              <a
                href="#map"
                className="outlineBtn"
              >
                📍 View Live Map
              </a>

            </div>

            {/* DISASTER QUICK REPORT */}

            <div className="disasterCards">

              <Link
                to="/report"
                className="disasterCard"
              >
                <div className="disasterIcon">
                  🔥
                </div>

                <h3>Fire</h3>

                <p>
                  Report fire incidents
                </p>
              </Link>

              <Link
                to="/report"
                className="disasterCard"
              >
                <div className="disasterIcon">
                  💧
                </div>

                <h3>Flood</h3>

                <p>
                  Report flooding
                </p>
              </Link>

              <Link
                to="/report"
                className="disasterCard"
              >
                <div className="disasterIcon">
                  ⛰️
                </div>

                <h3>Landslide</h3>

                <p>
                  Report landslides
                </p>
              </Link>

              <Link
                to="/report"
                className="disasterCard"
              >
                <div className="disasterIcon">
                  🌀
                </div>

                <h3>Cyclone</h3>

                <p>
                  Report cyclone damage
                </p>
              </Link>

            </div>

          </div>

          {/* RIGHT SIDE EMPTY FOR BACKGROUND IMAGE */}

          <div className="heroEmptySide"></div>

        </section>

        {/* ================= FEATURES ================= */}

        <section
          className="featuresSection"
          id="features"
        >

          <div className="featureCard">

            <div className="featureIcon">
              📍
            </div>

            <div>
              <h3>
                Real-time Reporting
              </h3>

              <p>
                Report incidents with location,
                photos, videos and voice.
              </p>
            </div>

          </div>

          <div className="featureCard">

            <div className="featureIcon">
              🧠
            </div>

            <div>
              <h3>
                AI Analysis
              </h3>

              <p>
                Automatic disaster classification
                and severity scoring.
              </p>
            </div>

          </div>

          <div className="featureCard">

            <div className="featureIcon">
              👥
            </div>

            <div>
              <h3>
                Rescue Coordination
              </h3>

              <p>
                Assign rescue teams based on
                incident priority and location.
              </p>
            </div>

          </div>

        </section>

        {/* ================= LIVE MAP ================= */}

        <section className="operationsSection">

          <div
            className="mapPanel"
            id="map"
          >

            <div className="mapInfo">

              <div className="mapIcon">
                🗺️
              </div>

              <div>
                <h2>
                  Live Incident Map
                </h2>

                <p>
                  View reported emergencies across affected regions
                  and track incident status in real time.
                </p>

                <button>
                  Open Live Map →
                </button>
              </div>

            </div>

            <div className="mapPreview">

              <div className="roads"></div>

              <span className="pin pin1">
                🔴
              </span>

              <span className="pin pin2">
                🟠
              </span>

              <span className="pin pin3">
                🔴
              </span>

              <div className="mapMessage">
                Live incident data will appear here
              </div>

              <div className="zoomButtons">

                <button>
                  +
                </button>

                <button>
                  −
                </button>

              </div>

            </div>

          </div>

          {/* ================= ALERTS ================= */}

          <div className="alertsPanel">

            <div className="alertsHeader">

              <div>
                <h2>
                  🔔 Emergency Alerts
                </h2>

                <p>
                  Stay informed with the latest emergency updates.
                </p>
              </div>

              <button>
                View All Alerts →
              </button>

            </div>

            <div className="alertRow">
              <span>
                🔴 Heavy rainfall alert in coastal regions
              </span>

              <small>
                2 hours ago
              </small>

              <b className="high">
                High
              </b>
            </div>

            <div className="alertRow">
              <span>
                🟠 Landslide risk in hilly areas
              </span>

              <small>
                5 hours ago
              </small>

              <b className="medium">
                Medium
              </b>
            </div>

            <div className="alertRow">
              <span>
                🔴 Cyclone warning issued
              </span>

              <small>
                8 hours ago
              </small>

              <b className="high">
                High
              </b>
            </div>

          </div>

        </section>

      </main>

      {/* ================= FOOTER ================= */}

      <footer id="about">

        <div className="footerBrand">

          <h2>
            🌊 Disaster<span>AI</span>
          </h2>

          <p>
            AI-Powered Cloud Disaster Management
          </p>

          <p className="footerDescription">
            Leveraging AI and cloud technology for faster,
            smarter and safer communities.
          </p>

        </div>

        <div>

          <h4>
            Quick Links
          </h4>

          <a href="#home">
            Home
          </a>

          <Link to="/report">
            Report Incident
          </Link>

          <a href="#map">
            Live Map
          </a>

          <a href="#features">
            Resources
          </a>

        </div>

        <div>

          <h4>
            Support
          </h4>

          <a href="#about">
            About Us
          </a>

          <a href="#contact">
            Contact
          </a>

          <a href="#">
            Privacy Policy
          </a>

          <a href="#">
            Terms of Service
          </a>

        </div>

        <div>

          <h4>
            Emergency
          </h4>

          <a href="#">
            Emergency SOS
          </a>

          <a href="#">
            Authority Login
          </a>

          <a href="#">
            Disaster Resources
          </a>

          <a href="#">
            Response Teams
          </a>

        </div>

        <div id="contact">

          <h4>
            Follow Us
          </h4>

          <div className="socials">
            <button>f</button>
            <button>𝕏</button>
            <button>◎</button>
            <button>▶</button>
            <button>in</button>
          </div>

          <p className="copyright">
            © 2026 DisasterAI. All rights reserved.
          </p>

        </div>

      </footer>

      {/* ================= GO TO TOP ================= */}

      <button
        className="goTopBtn"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        title="Go to top"
      >
        ↑
      </button>

    </div>
  );
}

export default Home;