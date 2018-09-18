import Vue from 'vue';
import axios from 'axios-jsonp-pro';
import template from './instagram.html';

import Spotify from 'spotify-web-api-node'
import VueSpotify from 'vue-spotify'

export default Vue.extend({
  template,

  data() {
      return {
        token: '10943834.1677ed0.d36efcf202f744dcb8edeceba1053ca5',
        id:    '10943834'
      };
  },

  mounted: function() {
    this.endpoint        = 'https://api.instagram.com/v1/users/' + this.id + '/media/recent/?access_token=' + this.token + '&count=30',
    this.images          = [],
    this.trigger         = document.body.querySelector('.ig-trigger'),
    this.photos          = this.$el.querySelector('.js-ig-photos'),
    this.feed            = this.$el.querySelector('.ig-feed'),
    this.activePhotoCont = this.$el.querySelector('.ig-feed__active-photo'),
    this.activeImgCont   = this.$el.querySelector('.ig-feed__single-photo'),
    this.closeFeed       = this.$el.querySelector('.js-close-feed'),
    this.closePhoto      = this.$el.querySelector('.ig-feed__close-active-photo'),
    this.activePhoto     = false;

    this.init();
  },

  methods: {
    getPhotos() {
        this.feed.style.display = 'block';
        this.feed.style.opacity = 1;

        axios.jsonp(this.endpoint)
          .then(data => {
            let items = data.data;

            items.forEach((item) => {
              this.images.push(item.images.standard_resolution.url);
            });

          })
          .then(() => {

            this.loadPhotos();
            this.animatePhotos(150);
            this.displayActivePhoto();

            this.closeFeed.addEventListener('click', (e) => {
              this.hidePhotos();
              e.preventDefault();
            });

            this.closePhoto.addEventListener('click', () => {
              if (this.activePhoto) {
                this.closeActivePhoto();
              }
            });
          })
          .catch(function (error) {
            console.log(error);
          });
    },
    loadPhotos() {
        this.images.forEach((url) => {
        this.photos.innerHTML += `
            <div class="ig-feed__photo js-ig-photo column medium-2 small-3">
                <img src="${url}" />
            </div>`;
        });
    },
    animatePhotos(time) {
        let photo = this.$el.querySelectorAll('.js-ig-photo');

        for (let i = 0; i < photo.length; i++) {
            setTimeout(() => {
                photo[i].className += ' visible animated fadeInLeftBig';
            }, 500 + (i * time));
        }
    },
    displayPhotos() {
        setTimeout(() => {
            document.body.className += ' ig-feed-open';
        }, 1000);

        this.getPhotos();
    },
    displayActivePhoto() {
        let photo = this.$el.querySelectorAll('.js-ig-photo');

        for (let i = 0; i < photo.length; i++) {
            photo[i].addEventListener('click',() => {
                let imgSrc = photo[i].children[0].currentSrc;

                if (!this.activePhoto) {
                    this.activePhoto = true;
                    this.activePhotoCont.classList.add('open');
                    this.activeImgCont.innerHTML = `<img src="${imgSrc}" />`;
                } else {
                    this.ig.activeImgCont.innerHTML = `<img src="${imgSrc}" />`;
                }
            });
        }
    },
    closeActivePhoto() {
        this.activePhoto = false;
        this.activeImgCont.innerHTML = '';
        this.activePhotoCont.classList.remove('open');
    },
    hidePhotos() {
        this.feed.style.opacity = 0;
        document.body.className = '';
        this.images = [];

        if (this.activePhoto) {
            this.closeActivePhoto();
        }

        setTimeout(() => {
            this.feed.style.display = 'none';
            this.photos.innerHTML = '';
        }, 1000);
    },
    init() {

        Vue.use(VueSpotify, new Spotify())

        this.trigger.addEventListener('click', (e) => {
            this.displayPhotos();
            e.preventDefault();
        });
    }
  }
});
