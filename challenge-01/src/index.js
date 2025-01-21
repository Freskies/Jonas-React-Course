import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const valerio = {
	image: "https://www.fibisromagna.it/foto/6098Foto_6992.jpg",
	longName: "Giacchini Valerio",
	description:
		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto officia magni saepe! Dicta, exercitationem sit nobis praesentium quis vitae neque illo rem quaerat autem eligendi molestias omnis ab doloribus incidunt!",
	skills: [
		{ skillName: "HTML+CSS", color: "#00f" },
		{ skillName: "Javascript", color: "#ff0" },
		{ skillName: "Web Design", color: "#0f0" },
		{ skillName: "Git and Github", color: "#f00" },
		{ skillName: "React", color: "#0ff" },
		{ skillName: "Python", color: "#f0f" },
	],
};

function App() {
	return <Card person={valerio} />;
}

function Card({ person: { image: url, longName, description, skills } }) {
	return (
		<article className="card">
			<img src={url} alt={longName} />
			<h3>{longName}</h3>
			<p>{description}</p>
			<Skills skills={skills} />
		</article>
	);
}

function Skills({ skills }) {
	return (
		<div className="skills">
			{skills.map(skill => (
				<Skill skill={skill} key={skill.longName} />
			))}
		</div>
	);
}

function Skill({ skill: { skillName, color } }) {
	return <span style={{ backgroundColor: color }}>{skillName}</span>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
