import React from 'react';
import PlanetDetailView from '../components/PlanetDetailView';

// Import planet data from Home.jsx
const PLANET_DATA = {
    name: "Entrepreneurs",
    color: "#FFD700",
    desc: "Create Leaders",
    tagline: "Founder grooming, mindset development, leadership networks",
    model: "/venus.glb",
    scale: 1.8,
    projects: [
        { name: "CEO Square", desc: "Executive Leadership Platform", url: "https://example.com" },
        { name: "YEP", desc: "Young Entrepreneur Programme", url: "https://example.com" },
        { name: "Next Leader Programme", desc: "Leadership Development", url: "https://example.com" },
        { name: "StartupTV", desc: "Entrepreneurial Content Network", url: "https://example.com" },
    ]
};

export default function EntrepreneursPage() {
    return <PlanetDetailView planetData={PLANET_DATA} />;
}
