import type { AstroIntegration } from 'astro';
import { VFile } from 'vfile';
import type { Plugin as VitePlugin } from 'vite';

import fountain from "@fountainjs/parser"

const parseFountain = file => fountain.parse(file, function (output) {
  return { ...output, ...{ date: new Date(output.date) } } // { title: '', html: { title_page: '', script: '' } }
})

export default function Fountain(): AstroIntegration {
	return {
		name: '@fountainjs/astro',
		hooks: {
			'astro:config:setup': async ({ updateConfig, config, addPageExtension, command }: any) => {
				addPageExtension('.fountain');

				updateConfig({
					vite: {
						plugins: [
							{
								enforce: 'pre',
								// Override transform to alter code before MDX compilation
								// ex. inject layouts
								async transform(code, id) {
									if (!id.endsWith('fountain')) return;

									const compiled = await parseFountain(new VFile({ value: code, path: id }));

									return {
										code: String(compiled.html.script),
										// map: compiled.map,
									};
								},
							},
						] as VitePlugin[],
					},
				});
			},
		},
	};
}