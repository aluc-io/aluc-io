const elTimerBox = document.getElementById('timerBox')
const elTimer = document.getElementById('timer')
const elStart = document.getElementById('start')
elTimer.style.color = 'white'
elTimer.style.width = '200px'
elTimer.style.height = '50px'
elTimer.style.backgroundColor = 'blue'
elTimer.style.fontSize = '30px'
elTimer.style.textAlign = 'center'
elTimer.style.lineHeight = '50px'
elTimer.style.display = 'none'

elStart.style.color = 'white'
elStart.style.width = '200px'
elStart.style.height = '50px'
elStart.style.backgroundColor = 'blue'
elStart.style.fontSize = '30px'
elStart.style.textAlign = 'center'
elStart.style.lineHeight = '50px'
elStart.style.cursor = 'pointer'
elStart.style.display = 'none'

setTimeout( () => {
  const elStart2 = document.getElementById('start')
  elStart2.addEventListener('click', () => {
    elStart2.style.display = 'none'
    run()
  })
})

const duration = 210 * 1000
const start = Date.now()

const run = () => {
  const elTimer2 = document.getElementById('timer')
  elTimer2.style.display = 'block'
  setInterval(() => {
    const ms = duration - (Date.now() - start)
    elTimer2.innerText = `${getMin(ms)}:${getSec(ms)}:${getMS(ms)}`
  }, 0)
}

const referenceWidth = 908
const referenceHeight = 681
const referenceRatio = referenceWidth / referenceHeight

const containerWidth = window.innerWidth
const containerHeight = window.innerHeight
console.log(containerWidth, containerHeight)
const ratio = { width: 4, height: 3, ratio: 4/3 }
const dimensions = {
  width: Math.floor(referenceWidth / referenceRatio * ratio.ratio),
  height: referenceHeight,
};

if (containerWidth / ratio.width > containerHeight / ratio.height) {
  scale = containerHeight / dimensions.height;
} else {
  scale = containerWidth / dimensions.width;
}

const scaledWidth = dimensions.width * scale;
const scaledHeight = dimensions.height * scale;
const left = (containerWidth - scaledWidth) / 2;
const _top = (containerHeight - scaledHeight) / 2;

elTimerBox.style.width = '908px'
elTimerBox.style.height = '0px'
elTimerBox.style.position = 'absolute'
elTimerBox.style.backgroundColor = 'red'
elTimerBox.style['-webkit-transform'] = 'scale(' + scale + ')';
elTimerBox.style.MozTransform = 'scale(' + scale + ')';
elTimerBox.style.left = Math.max(left, 0) + 'px';
elTimerBox.style.top = Math.max(_top, 0) + 'px';
elTimerBox.style.transformOrigin = 'top left'
elTimerBox.style.WebkitTransformOrigin = 'top left'
elTimerBox.style.zIndex = 999


const getMin = (ms) => {
  const min = Math.floor(((ms - ms % 1000) / 1000) / 60)
  return min < 10 ? `0${min}` : String(min)
}
const getSec = (ms) => {
  const sec = ((ms - ms % 1000) / 1000) % 60
  return sec < 10 ? `0${sec}` : String(sec)
}
const getMS = (ms) => {
  const _ms = Math.floor((ms % 1000) / 10)
  return _ms < 10 ? `0${_ms}` : String(_ms)
}

const slideshow = remark.create({
  ratio: '4:3',
  navigation: {
    scroll: false,
  },
})


const handleScroll = (e) => {
  const elFootnote = document.querySelector('body > div.remark-slides-area > div.remark-slide-container.remark-visible > div.remark-slide-scaler .footnote')
  const elPageNumber = document.querySelector('body > div.remark-slides-area > div.remark-slide-container.remark-visible > div.remark-slide-scaler .remark-slide-number')
  if (e.target.scrollTop > 20) {
    if (elFootnote) elFootnote.style.display = 'none'
    elPageNumber.style.display = 'none'
  } else {
    if (elFootnote) elFootnote.style.display = 'block'
    elPageNumber.style.display = 'block'
  }
}

slideshow.on('showSlide', function (slide) {
  console.log(slide)
  console.log(slide.getSlideIndex())
  const classArr = (slide.properties.class || '').split(',').map( str => str.trim() )
  if (classArr.includes('scroll')) {
    setTimeout( () => {
      const elPageNumber = document.querySelector('body > div.remark-slides-area > div.remark-slide-container.remark-visible > div.remark-slide-scaler .remark-slide-number')
      elPageNumber.innerText = elPageNumber.innerText.replace(/⬇️$/,'') + ' ⬇️'

      const el = document.querySelector('body > div.remark-slides-area > div.remark-slide-container.remark-visible > div.remark-slide-scaler')
      el.style.overflowY = 'scroll'
      el.removeEventListener('scroll', handleScroll)
      el.addEventListener('scroll', handleScroll)
    })
  }
});
