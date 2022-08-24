const exit = (
	req: { query: { slug: any } },
	res: {
		clearPreviewData: () => void;
		writeHead: (arg0: number, arg1: { Location: string }) => void;
		end: () => any;
	},
) => {
	res.clearPreviewData();

	res.writeHead(307, { Location: `..${req?.query?.slug}` ?? `/` });

	return res.end();
};

export default exit;
