import Markdoc from "@markdoc/markdoc";
import type { Config as MarkdocConfig, Node } from '@markdoc/markdoc';

export function getUsedTags(markdocAst: Node) {
	const tags = new Set<string>();
	const validationErrors = Markdoc.validate(markdocAst);
	// Hack: run the validator with an empty config and look for 'tag-undefined'.
	// This is our signal that a tag is being used!
	for (const { error } of validationErrors) {
		if (error.id === 'tag-undefined') {
			const [, tagName] = error.message.match(/Undefined tag: '(.*)'/) ?? [];
			tags.add(tagName);
		}
	}
	return tags;
}