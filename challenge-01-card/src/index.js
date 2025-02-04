import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const valerio = {
    image: "https://www.fibisromagna.it/foto/6098Foto_6992.jpg",
    longName: "Giacchini Valerio",
    description:
        "I am a web developer with a passion for web design and user experience." +
        "I am currently studying at the University of Bologna and" +
        "I am looking for a job as a junior front-end developer.",
    skills: [
        {skillName: "HTML+CSS", color: "#00f", level: 3},
        {skillName: "Javascript", color: "#ff0", level: 2},
        {skillName: "Web Design", color: "#0f0", level: 1},
        {skillName: "Git and Github", color: "#f00", level: 2},
        {skillName: "React", color: "#0ff", level: 1},
        {skillName: "Python", color: "#f0f", level: 3},
    ],
};

function App() {
    return <Card person={valerio}/>;
}

function Card({person: {image: url, longName, description, skills}}) {
    return (
        <article className="card">
            <img src={url} alt={longName}/>
            <h3>{longName}</h3>
            <p>{description}</p>
            <Skills skills={skills}/>
        </article>
    );
}

function Skills({skills}) {
    return (
        <div className="skills">
            {skills.map(skill => (
                <Skill skill={skill} key={skill.longName}/>
            ))}
        </div>
    );
}

function Skill({skill: {skillName, color, level}}) {
    return <span style={{backgroundColor: color}}>
		{skillName} {
        (() => {
            switch (level) {
                case 1:
                    return "💧";
                case 2:
                    return "🔥";
                case 3:
                    return "⭐";
                default:
                    return null;
            }
        })()}
	</span>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
);
