import React from 'react';
import PlanetDetailView from '../components/PlanetDetailView';

const PLANET_DATA = {
    name: "Startups",
    color: "#2271B3",
    desc: "Build Scalable Companies",
    tagline: "Incubation, growth acceleration, franchise expansion",
    model: "/eart.glb",
    scale: 2.2,
    projects: [
        { name: "Incubenation", desc: "Startup Incubation Hub", url: "https://example.com" },
        { name: "Franchisify", desc: "Franchise Expansion Platform", url: "https://example.com" },
        { name: "Perform100X", desc: "Growth Acceleration Program", url: "https://example.com" },
    ]
};

export default function StartupsPage() {
    return <PlanetDetailView planetData={PLANET_DATA} />;
}
