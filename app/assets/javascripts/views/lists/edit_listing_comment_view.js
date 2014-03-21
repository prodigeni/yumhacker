ListsEditListingCommentView = Backbone.View.extend({
    events:{
        'blur .comment_input': 'saveComment'
    },

    initialize: function (opts) {
        this.listing = opts.listing;
        console.log(this.listing.get('id'))
        this.listenTo(this.model, 'change', this.render);
        this.render();
    },

    render: function () {
        console.log('edit comment render')
        this.$el.html(render('lists/edit_listing_comment', this.model));
    },

    saveComment: function (e) {
        var body = $.trim(e.target.value);

        if (body !== this.model.get('body')) {
            this.model.set({ 
                listing_id: this.listing.get('listing_id'),
                body: e.target.value,
                created_at: new Date
            });

            this.model.format_time();
            this.model.save();            
        }
    }
});