import { LangInfo } from './types';

declare global {
	namespace App {
		// eslint-disable-next-line @typescript-eslint/no-empty-interface
		interface Locals extends LangInfo {}
	}
}

export {};
