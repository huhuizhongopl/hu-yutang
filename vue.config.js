
module.exports = {
    devServer: { 
        proxy: 'http://www.lvjiayuan.net/yutang_api/public/index.php/api' 
        
    }, 
    css: {
        loaderOptions: {
            css: {},
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({ 
                        rootValue: 75, 
                        propList: ['*'], 
                        selectorBlackList: ['van'] 
                    })
                ]
            }
        }
    }
}