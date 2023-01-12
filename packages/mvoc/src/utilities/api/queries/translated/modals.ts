import { imageQuery } from '../';

/**
 * This helper function will transfer modals into content
 */
export const followModals = () => `{
	...,
	markDefs[]{
		...,
		_type == "dialog" => @.modal_ref->{
			title,
			${imageQuery({ name: 'image' })},
			content,
		}
	},
}`;
