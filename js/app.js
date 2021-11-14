//Start of global variables
const navbar = document.getElementById('navbar__list');
const sections = document.getElementsByTagName('section');
const body = document.body;
let topButton = document.getElementById('toTop');
//End of global variables

//Start of functions
//This function creates a navbar based on available sections on load
function navCreate(){
    //Using a for loop to iterate through the array of current section in variable 'sections'
    for(let i=1 ; i<=sections.length;i++){
        const newElm = document.createElement('li')
        const newAnchor = document.createElement('a')
        newAnchor.textContent = `Section ${i}`
        newAnchor.href = `#section${i}`
        newAnchor.setAttribute('data-link',`section${i}`)
        newElm.appendChild(newAnchor);
        navbar.appendChild(newElm);
    }
}
//the calling of the previous function
navCreate()

//This function is called when scrolling past a y point of 250px and is being called at the event listener at the bottom
//It Hides and shows the Navbar as well as the scroll to top button depending on the current viewport if above y=250px it's hidden
function navShow(){
    let y = body.scrollTop
    let heading = document.getElementById('headinger')
    if(y>250){
        heading.style.display = 'block'
        topButton.style.display = 'block'
    }
    else{
        heading.style.display = 'none'
        topButton.style.display = 'none'
    }
}
//This function is an experiment of mine where i create a new section and this section is named accordingly to it's order
let main = document.getElementById('mainer');
let count = 4;
let links = document.querySelectorAll('a')
function createSection(){
    //Variables
    let newSection = document.createElement('section');
    let sectionDiv = document.createElement('div');
    let heading = document.createElement('h2');
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');
    let list = document.createElement('li')
    let anchor = document.createElement('a');

    //Filling in the blanks
    heading.textContent = `Section ${count}`
    p1.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod."
    p2.textContent = "Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non."

    //Adding the sections attributes
    newSection.className = 'sakashen'
    newSection.setAttribute('id',`section${count}`)
    newSection.setAttribute('data-nav',`Section ${count}`)
    sectionDiv.className = "landing__container"


    //Appending the section structure
    sectionDiv.appendChild(heading)
    sectionDiv.appendChild(p1)
    sectionDiv.appendChild(p2)
    newSection.appendChild(sectionDiv)
    main.appendChild(newSection)

    //In this part i create a new list item named according to its order and adding it to the navbar
    anchor.textContent = `Section ${count}`
    anchor.href = `#section${count}`
    anchor.setAttribute('data-link' , `section${count}`)
    list.appendChild(anchor)
    navbar.appendChild(list)

    links = document.querySelectorAll('a')

    count++
}

//This function checks if a section is in view port and its exectution happens in the event listener at the bottom

function isElementInViewport (el) {
    let rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && 
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

//This function Will enable smooth scrolling to desired section but this will only execute after pressing the button to create a new section
function scrolling(){
    links.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
    
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

//End of Functions

//Start of Event Listeners
window.addEventListener('scroll', function(event) {
    navShow()
    /*Since i couldn't use the .getBoundingClientRect() approach and while using my last remaining brain cells i figured i could use the intersection approach*/
    const callback = entries => {
        entries.forEach(entry => {
          const navListElement = document.querySelector(
            `a[data-link='${entry.target.id}']`,
          )
          const section = document.getElementById(entry.target.id)
      
          if (entry && entry.isIntersecting) {
            navListElement.classList.add('act')
            section.classList.add('your-active-class')
          } else {
            if (navListElement.classList.contains('act')) {
              navListElement.classList.remove('act')
            }
      
            if (section.classList.contains('your-active-class')) {
              section.classList.remove('your-active-class')
            }
          }
        })
      }
      
      // Options for the observer.
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.6,
      }
      const seks = document.querySelectorAll('section');
    
      // Setting an observer with options and a callback which checks if the navelement should be active
      const observer = new IntersectionObserver(callback, options)
      seks.forEach(el => {
        observer.observe(document.getElementById(el.id))
      })
   // add event on scroll
});
//Onclick this creates a new Section
document.getElementById('submit').addEventListener('click',function(){
    createSection()
    scrolling()
})
topButton.addEventListener('click',function(){
    window.scrollTo({top: 0, behavior: 'smooth'});

})

/*This bit of code unlike the scrolling function should execute onload the reason i used this twice is because the links variable couldn't update
 after each click on the create section button*/ 
scrolling()
//End of Event Listeners
