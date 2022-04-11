import { useAxios } from '../hooks/useAxios';

function ExampleHooks() {
	const { data, error, isLoading } = useAxios();

	return (
		<>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<>
					{error && <p>{error.message}</p>}
					{data.health && (
						<>
							<h3>Basic Health Data</h3>
							<h4>{data.health.name}</h4>
							<h4>{data.health.lang}</h4>
							<h4>{data.health.first_published_at}</h4>
							<h4>{data.health.group_id}</h4>
						</>
					)}
					{data.vue && (
						<>
							<h3>Basic Vue Data</h3>
							<h4>{data.vue.name}</h4>
							<h4>{data.vue.lang}</h4>
							<h4>{data.vue.first_published_at}</h4>
							<h4>{data.vue.group_id}</h4>
						</>
					)}
				</>
			)}
		</>
	);
}

export default ExampleHooks;
