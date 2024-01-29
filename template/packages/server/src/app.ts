import { createServerControllerMiddleware, json, createControllerDataList, CoreUtils } from '@lcdp-js/core';
import { cors } from './middleware/cors';
import { controllers } from './api/index';
import express from 'express';
import { schemas } from 'schema';
import mongoose from 'mongoose';
import path from 'path';

(async () => {
	const app = express();
	// 连接数据库
	mongoose.connect('mongodb://127.0.0.1:27017/lcdp-js-test', {}).then(() => {
		console.log('[mongo] server launched');
	});

	app
		// 处理跨域
		.use(cors())
		// 静态资源
		.use(express.static(path.join(__dirname, '../public')))
		// 解析 post 数据
		.use(express.urlencoded({ extended: false }))
		.use(express.json())
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
		);
	// 启动服务器
	app.listen(3077, () => {
		console.log('[express] server launched');
	});
})();
