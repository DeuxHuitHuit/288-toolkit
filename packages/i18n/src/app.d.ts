import { LangInfo } from './types';

declare global {
	namespace App {
		interface Locals extends LangInfo {}
	}
}

export {};
