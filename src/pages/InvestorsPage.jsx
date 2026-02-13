import React from 'react';
import PlanetDetailView from '../components/PlanetDetailView';

const PLANET_DATA = {
    name: "Investors",
    color: "#00D9A0",
    desc: "Structure Capital",
    tagline: "Deal flow access, investor networking, structured capital",
    model: "/mars.glb",
    scale: 1.8,
    projects: [
        { name: "Investor Cafe", desc: "Deal Flow Network", url: "https://example.com" },
        { name: "VC Circle", desc: "Investor Networking Hub", url: "https://example.com" },
        { name: "X9 Club", desc: "Structured Capital Syndication", url: "https://example.com" },
    ]
};

export default function InvestorsPage() {
    return <PlanetDetailView planetData={PLANET_DATA} />;
}
