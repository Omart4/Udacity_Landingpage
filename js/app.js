//Start of global variables
const navbar = document.getElementById('navbar__list');
const sections = document.getElementsByTagName('section');
var body = document.body;
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
        newElm.appendChild(newAnchor);
        navbar.appendChild(newElm);
    }
}
//the calling of the previous function
navCreate()

//This function is called when scrolling past a y point of 250px and is being called at the event listener at the bottom
//It Hides and shows the Navbar depending on the current viewport if above y=250px it's hidden
function navShow(){
    let y = body.scrollTop
    let heading = document.getElementById('headinger')
    if(y>250){
        heading.style.display = 'block'
        heading.style.transition = 'all 0.3s linear'
    }
    else{
        heading.style.display = 'none'
    }
}
//This function is an experiment of mine where i create a new section and this section is named accordingly to it's order
let main = document.getElementById('mainer');
let count = 4;
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
    list.appendChild(anchor)
    navbar.appendChild(list)

    count++
}

//This function checks if a section is in view port and its exectution happens in the event listener at the bottom
var isInViewport = function(elem) {
    var distance = elem.getBoundingClientRect();
    return (
       distance.top >= 0 &&
       distance.left >= 0 &&
       distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
       distance.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};


//End of Functions

//Start of Event Listeners
window.addEventListener('scroll', function(event) {
    navShow()
   // add event on scroll
   var findMe = document.querySelectorAll('.sakashen');
   findMe.forEach(element => {
      //for each .sakashen
      if (isInViewport(element)) {
         //if in Viewport
         element.classList.add("your-active-class");
      }else{
          element.classList.remove('your-active-class')
      }
   });
});
//Onclick this creates a new Section
document.getElementById('submit').addEventListener('click',createSection)
//End of Event Listeners
