ListsShowDescriptionView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        var desc = this.model.get('description');
        if (desc === null || desc.length === 0 ) {
            if (this.model.get('type') === 'CustomList') {
                desc = this.model.get('user_first_name') + '\'s ' + this.model.get('title') + ' list.';
            } else {
                desc = this.model.get('user_first_name') + '\'s Wish List of places to scope out.';                
            }
            this.model.set('description', desc);
        }

        this.render();
    },

    render: function () {
        this.$el.html(render('lists/show_description', this.model));
    }
});