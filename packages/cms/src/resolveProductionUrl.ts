const previewSecret = 'cb168779e1d80d47b6d28a585bd157f95f1b40fa';

export default function resolveProductionUrl(document: any) {
	const currentDocument = document.draft || document.displayed || document;
	const remoteUrl =
		{
			'mijn-vraag-over-corona': 'https://mijn-vraag-over-corona.vercel.app/',
			'reizen-tijdens-corona': 'https://reizen-tijdens-corona.vercel.app/',
		}[currentDocument?.metaData?.site as string] || '';
	const baseUrl =
		window.location.hostname === 'localhost'
			? 'http://localhost:3000'
			: remoteUrl;

	const previewUrl = new URL(baseUrl);
	let slug = `/nl`;

	if (currentDocument?.url) {
		slug = `${slug}${currentDocument?.url}`;
	}

	if (currentDocument?.slug?.current) {
		slug = `${slug}/${currentDocument?.slug?.current}`;
	}

	previewUrl.pathname = `/api/preview`;
	previewUrl.searchParams.append(`secret`, previewSecret);
	previewUrl.searchParams.append(`slug`, slug);

	console.log(previewUrl.toString());

	return previewUrl.toString();
}
