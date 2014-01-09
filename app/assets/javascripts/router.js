Router = Backbone.Router.extend({
    initialize: function () {
        this.route(/^restaurants\/[A-Za-z0-9\-_]+\/[A-Za-z0-9\-_]+\/[A-Za-z0-9\-_]+$/, 'establishmentsShow');
        this.route(/^restaurants\/[A-Za-z0-9\-_]+\/[A-Za-z0-9\-_]+\/[A-Za-z0-9\-_]+\/photos$/, 'establishmentsPhotosIndex');
    },

    routes: {
        '': 'mainIndex',
        '_=_': 'redirectToHome',
        'restaurants': 'establishmentsIndex',
        'restaurants/search': 'establishmentsSearch',
        'users': 'nothing',
        'users/find_facebook_friends': 'findFacebookFriends',
        'users/search': 'usersSearch',
        'users/sign_in': 'nothing',
        'users/sign_out': 'nothing',
        'users/sign_up': 'nothing',
        'users/edit': 'editProfile',
        'users/:id(/:section)': 'usersShow'
    },

    setup: function () {
        if (this.currentView) { 
            this.currentView.remove(); 
        } else {
            $('section').html('');
        }
        $('<div>', { id: 'main_container' }).appendTo('section');
    },

    mainIndex: function () {
        this.setup();
        this.currentView = new MainIndexView({ el: '#main_container' });
    },

    redirectToHome: function () {
        App.navigate('');
    },

    establishmentsIndex: function () {
        this.setup();
        this.currentView = new EstablishmentsIndexView({ el: '#main_container' });
    },

    establishmentsSearch: function (id) {
        this.setup();
        this.currentView = new EstablishmentsSearchView({ el: '#main_container' });
    },

    establishmentsShow: function (path) {
        var slug = window.location.pathname.replace(/.*\//, '');
        this.setup();
        this.currentView = new EstablishmentsShowView({ 
            el: '#main_container',
            model: new Establishment({ id: slug })
        });
    },

    establishmentsPhotosIndex: function (id) {
        var slug = window.location.pathname.replace(/\/photos/, '').replace(/.*\//, '');
        this.setup();
        this.currentView = new EstablishmentsPhotosIndexView({ 
            el: '#main_container',
            model: new Establishment({ id: slug })
        });
    },

    usersShow: function (id, section) {
        this.setup();
        this.currentView = new UsersShowView({
            el: '#main_container', 
            model: new User({ id: id }),
            section: section
        });
    },

    usersSearch: function () {
        this.setup();
        this.currentView = new UsersSearchView({ el: '#main_container' });
    },

    editProfile: function () {
        attachEditProfileEvents();
    },

    findFacebookFriends: function () {
        this.setup();
        this.currentView = new UsersFindFacebookFriendsView({ 
            el: '#main_container',
            model: new User({ id: CurrentUser.get('id') }) 
        });
    },

    nothing: function () {
    }
});

App = new Router();

// why is this here
$(window).on("popstate", function(e) { 
    if (e.originalEvent.state !== null) { 
        e.preventDefault(); 
    } 
});

$(document).ready(function () {
    new ApplicationHeaderView({ el: 'header' });

    Backbone.history.start({ pushState: true });
    // Backbone.history.start({ pushState: true, hashChange: false }); enable when you start worrying about IE 9 and under
});
