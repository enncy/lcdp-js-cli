#!/usr/bin/env node

import prompts from 'prompts';
import fs from 'fs';
import path from 'path';

(async () => {
	const response = await prompts({
		type: 'text',
		name: 'project-name',
		message: "What's your project name?"
	});

	const sourceDir = path.resolve(__dirname, 'template');
	const destDir = path.resolve(process.cwd(), response['project-name']);

	copy(sourceDir, destDir);

	const packageJson = JSON.parse(fs.readFileSync(path.resolve(destDir, 'package.json'), 'utf-8'));
	packageJson.name = response['project-name'];
	fs.writeFileSync(path.resolve(destDir, 'package.json'), JSON.stringify(packageJson, null, 2));

	const l = console.log;

	l('');
	l(response['project-name'] + ' created!');
	l('');
	l('run command below to init project: ');
	l('');
	l('	cd ' + response['project-name']);
	l('	npm install pnpm -g');
	l('	pnpm install');
	l('');
	l('and open tow terminal to run command below: ');
	l('');
	l('	npm run dev:server');
	l('	npm run dev:web');
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
