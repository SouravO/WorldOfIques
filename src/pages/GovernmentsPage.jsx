import React from 'react';
import PlanetDetailView from '../components/PlanetDetailView';

const PLANET_DATA = {
    name: "Governments",
    color: "#9D4EDD",
    desc: "Build Infrastructure",
    tagline: "Innovation zones, infrastructure design, public-private partnerships",
    model: "/jupiter.glb",
    scale: 2.5,
    projects: [
        { name: "Startup Park", desc: "Innovation Zones", url: "https://example.com" },
        { name: "Vision by iQue", desc: "Infrastructure Design", url: "https://example.com" },
        { name: "iQue Infra", desc: "Public-Private Partnerships", url: "https://example.com" },
    ]
};

export default function GovernmentsPage() {
    return <PlanetDetailView planetData={PLANET_DATA} />;
}
