import { useEffect, useState } from 'react';
import axios from 'axios';

let endpoints = [
	'https://api.github.com/users/ejirocodes',
	'https://api.github.com/users/ejirocodes/repos',
	'https://api.github.com/users/ejirocodes/followers',
	'https://api.github.com/users/ejirocodes/following'
];

function Example2() {
	const [followers, setFollowers] = useState({});
	const [followings, setFollowings] = useState({});
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	const getMultipleData = async () => {
		setIsLoading(true);
		// Using axios.spread() to destructure our array of responses which makes code more readable
		axios
			.all(endpoints.map((promise) => axios.get(promise)))
			.then(
				axios.spread((user, repos, followers, following) => {
					console.log({ user, repos, followers, following });
					setIsLoading(false);
					setFollowers(followers);
					setFollowings(following);
					// console.log(followers.data);
				})
			)
			.catch((error) => {
				setError(error);
			});
		// We are telling axios to name the first response from the API calls, user and repos
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
					<section>
						<h2>Followers</h2>
						{followers.data && (
							<div>
								{followers.data.map((follower) => (
									<div key={follower.id}>
										<img src={follower.avatar_url} alt={follower.html_url} />
										<p>GitHub Profile: {follower.html_url}</p>
										<hr />
									</div>
								))}
							</div>
						)}
					</section>
					<section>
						<h2>Following</h2>
						{followings.data && (
							<div>
								{followings.data.map((following) => (
									<div key={following.id}>
										<img src={following.avatar_url} alt={following.html_url} />
										<p>GitHub Profile: {following.html_url}</p>
										<hr />
									</div>
								))}
							</div>
						)}
					</section>
				</>
			)}
		</>
	);
}

export default Example2;
