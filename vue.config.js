const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path")

// �����ļ���ָ��Ŀ¼
const copyFiles = [
    {
        from: path.resolve("src/plugins/manifest.json"),
        to: `${path.resolve("dist")}/manifest.json`
    },
    {
        from: path.resolve("src/assets"),
        to: path.resolve("dist/assets")
    },
    {
        from: path.resolve("src/plugins/inject.js"),
        to: path.resolve("dist/js")
    }
]

// ���Ʋ��
const plugins = [
    new CopyWebpackPlugin({
        patterns: copyFiles
    })
];

// ҳ���ļ�
const pages = {};
// ����popup.htmlҳ��
const chromeName = ["popup"];

chromeName.forEach(name => {
    pages[name] = {
        entry: `src/${name}/main.js`,
        template: `src/${name}/index.html`,
        filename: `${name}.html`
    }
});

module.exports = {
    pages,
    productionSourceMap: false,
    // ����content.js background.js
    configureWebpack: {
        entry: {
            content: "./src/content/main.js",
            background: "./src/background/main.js"
        },
        output: {
            filename: "js/[name].js"
        },
        plugins
    },
    // ����content.css
    css: {
        extract: {
            filename: "css/[name].css"
        }
    },
    chainWebpack: config => {
        if(process.env.NODE_ENV === "production"){
            config.output.filename('js[name].js').end()
            config.output.chunkFilename('js/[name].js').end()
        }
    },
    devServer: {
        port: '8080',
        open: true,
        overlay: {
          warnings: false,
          errors: true
        }
      }
}