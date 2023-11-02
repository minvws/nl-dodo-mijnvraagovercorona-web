import { BsGeoAlt, BsHospital } from 'react-icons/bs';

import { getDocumentList } from './utilities/getDocumentList';

export default (S) =>
	S.list()
		.title('Content')
		.items([
			S.listItem()
				.title('Locaties')
				.icon(BsGeoAlt)
				.child(
					S.documentTypeList('ggd-document')
						.title('Locaties per GGD')
						.child((ggdID: string) =>
							S.documentList()
								.title('Locaties')
								.filter('_type == "location-document" && GGD._ref == $ggdID')
								.params({ ggdID }),
						),
				),
			getDocumentList(S, {
				schemaType: 'ggd-document',
				title: 'GGDs',
				icon: BsHospital,
			}),
		]);
