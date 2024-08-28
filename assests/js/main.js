/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*===== BUTTON RIPPLE EFFECT =====*/ 

document.addEventListener("DOMContentLoaded", () => {
    const btnEl = document.querySelector(".btn");

    btnEl.addEventListener("click", (event) => {
        const x = event.pageX - btnEl.offsetLeft;
        const y = event.pageY - btnEl.offsetTop;

        btnEl.style.setProperty("--xPos", x + "px");
        btnEl.style.setProperty("--yPos", y + "px");

        btnEl.classList.remove('ripple-active');
        void btnEl.offsetWidth;
        btnEl.classList.add('ripple-active');
    });
});

/*===== AUTO TEXT EFFECT ANIMATION =====*/

const containerEl = document.querySelector(".container");
const careers = ["Copywriter", "Developer", "Designer", "Freelancer"];

let careerIndex = 0;
let characterIndex = 0;

function updateText() {
  characterIndex++;
  containerEl.textContent = `#${careers[careerIndex].slice(0, characterIndex)}`;

  if (characterIndex === careers[careerIndex].length) {
    careerIndex++;
    characterIndex = 0;
  }

  if (careerIndex === careers.length) {
    careerIndex = 0;
  }

  setTimeout(updateText, 200);
}

updateText();

/*==================== REMOVE MENU MOBILE ====================*/

const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200});

/*==================== GEOLOCALISATION ====================*/

document.querySelector('.contact__form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            // Append geolocation to the message
            const messageField = document.getElementById('message');
            const locationData = `\n\n[Geolocation: Latitude ${position.coords.latitude}, Longitude ${position.coords.longitude}]`;
            messageField.value += locationData;
            
            e.target.submit(); // Submit the form after appending the geolocation
        }, function() {
            alert("Unable to retrieve your location.");
            e.target.submit(); // Submit the form without geolocation if there's an error
        });
    } else {
        alert("Geolocation is not supported by this browser.");
        e.target.submit(); // Submit the form without geolocation if not supported
    }
});
