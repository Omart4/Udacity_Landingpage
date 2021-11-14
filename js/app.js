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
    list.appendChild(anchor)
    navbar.appendChild(list)

    links = document.querySelectorAll('a')

    count++
}

//This function checks if a section is in view port and its exectution happens in the event listener at the bottom
let isInViewport = function(elem) {
    let distance = elem.getBoundingClientRect();
    return (
       distance.top >= 0 &&
       distance.left >= 0 &&
       distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
       distance.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

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
   // add event on scroll
   let findMe = document.querySelectorAll('.sakashen');
   findMe.forEach(element => {
      //for each .sakashen
      if (isInViewport(element)) {
        //This line of code gets the id of the section in view while adding '#' in front of it
        let link = `#${element.getAttribute('id')}`
        //Using the links variable we loop through each element and get its href value 
        links.forEach((e)=>{
            /*If the href value equals the value of link, the navbar a item will have an id of active or act in short
            I chose to add an id because it's more specific. This bit of code should work exactly as the active section part*/ 
            if(link===e.getAttribute('href')){
                e.setAttribute('id','act')
            }else{
                e.removeAttribute('id','act')
            }
        }) 
        //if in Viewport
        element.classList.add("your-active-class");
      }else{
        element.classList.remove('your-active-class')
      }
   });
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
