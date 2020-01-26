/*******************************************************************/
/* Common */
/*******************************************************************/


/*******************************************************************/
/* Barba */
/*******************************************************************/

import barba from '@barba/core'
import barbaPrefetch from '@barba/prefetch'
import ScrollMagic from './ScrollMagic.min.js'
import slideFunc from './slide'

barba.use(barbaPrefetch)

const replaceHeadTags = target => {
  const head = document.head
  const targetHead = target.html.match(/<head[^>]*>([\s\S.]*)<\/head>/i)[0]
  const newPageHead = document.createElement('head')
  newPageHead.innerHTML = targetHead
  const removeHeadTags = [
    "meta[name='description']",
    "meta[property^='fb']",
    "meta[property^='og']",
    "meta[name^='twitter']",
    "meta[name='robots']",
    'meta[itemprop]',
    'link[itemprop]',
    "link[rel='prev']",
    "link[rel='next']",
    "link[rel='canonical']",
  ].join(',')
  const headTags = head.querySelectorAll(removeHeadTags)
  headTags.forEach(item => {
    head.removeChild(item)
  })
  const newHeadTags = newPageHead.querySelectorAll(removeHeadTags)
  newHeadTags.forEach(item => {
    head.appendChild(item)
  })

  if (typeof ga === 'function') {
    ga('send', 'pageview', location.pathname);
  }
}

barba.init({
  transitions: [{
    sync: true,
    leave(data) {
      const timeLine = new TimelineMax()
      const done = this.async()
      timeLine.to(window, .3, {
        scrollTo: {y: 0, autoKill: false},
        ease: Quad.easeInOut,
      })
      .to(data.current.container, .3, {
        autoAlpha: 0,
        delay: .2,
        display: 'none',
        ease: Quad.easeInOut,
        onComplete: done,
      })
    },
    beforeEnter({ next }) {
      replaceHeadTags(next)
    },
    enter(data) {
      const done = this.async()
      TweenMax.from(data.next.container, .1, {
        autoAlpha: 0,
        delay: .5,
        display: 'none',
        ease: Quad.easeInOut,
        onComplete: done,
      })
      setTimeout(ScrollFade, 700)
      setTimeout(slideFunc, 800)
    }
  }]
})

const eventDelete = e => {
  if (e.currentTarget.href === window.location.href) {
    e.preventDefault()
    e.stopPropagation()
    return
  }
}

const links = [...document.querySelectorAll('a[href]')]
links.forEach(link => {
  link.addEventListener('click', e => {
    eventDelete(e)
  }, false)
})


/*******************************************************************/
/* Loading */
/*******************************************************************/

const Loading = () => {
  document.body.classList.add('is-open')
  const loading = document.querySelector('.loading')
  const loadingProgress = document.querySelector('.loading-progress')
  let counter = 0
  const Counter = setInterval(function() {
    const timeLine = new TimelineMax()
    loadingProgress.innerHTML = '' + counter + ''

    counter++

    if(counter == 101) {
      clearInterval(Counter)
      timeLine.to(loadingProgress, .3, {
        autoAlpha: 0,
        delay: .3,
        display: 'none',
        ease: Quad.easeInOut,
        y: -12,
      })
      .to(loading, .6, {
        autoAlpha: 0,
        delay: .3,
        display: 'none',
        ease: Quad.easeInOut,
        onComplete: function() {
          document.body.classList.remove('is-open')
        },
      })
      setTimeout(ScrollFade, 900)
    }
  }, 10)
}

setTimeout(Loading, 300)


/*******************************************************************/
/* Nav */
/*******************************************************************/

const headerButton = document.querySelector('.header__toggle-btn')
const headerNav = document.querySelector('.header__nav')
const headerNavLink = headerNav.querySelectorAll('.header__nav-link')

function Nav(){}
Nav.prototype.do = function(){
	this.status = headerButton.getAttribute('data-nav')
	this.status == 'close' ? this.open() : this.close()
}
Nav.prototype.open = function(){
	TweenMax.to('.header__nav-overlay', .2, {
    autoAlpha: 1,
    ease: Quad.easeInOut,
		onComplete: function(){
			document.body.classList.add('is-open')
		}
	}),
  TweenMax.to('.header__nav-list', .2, {
    autoAlpha: 1,
    delay: .1,
    ease: Quad.easeInOut,
	}),
  TweenMax.staggerTo('.header__nav-item', .6, {
    autoAlpha: 1,
    delay: .1,
    ease: Quad.easeInOut,
  }, .1)
	headerButton.setAttribute('data-nav', 'open')
}
Nav.prototype.close = function(){
  TweenMax.to('.header__nav-item', .2, {
    autoAlpha: 0,
    ease: Quad.easeInOut,
	}, .1),
  TweenMax.to('.header__nav-list', .2, {
    autoAlpha: 0,
    ease: Quad.easeInOut,
	}),
  TweenMax.to('.header__nav-overlay', .2, {
    autoAlpha: 0,
    delay: .2,
    ease: Quad.easeInOut,
    onComplete: function(){
			document.body.classList.remove('is-open')
		}
	})
	headerButton.setAttribute('data-nav', 'close');
}

const Navigation = new Nav()
headerNavLink.forEach(function(el, i) {
  el.addEventListener('click', function(e) {
  	Navigation.do(i)
  })
})
headerButton.addEventListener('click', function(e){
  e.stopPropagation()
  Navigation.do()
})


/*******************************************************************/
/* Progress */
/*******************************************************************/

function debounce(fn, delay) {
  let timer

  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn()
    }, delay)
  };
}

function throttle(fn, delay) {
  let last
  let timer

  return () => {
    const now  = +new Date

    if (last && now < last + delay) {
      clearTimeout(timer)

      timer = setTimeout(() => {
        last = now
        fn()
      }, delay)
    } else {
      last = now
      fn()
    }

  };
}

const circleSize = 44
const circleLength = circleSize * 3.14
const wrapper = document.querySelector('[data-barba="wrapper"]')
const progressImageCircle = document.querySelector('.progress__image-circle')
progressImageCircle.style.strokeDasharray = circleLength + ' ' + circleLength
progressImageCircle.style.strokeDashoffset = circleLength

function progressUpdate() {
  const currentPosition = window.pageYOffset
  const pageHeight = wrapper.getBoundingClientRect().height - window.innerHeight
  progressImageCircle.style.strokeDashoffset = circleLength - (currentPosition * circleLength / pageHeight)
}

progressUpdate()
window.addEventListener('scroll', throttle(progressUpdate, 20))
window.addEventListener('resize', debounce(progressUpdate, 20))


/*******************************************************************/
/* Fadein */
/*******************************************************************/

const ScrollFade = () => {
  const target = document.querySelectorAll('.top-intro, .page-container__right, .page-container__left, .swiper-container, .works-archive__heading, .works-archive__list-item, .works-archive__pagination, .works-single__info, .works-single__content p, .works-single__content img, .works-single__footer')
  if (target.length === null) {
    return
  }

  TweenMax.set(target, {
    autoAlpha: 0,
    y: 12,
  })

  const controller = new ScrollMagic.Controller()
  for (let i = 0; i < target.length; i++) {
    let scene = new ScrollMagic.Scene({
        triggerElement: target[i],
        triggerHook: 'onEnter',
        reverse: false,
        offset: 40,
      })
      .addTo(controller)
    scene.on('enter', () => {
      TweenLite.to(target[i], .6, {
        autoAlpha: 1,
        ease: Quad.easeInOut,
        y: 0,
      })
    })
    scene.on('end', () => {
      scene.destroy(true)
    })
  }
}


/*******************************************************************/
/* Form */
/*******************************************************************/

