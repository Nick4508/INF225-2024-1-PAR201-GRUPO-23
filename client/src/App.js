import './App.css';
import Navbar from './components/Navbar';

// import ModificarHora from './screens/ModificarHoraScreen/ModificarHora';
// import TomarHora  from './screens/TomarHoraScreen';

const Home = () =>{
	return (
		<div>
			<h2>Home </h2>
		</div>
	);
};

const About = () => {
	return (
		<div>
			<h1>About</h1>
		</div>
	);
};

function App() {
	return (
	<div>
		<Navbar>
		</Navbar>
		<div>Holamundo</div>	
	</div>

); 
}

export default App;