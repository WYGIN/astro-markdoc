import matter from 'gray-matter';
import type { ErrorPayload as ViteErrorPayload } from 'vite';
import { fileURLToPath } from 'node:url';

/**
 * Match YAML exception handling from Astro core errors
 * @see 'astro/src/core/errors.ts'
 */
export function parseFrontmatter(fileContents: string, filePath: string) {
	try {
		// `matter` is empty string on cache results
		// clear cache to prevent this
		(matter as any).clearCache();
		return matter(fileContents);
	} catch (e: any) {
		if (e.name === 'YAMLException') {
			const err: Error & ViteErrorPayload['err'] = e;
			err.id = filePath;
			err.loc = { file: e.id, line: e.mark.line + 1, column: e.mark.column };
			err.message = e.reason;
			throw err;
		} else {
			throw e;
		}
	}
}

export function getEntryInfo({ fileUrl, contents }: { fileUrl: URL; contents: string }) {
	const parsed = parseFrontmatter(contents, fileURLToPath(fileUrl));
	return {
		data: parsed.data,
		body: parsed.content,
		slug: parsed.data.slug,
		rawData: parsed.matter,
	};
}