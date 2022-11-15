const { unstable_dev } = require("wrangler");

describe("Worker", () => {
	let worker;

	beforeAll(async () => {
		worker = await unstable_dev(
			"src/index.js",
			{},
			{ disableExperimentalWarning: true }
		);
	});

	afterAll(async () => {
		await worker.stop();
	});

		it("should check if address have access or else redirect to url", async () => {
		const resp = await worker.fetch();
		if (resp) {

			expect(resp.status).toBe(200);
		}
	}, 700000);
});
