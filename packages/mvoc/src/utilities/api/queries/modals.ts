import { imageQuery } from '.';

/**
 * This helper function will transfer modals into content
 */
export const followModals = (locale: string) => `{
	...,
	markDefs[]{
		...,
		_type == "dialog" => {
			"title": @.modal_ref->title.${locale},
			${imageQuery({ name: 'image', path: '@.modal_ref->image' })},
			"content": @.modal_ref->content.${locale},
		}
	},
}`;
