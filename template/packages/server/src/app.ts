import { createServerControllerMiddleware, json, createControllerDataList, CoreUtils } from '@lcdp-js/core';
import { cors } from './middleware/cors';
import { controllers } from './api/index';
import express, { RequestHandler } from 'express';
import { schemas } from 'schema';
import fileUpload from 'express-fileupload';
import path from 'path';
import { mongo } from './middleware/mongo';

(async () => {
	const app = express();
	// 连接数据库
	await mongo('mongodb://127.0.0.1:27017/lcdp-js-test');

	// 启用 VUE 核心代码
	app.set('views', path.join(__dirname, '../public/dist')); //设置模版路径在views目录（默认）
	app.set('view engine', 'html');
	app.engine('html', require('ejs').renderFile);

	app
		// 静态资源
		.use(express.static(path.join(__dirname, '../public')))
		// 处理跨域
		.use(cors())
		// 解析 post 数据
		.use(express.urlencoded({ extended: false, limit: '1mb' }))
		.use(express.json({ limit: '1mb' }))
		// 解析文件上传
		.use(fileUpload({ defParamCharset: 'utf8' }) as RequestHandler)
		.get('/schema-data', (req, res) => {
			res.send({
				apis: createControllerDataList(controllers),
				schema_metadata_list: CoreUtils.getSchemaMetadataList(schemas)
			});
		})
		// 低代码框架
		.use(
			createServerControllerMiddleware(controllers, {
				onError(err, req, res) {
					res.json(json(undefined, '服务器错误：' + err.message || String(err), 500));
				}
			})
		)

		// 启用 VUE 核心代码
		.use((req, res, next) => {
			res.statusCode = 200;
			res.render('index.html');
		});
	// 启动服务器
	app.listen(3077, () => {
		console.log('[express] server launched');
	});
})();
