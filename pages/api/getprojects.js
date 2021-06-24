

export default async function handler(req, res) {
  const token = req.headers.authorization;
	const resp = await fetch("https://api.todoist.com/sync/v8/sync", {
		body: 'sync_token=*&resource_types=["projects"]',
		headers: {
			'Authorization': `${token}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		method: "POST",
	});
  res.status(200).json(await resp.json());
}
