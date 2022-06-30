import defaultResolve from 'part:@sanity/base/document-actions';

export default function resolveDocumentActions(props: any) {
	return [...defaultResolve(props)];
}
