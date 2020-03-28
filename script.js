const filterItems = document.querySelectorAll('.portfolio-filter-item')
const menu = document.getElementById('menu')
const menuItems = menu.querySelectorAll('a')
const portfolio = document.getElementById('portfolio')
const portfolioNav = portfolio.querySelector('.portfolio-filter')
const portfolioNavItems = portfolioNav.querySelectorAll('.portfolio-filter-item')
const portfolioList = portfolio.querySelector('.portfolio-list')
const portfolioItems = portfolioList.querySelectorAll('.portfolio-item')


function addClass(item, className) {
  item.classList.add(className)
}

function removeClass(item, className) {
  item.classList.remove(className)
}
function scrollTo(id) {
  document.getElementById(`${id}`).scrollIntoView({
    behavior: 'smooth'
  })
}

{
  // Menu & Hamburger menu
  const hamburger = document.querySelector('.hamburger')
  const nav = document.querySelector('.nav-mobile')
  const logo = document.querySelector('.logo-mobile')

  function toggleMobileMenu() {
    hamburger.classList.toggle('is-rotate')
    nav.classList.toggle('open')
    logo.classList.toggle('open')
  }

  menu.addEventListener('click', e => {
    menuItems.forEach(el => removeClass(el, 'active'))
    addClass(e.target, 'active')
    scrollTo(e.target.getAttribute('data-id'))
    if (window.innerWidth < 768) {
      toggleMobileMenu()
    }
  })

  hamburger.addEventListener('click', e => {
    toggleMobileMenu()
  })
}

// portfolioNav.addEventListener('click', e => {
//   portfolioNavItems.forEach(el => removeClass(el, 'active'))
//   addClass(e.target, 'active')
//   changeArrayItemsPosition(portfolioItems)
// })

portfolioNav.addEventListener('click', e => {
  portfolioNavItems.forEach(el => removeClass(el, 'active'))
  addClass(e.target, 'active')
  for (let i = portfolioList.children.length; i >= 0; i--) {
    portfolioList.appendChild(portfolioList.children[Math.random() * i | 0]);
  }
})

portfolioList.addEventListener('click', e => {
  portfolioItems.forEach(el => removeClass(el, 'selected'))
  addClass(e.target, 'selected')
})

// detect elem = isInViewport
{
  const slider = document.getElementById('slider')
  const services = document.getElementById('services')
  const portfolio = document.getElementById('portfolio')
  const about = document.getElementById('about')
  const contact = document.getElementById('contact')

  const isInViewport = function (elem) {
    const bounding = elem.getBoundingClientRect()
    // console.log(bounding)
    return (bounding.top >= -bounding.height / 2 && bounding.top <= bounding.height / 2)
  }

  window.addEventListener('scroll', () => {
    const removeAndAdd = elemId => {
      menuItems.forEach(el => removeClass(el, 'active'))
      addClass(menu.querySelector(`a[data-id=${elemId}]`), 'active')
    }
    if (isInViewport(slider)) {
      removeAndAdd("slider")
    }
    if (isInViewport(services) && !isInViewport(slider)) {
      removeAndAdd("services")
    }
    if (isInViewport(portfolio) && !isInViewport(services)) {
      removeAndAdd("portfolio")
    }
    if (isInViewport(about) && !isInViewport(portfolio)) {
      removeAndAdd("about")
    }
    if (isInViewport(contact) && !isInViewport(about)) {
      removeAndAdd("contact")
    }
  }, false)
}


// detect elem = isInViewport


function getRandomDataId(items) {
  return Math.floor(Math.random() * items + 1)
}

function getRandomNumber(num) {
  return Math.ceil(Math.random() * (num - 1))
}

function getnextNthDataId(id, num) {
  return id + num
}

function changeArrayItemsPosition(children) {
  let array = [...children]
  let num = getRandomNumber(array.length)
  for (let i = 0; i < array.length; i++) {
    let dataId = +array[i].getAttribute('data-id')
    let firstId = 1
    let lastId = 12
    let resId = null

    if (dataId >= firstId && dataId <= lastId - num) {
      resId = dataId + num
    }
    if (dataId + num > lastId) {
      resId = dataId + num - lastId
    }
    array[i] = array[i].setAttribute('data-id', resId)
  }
}


// Turn off phone
const phone1 = document.querySelector('.turn1')
const phone2 = document.querySelector('.turn2')
const turnOff1 = document.querySelector('.turn-off-1')
const turnOff2 = document.querySelector('.turn-off-2')

phone1.addEventListener('click', e => {
  turnOff1.classList.toggle('opacity-1')
})
phone2.addEventListener('click', e => {
  turnOff2.classList.toggle('opacity-1')
})


// slider block
{
  /*
  const slider = document.getElementById('slider')
  let sliderStyles = getComputedStyle(slider)

  const sliderWrap = document.querySelector('.slider-wrap')

  const prevBtn = sliderWrap.querySelector('.slider-prev')
  const nextBtn = sliderWrap.querySelector('.slider-next')

  let slideIndex = 1
  showSlides(slideIndex)

  function swipeSlide(n) {
    showSlides(slideIndex += n)
    let bgColor = sliderStyles.backgroundColor
    if (bgColor === 'rgb(240, 108, 100)') {
      slider.style.backgroundColor = 'rgb(100, 139, 240)'
    } else {
      slider.style.backgroundColor = 'rgb(240, 108, 100)'
    }
  }

  function showSlides(n) {
    let i
    let slides = sliderWrap.querySelectorAll(".slide")

    if (n > slides.length) {
      slideIndex = 1
    }
    if (n < 1) {
      slideIndex = slides.length
    }
    for (let slide of slides) {
      slide.style.opacity = "0"
    }
    slides[slideIndex - 1].style.cssText = "opacity: 1;"
  }
  */
}
{
  const slider = document.getElementById('slider')
  const sliderWrap = slider.querySelector('.slider-wrap')
  const slideItems = sliderWrap.querySelectorAll('.slide')

  const prevBtn = sliderWrap.querySelector('.slider-prev')
  const nextBtn = sliderWrap.querySelector('.slider-next')

  let currentItem = 0
  let isEnabled = true

  function changeCurrentItem(n) {
    currentItem = (n + slideItems.length) % slideItems.length
  }

  function showItem(direction) {
    slideItems[currentItem].classList.add('next', direction)
    slideItems[currentItem].addEventListener('animationend', function () {
      this.classList.remove('next', direction)
      this.classList.add('active')
      isEnabled = true
    })
  }

  function hideItem(direction) {
    isEnabled = false
    slideItems[currentItem].classList.add(direction)
    slideItems[currentItem].addEventListener('animationend', function () {
      this.classList.remove('active', direction)
    })
  }

  function prevItem(n) {
    hideItem('to-right')
    changeCurrentItem(n - 1)
    showItem('from-left')
  }

  function nextItem(n) {
    hideItem('to-left')
    changeCurrentItem(n + 1)
    showItem('from-right')
  }

  prevBtn.addEventListener('click', () => {
    if (isEnabled) {
      prevItem(currentItem)
    }
  })

  nextBtn.addEventListener('click', () => {
    if (isEnabled) {
      nextItem(currentItem)
    }
  })
}
// slider block end



// submit form
{
  const submitBtn = document.querySelector('.submit-btn')
  const closeSubmitBtn = document.getElementById('close-submit-modal')

  const name = document.querySelector('#inputName')
  const email = document.querySelector('#inputEmail')
  const subject = document.querySelector('#inputSubject')
  const desc = document.querySelector('#description')

  let nameVal
  let emailVal
  let subjectVal
  let descVal

  name.oninput = () => nameVal = name.value
  email.oninput = () => emailVal = email.value
  subject.oninput = () => subjectVal = subject.value
  desc.oninput = () => descVal = desc.value

  // const modalName = document.querySelector('.modal-name')
  // const modalEmail = document.querySelector('.modal-email')
  const modalSubject = document.querySelector('.modal-subject')
  const modalDesc = document.querySelector('.modal-description')

  function addInfo() {
    subjectVal ? modalSubject.innerText = 'Тема: ' + subjectVal : modalSubject.innerText = 'Без темы'
    descVal ? modalDesc.innerText = 'Описание: ' + descVal : modalDesc.innerText = 'Без описания'
  }

  function clearInfo() {
    modalSubject.innerText = ''
    modalDesc.innerText = ''
  }

  function openModal(modalId, content) {
    const modal = document.getElementById(modalId)
    addInfo()
    modal.style.display = 'block'
  }

  function closeModal(modalId, content) {
    const modal = document.getElementById(modalId)

    name.value = ''
    nameVal = ''
    email.value = ''
    emailVal = ''
    subject.value = ''
    subjectVal = ''
    desc.value = ''
    descVal = ''

    clearInfo()
    modal.style.display = 'none'
  }

  submitBtn.addEventListener('click', (e) => {
    console.log(nameVal, emailVal)
    if (nameVal && emailVal) {
      openModal('submit-modal', '.modal-content')
    } else if (!nameVal) {
      name.style.cssText = "border:2px solid red;"
    } else if (!emailVal) {
      email.style.cssText = "border:2px solid red;"
    }
    if (nameVal) {
      name.style.cssText = "border:none;"
    }
    if (emailVal) {
      email.style.cssText = "border:none;"
    }
  })
  closeSubmitBtn.addEventListener('click', e => closeModal('submit-modal', '.modal-content'))
}
