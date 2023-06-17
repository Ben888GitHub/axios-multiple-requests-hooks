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

	const getDataWithPromiseAll = async () => {
		try {
			const healthData = axios.get(health);
			const vueData = axios.get(vue);

			const [healthResult, vueResult] = await Promise.all([
				healthData,
				vueData
			]);
			console.log(healthResult.data);
			console.log(vueResult.data);
			setIsLoading(false);
			setData((currentData) => ({
				...currentData,
				health: healthResult.data.story,
				vue: vueResult.data.story
			}));
		} catch (error) {
			setError(error);
		}
	};

	useEffect(() => {
		getDataWithPromiseAll();
	}, []);

	return { data, error, isLoading };
};
