import React from "react";
import Header from "./Header.jsx";
import h1 from "./assets/h1.jpg";
import h2 from "./assets/h2.jpg";
import "./about.css";

const About = () => {
    return (
        <div className="about-root">
            <Header />
            <main className="about-main">
                <section className="hero-section">
                    <div className="hero-content">
                        <h1 className="hero-title">About Mapico Studio</h1>
                        <p className="hero-subtitle">
                            We build thoughtful, accessible web experiences. Our focus is simplicity, performance, and human-centered design — with code that scales.
                        </p>
                        <div className="hero-features">
                            <span className="feature-tag">Open-source friendly</span>
                            <span className="feature-tag">Performance-first</span>
                            <span className="feature-tag">Accessible by design</span>
                            <span className="feature-tag">React + Vite</span>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=60" alt="Team collaboration" />
                    </div>
                </section>

                <section className="mission-section">
                    <h2>Our Mission</h2>
                    <p>
                        Deliver delightful user experiences through fast, maintainable code. We care about inclusive interfaces and measurable impact.
                    </p>
                </section>

                <section className="work-section">
                    <h2>What We Do</h2>
                    <p className="work-description">
                        We design and implement web apps, component libraries, and tooling that help teams ship confidently. Below are snapshots from recent work.
                    </p>
                    <div className="work-gallery">
                        <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=60" alt="Project preview 1" />
                        <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=60" alt="Project preview 2" />
                        <img src="https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=400&q=60" alt="Project preview 3" />
                    </div>
                </section>

                <section className="team-section">
                    <h2>Meet Our Team</h2>
                    <div className="team-grid">
                        <div className="team-member">
                            <img src={h1} alt="Ava Martin" />
                            <h3>Bharath kumar </h3>
                            <p>Product Lead & Frontend Engineer</p>
                        </div>
                        <div className="team-member">
                            <img src={h2} alt="Liam Chen" />
                            <h3>MR.Anomynus</h3>
                            <p>Frontend Engineer</p>
                        </div>

                        <div className="team-member">
                            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=60" alt="Marcus Johnson" />
                            <h3>Mr.X</h3>
                            <p>Backend Developer</p>
                        </div>
                    </div>
                </section>

                <section className="contact-section">
                    <h2>Get In Touch</h2>
                    <p>Ready to work together? We'd love to hear from you.</p>
                    <a href="#" onClick={() => alert("Thank's for chosing us.We back get to you Soon")} className="contact-button">Contact Us</a>
                </section>
            </main>
        </div>
    );
};

export default About;