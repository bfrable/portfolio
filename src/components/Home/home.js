import Vue from 'vue';
import template from './home.html';
import Navigation from 'components/Navigation/navigation';
import HeaderBar from 'components/Header/header';

export default Vue.extend({
  template,

  data(){
    return ({
      title: 'About Me',
      content: 'My name is Brett Frable. I bring a unique perspective to front end development and user interface design. Each position I have held has transmuted my skill-set and goals towards forward-thinking technology. I am obsessed with expanding my craft, solving challenging problems and staying on the bleeding edge.'
    })
  },

  mounted() {
    this.button =  this.$el.querySelector('.js-resume');

    this.makeGlitch();
  },

  methods: {
    makeGlitch() {
      this.button.addEventListener('mouseover', function() {
        let background = document.querySelectorAll('.background-3');

        for (let i = 0; i < background.length; i++) {
          background[i].classList.add('is-glitch');
        }
      });

      this.button.addEventListener('mouseleave', function() {
        let background = document.querySelectorAll('.background-3');

        for (let i = 0; i < background.length; i++) {
          background[i].classList.remove('is-glitch');
        }
      });
    }
  },

  components: {
    Navigation,
    HeaderBar
  }
});
