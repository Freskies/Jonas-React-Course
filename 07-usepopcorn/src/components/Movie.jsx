export default function Movie ({ movie: { Poster, Title, Year } }) {
	return <li>
		<img src={Poster} alt={`${Title} poster`}/>
		<h3>{Title}</h3>
		<div>
			<p>
				<span>🗓</span>
				<span>{Year}</span>
			</p>
		</div>
	</li>;
}