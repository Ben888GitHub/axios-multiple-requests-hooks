import { useState, useEffect } from 'react';
import axios from 'axios';

let health =
	'https://api.storyblok.com/v1/cdn/stories/health?version=published&token=wANpEQEsMYGOwLxwXQ76Ggtt';
let vue =
	'https://api.storyblok.com/v1/cdn/stories/vue?version=published&token=wANpEQEsMYGOwLxwXQ76Ggtt';

export const useAxios = () => {
	const [data, setData] = useState({});
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const getAllData = () => {
		setIsLoading(true);
		axios
			.all([health, vue].map((endpoint) => axios.get(endpoint)))
			.then(
				axios.spread((health, vue) => {
					setIsLoading(false);
					setData({
						...data,
						health: health.data.story,
						vue: vue.data.story
					});
				})
			)
			.catch((error) => {
				setError(error);
			});
	};

	useEffect(() => {
		getAllData();
	}, []);

	return { data, error, isLoading };
};
