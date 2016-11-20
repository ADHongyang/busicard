require.config({
    paths: {
        'jquery': 'libs/jquery',
        'underscore': 'libs/underscore',
        'backbone': 'libs/backbone',
        'localstorage': 'libs/backbone.localStorage'
    }
})

require(['views/index', 'views/edit', 'models/card', 'backbone'], function(Index, Edit, Card, B){
    var card = new Card({id: 'me'})

    card.fetch().done(function(){
        var index = new Index({model: card})
        var edit = new Edit({model: card})

        var Router = B.Router.extend({
            routes: {
                '(/)': 'goIndex',
                'edit': 'goEdit'
            },

            goIndex: function(){
                index.showButton()
                // 取消视图内部的render调用，由router负责
                // 控制视图的呈现(render)
                index.render()
                edit.hide()
            },

            goEdit: function(){
                index.hideButton()
                edit.show()
                // 取消视图内部的render调用，由router负责
                // 控制视图的呈现(render)
                edit.render()
                index.render()
            }
        })

        var router = new Router()

        B.history.start()
    })
})