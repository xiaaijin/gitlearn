

### 介绍

1.  fork直接可用
2.  基于vue-cli3构建
3.  利用 eslint 规范代码
4.  利用 husky 规范 git 提交记录


### 项目开发


1.  依赖安装
```
tnpm install
```

2.  项目启动
```
npm run serve
```

3.  打包编译（本地不需要做，sumeru编译容器里做）
```
npm run build
```

4.  eslint修复问题
```
npm run lint
```

### 一、采用eslint，开启代码规范检查

1.  代码锁进： 4个空格。
2.  导出，引入模块请使用 export和import.
3.  语句结束，分号可以加，也可以不加。
4.  未使用的变量禁止定义。
5.  未使用的模块，禁止导入。
6.  字符串必需使用单引号。
7.  模版字符串请使用反引号(``)。
8.  路径拼接请使用 path.join



