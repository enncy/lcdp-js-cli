#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompts_1 = __importDefault(require("prompts"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, prompts_1.default)({
        type: 'text',
        name: 'project-name',
        message: "What's your project name?"
    });
    const sourceDir = path_1.default.resolve(__dirname, 'template');
    const destDir = path_1.default.resolve(process.cwd(), response['project-name']);
    copy(sourceDir, destDir);
    console.log(response['project-name'] + ' created!');
    console.log('run command below to init project: ');
    console.log('cd ' + response['project-name']);
    console.log('npm install pnpm');
    console.log('pnpm install');
}))();
function copy(src, dest) {
    const stat = fs_1.default.statSync(src);
    if (stat.isDirectory()) {
        copyDir(src, dest);
    }
    else {
        fs_1.default.copyFileSync(src, dest);
    }
}
function copyDir(srcDir, destDir) {
    fs_1.default.mkdirSync(destDir, { recursive: true });
    for (const file of fs_1.default.readdirSync(srcDir)) {
        const srcFile = path_1.default.resolve(srcDir, file);
        const destFile = path_1.default.resolve(destDir, file);
        copy(srcFile, destFile);
    }
}
