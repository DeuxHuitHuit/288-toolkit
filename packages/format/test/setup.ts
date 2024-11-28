import { vi } from 'vitest';
import '../../../shared/test/mocks/sveltekit';

// Mock translation module
vi.mock('../src/lib/translations/filesize/index.js', async () => {
	return import(__dirname + '/../../../shared/test/mocks/translations.ts');
});
vi.mock('../src/lib/translations/relativeTime/index.js', async () => {
	return import(__dirname + '/../../../shared/test/mocks/translations.ts');
});
vi.mock('../src/lib/translations/duration/index.js', async () => {
	return import(__dirname + '/../../../shared/test/mocks/translations.ts');
});
