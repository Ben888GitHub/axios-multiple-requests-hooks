import { useEffect, useState } from 'react';
import axios from 'axios';

let one =
	'https://api.storyblok.com/v1/cdn/stories/health?version=published&token=wANpEQEsMYGOwLxwXQ76Ggtt';
let two =
	'https://api.storyblok.com/v1/cdn/datasources/?token=wANpEQEsMYGOwLxwXQ76Ggtt';
let three =
	'https://api.storyblok.com/v1/cdn/stories/vue?version=published&token=wANpEQEsMYGOwLxwXQ76Ggtt';

function Example1() {
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

	const requestOne = axios.get(one);
	const requestTwo = axios.get(two);
	const requestThree = axios.get(three);

	const getMultipleData = async () => {
		// axios.all([requestOne, requestTwo, requestThree]).then(
		// 	axios.spread((...responses) => {
		// 		console.log(responses);
		// 	})
		// );
		setIsLoading(true);
		try {
			const result = await axios.all([requestOne, requestTwo, requestThree]);

			const responseOne = result[0];
			const responseTwo = result[1];
			const responseThree = result[2];
			console.log(responseOne, responseTwo, responseThree);
			setIsLoading(false);
			setHealthData({
				...healthData,
				name: responseOne.data.story.name,
				lang: responseOne.data.story.lang,
				first_published_at: responseOne.data.story.first_published_at,
				group_id: responseOne.data.story.group_id
			});
			setVueData({
				...vueData,
				name: responseThree.data.story.name,
				lang: responseThree.data.story.lang,
				first_published_at: responseThree.data.story.first_published_at,
				group_id: responseThree.data.story.group_id
			});
		} catch (err) {
			setError(err);
		}
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

export default Example1;
