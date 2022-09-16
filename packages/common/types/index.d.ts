import { SxProp } from 'theme-ui';

export {};

declare global {
	namespace JSX {
		// tslint:disable-next-line: no-empty-interface
		interface IntrinsicAttributes extends SxProp {}
	}
}
