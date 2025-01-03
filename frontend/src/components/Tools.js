import React from "react";
import "../css/Tools.css";
import DiscordLogo from "../images/discord.png";
import MiroLogo from "../images/miro.png";
import TrelloLogo from "../images/trello.png";

function Tools() {
  const tools = [
    {
      name: "Discord",
      description: "Connect and communicate with your team in real-time.",
      logo: DiscordLogo,
      link: "https://discord.com/",
    },
    {
      name: "Miro",
      description: "Collaborate visually and brainstorm together.",
      logo: MiroLogo,
      link: "https://miro.com/",
    },
    {
      name: "Trello",
      description: "Organize tasks and track progress effectively.",
      logo: TrelloLogo,
      link: "https://trello.com/",
    },
  ];

  return (
    <section className="tools-page">
      <h1 className="tools-title">Our Tools</h1>
      <p className="tools-subtitle">
        Explore our recommended tools for effective collaboration and productivity.
      </p>
      <div className="tools-grid">
        {tools.map((tool) => (
          <div className="tool-card" key={tool.name}>
            <img src={tool.logo} alt={tool.name} className="tool-logo" />
            <h2 className="tool-name">{tool.name}</h2>
            <p className="tool-description">{tool.description}</p>
            <a href={tool.link} target="_blank" rel="noopener noreferrer" className="tool-link">
              Visit {tool.name}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Tools;