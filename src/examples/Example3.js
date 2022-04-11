import { useEffect, useState } from 'react';
import axios from 'axios';

let one =
	'https://api.storyblok.com/v1/cdn/stories/health?version=published&token=wANpEQEsMYGOwLxwXQ76Ggtt';
let two =
	'https://api.storyblok.com/v1/cdn/datasources/?token=wANpEQEsMYGOwLxwXQ76Ggtt';
let three =
	'https://api.storyblok.com/v1/cdn/stories/vue?version=published&token=wANpEQEsMYGOwLxwXQ76Ggtt';

function Example3() {
	const [healthData, setHealthData] = useState({
		name: '',
		lang: '',
		first_published_at: '',
		group_id: ''
	});

	const [vueData, setVueData] = useState({
		name: '',
		lang: '',
		first_published_at: '',
		group_id: ''
	});

	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	const getMultipleData = () => {
		setIsLoading(true);

		axios
			.all([one, two, three].map((endpoint) => axios.get(endpoint)))
			.then(
				axios.spread((health, datasources, vue) => {
					console.log({ health });
					console.log({ vue });
					setIsLoading(false);
					setHealthData({
						...healthData,
						name: health.data.story.name,
						lang: health.data.story.lang,
						first_published_at: health.data.story.first_published_at,
						group_id: health.data.story.group_id
					});
					setVueData({
						...vueData,
						name: vue.data.story.name,
						lang: vue.data.story.lang,
						first_published_at: vue.data.story.first_published_at,
						group_id: vue.data.story.group_id
					});
				})
			)
			.catch((error) => {
				setError(error);
			});
	};

	useEffect(() => {
		getMultipleData();
	}, []);

	return (
		<>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<>
					{error && <p>{error.message}</p>}
					{healthData && (
						<>
							<h3>Basic Health Data</h3>
							<h4>{healthData.name}</h4>
							<h4>{healthData.lang}</h4>
							<h4>{healthData.first_published_at}</h4>
							<h4>{healthData.group_id}</h4>
						</>
					)}
					{vueData && (
						<>
							<h3>Basic Vue Data</h3>
							<h4>{vueData.name}</h4>
							<h4>{vueData.lang}</h4>
							<h4>{vueData.first_published_at}</h4>
							<h4>{vueData.group_id}</h4>
						</>
					)}
				</>
			)}
		</>
	);
}

export default Example3;
