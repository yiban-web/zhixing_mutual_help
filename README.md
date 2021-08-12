### 知行互助小程序项目

1. npm init -y
   cnpm install （没有cnpm的先下载npm i -g cnpm --registry=https://registry.npm.taobao.org）
   模拟的服务器通过cmd命令进入到项目根目录下运行 npm run server （没有nodemon的，下载cnpm install -g nodemon）

2. 如果运行到微信开发者工具里面报错为

   ```
   VM83:1 node-modules/_uview-ui@1.8.3@uview-ui/components/u-input/u-input.json: ["usingComponents"]["u-icon"] 未找到
   ```

   解决方案

   找`node-modules/uview-ui/components/u-input/u-input.vue``

   ``script` 下加` import uicon from '../u-icon/u-icon'`` 

   ``export default` 下加 `components: { uicon },`

3. `service`文件下的`api.js`放置所需要的接口，建议各自开发的时候建立自己的js接口文件，示例代码只做参考 比如在`service`文件下新建`indexPageApi.js`放置首页所需要的全部api

4. 组件放在components文件下

5. 页面在pages文件下

6. 图片在static文件下

**重要！！！node-modules 文件夹和unpackage文件夹不要提交上来**

**重要！！！每次开发之前记得pull最新的代码，大家创建自己的分支提交，及时提交代码**
