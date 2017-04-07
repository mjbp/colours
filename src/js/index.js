//import './polyfills';
import styles from '../css/app.css';
import CONSTANTS from './constants';
import axios from 'axios';

const STORAGE_NAME = 'colours';

let currentColours;

let colourBlock = rgb => `<div class="colours__item" style="background-color:rgb(${rgb})"></div>`;

let addColour = colour => {
	document.querySelector('.js-colours').innerHTML = `${document.querySelector('.js-colours').innerHTML}${colourBlock(colour)}`;
};

let saveColours = () => {
	window.localStorage.setItem(STORAGE_NAME, JSON.stringify(currentColours));
};

//when DOMContentLoaded, run these tasks
const onDOMContentLoadedTasks = [
	() => {
		currentColours = window.localStorage.getItem(STORAGE_NAME) ? JSON.parse(window.localStorage.getItem(STORAGE_NAME)) : [];

		if(currentColours.length) currentColours.forEach(colour => {
			addColour(colour);
		});

		document.querySelector('.js-input').addEventListener('submit', e => {
			e.preventDefault();
			let value = document.getElementById('url').value;

			document.getElementById('url').value = '';
			
			axios.post('/api', {
				url: value
			})
			.then(function (response) {
				if(response.data && response.data.colour.length) {
					console.log(response.data.colour);
					addColour(response.data.colour.join(','));
					currentColours.push(response.data.colour.join(','));
					saveColours();
				}
			})
			.catch(function (error) {
				console.log(error);
			});

		});
		//if ('serviceWorker' in navigator) window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js') });
	}
];
if('addEventListener' in window)
    !!onDOMContentLoadedTasks.length && window.addEventListener('DOMContentLoaded', () => { onDOMContentLoadedTasks.forEach((fn) => fn()); });
