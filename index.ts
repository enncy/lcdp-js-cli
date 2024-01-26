#!/usr/bin/env node

import prompts from 'prompts';
import fs from 'fs';
import path from 'path';

(async () => {
	const response = await prompts({
		type: 'text',
		name: 'project-name'
	});

	const sourceDir = path.resolve(__dirname, 'template');
	const destDir = path.resolve(process.cwd(), response['project-name']);

	copy(sourceDir, destDir);

	console.log(response['project-name'] + ' created!');
	console.log('run command below to init project: ');
	console.log('cd ' + response['project-name']);
	console.log('npm install pnpm');
	console.log('pnpm install');
})();

function copy(src: string, dest: string) {
	const stat = fs.statSync(src);
	if (stat.isDirectory()) {
		copyDir(src, dest);
	} else {
		fs.copyFileSync(src, dest);
	}
}

function copyDir(srcDir: string, destDir: string) {
	fs.mkdirSync(destDir, { recursive: true });
	for (const file of fs.readdirSync(srcDir)) {
		const srcFile = path.resolve(srcDir, file);
		const destFile = path.resolve(destDir, file);
		copy(srcFile, destFile);
	}
}
