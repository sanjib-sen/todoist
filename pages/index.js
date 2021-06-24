/* eslint-disable react/jsx-key */
import { Typography, Divider } from "antd";

const { Title, Paragraph, Text } = Typography;

export default function Home({ projects, items }) {
	console.log(items);
	return (
		<div>
			{items.map((item) => (
				<Title level={1}>{item.content}</Title>
			))}
		</div>
	);
}

export async function getStaticProps() {
	const res = await fetch(`http://localhost:3000/api/getprojects`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		method: "POST",
	}).then((data) => data.json());

	var projects = [];
	var items = [];

	for (var pro of res.projects) {
		await getItems(pro.id).then((itemsHere) => {
			projects.push({ name: pro.name, items: itemsHere });
			for (var itemsSingle of itemsHere) {
				if (itemsHere.length > 0) {
					items.push(itemsSingle);
				}
			}
		});
	}

	return {
		props: { projects, items }, // will be passed to the page component as props
	};
}

export async function getItems(id) {
	var items = [];
	await fetch("https://api.todoist.com/sync/v8/projects/get_data", {
		body: `project_id=${id}`,
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		method: "POST",
	})
		.then((data) => data.json())
		.then((data) => (items = data.items));
	return items;
}
