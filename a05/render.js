/**
 * Course: COMP 426
 * Assignment: a05
 * Author: Ishaan Phadnis
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */



/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 * 
 */
let f = false;
export const renderHeroCard = function(hero) {
    // TODO: Copy your code from a04 to render the hero card
    return `
    <div data-id = "${hero.id}" class = "card" style = "background-color: ${hero.backgroundColor}; color: ${hero.color}">
    <h1 class = "title has-test-weight-bold" style = "color: ${hero.color}">
    Hero Name: <span> ${hero.first} ${hero.last} </span> </h1>

    <h2 class = "subtitle has-test-weight-bold" style = "color: ${hero.color}"> ${hero.name}: ${hero.subtitle}
    <p> First Appearance: ${hero.firstSeen} </p> </h2>

    <img src = ${hero.img} alt = "heroImg" />
    <p> ${hero.description} </p>
    <button type = "button" class = "edit"> Edit </button>
   
    </div>`;
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    // TODO: Copy your code from a04 to render the hero edit form
    console.log(hero);
    return `
    <form class = "temp" data-id = "${hero.id}">
    <label class = "name"> Name </label>
    <input name = name type= "text" value = "${hero.name}"> </input>
      
    <label class = "first"> First Name </label>
    <input name = first type= "text" value = "${hero.first}"> </input>
     
    <label class = "last"> Last Name </label>
    <input name = last type = "text" value = "${hero.last}"> </input>
    
    <label class = "description"> Description </label>
    <textarea name = "description"> ${hero.description} </textarea>
    
    <label class= "first app"> First Appearance </label>
    <input type= "text" value = "${hero.firstSeen}" name = "firstApp"> </input>
     
    <label class = "last app"> Last Appearance </label>
    
    <button id = "${hero.id}" class = "cancel"> Cancel </Button>
    <button type = "submit" class = "button" id = "${hero.id}"> Submit </Button> 
    <p id = "fix"> ${hero.id} </p> 

    </form>`
};



/**
 * Handles the JavaScript event representing a user clicking on the "edit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditButtonPress = function(event) {
    // TODO: Render the hero edit form for the clicked hero and replace the
    //       hero's card in the DOM with their edit form instead

    let id = $((event.target).closest(".card")).data("id");
    console.log(id);
    $((event.target).closest(".card")).replaceWith(renderHeroEditForm(heroicData.find(h => h.id == id)));
    
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function(event) {
    // TODO: Render the hero card for the clicked hero and replace the
    //       hero's edit form in the DOM with their card instead

    event.preventDefault();
    let id = event.target.id;
    console.log(id);
    $((event.target).closest(".temp")).replaceWith(renderHeroCard(heroicData.find(h => h.id == id)));
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function(event) {
    // TODO: Render the hero card using the updated field values from the
    //       submitted form and replace the hero's edit form in the DOM with
    //       their updated card instead

    event.preventDefault();
    let thH;
    let tid= event.target.id;
    let form = $(".temp").serializeArray();
    let date = new Date(form[4].value)
    date = new Date(date.getFullYear(), date.getMonth())
    heroicData.forEach(x => {
        if(x.id == tid){
            x.name = form[0].value;
            x.first = form[1].value;
            x.last = form[2].value;
            x.description = form[3].value;
            x.firstSeen = date;
            thH = x;
        }
    });
    $((event.target).closest(".temp")).replaceWith(renderHeroCard(thH));
};



/**
 * Given an array of hero objects, this function converts the data into HTML,
 *     loads it into the DOM, and adds event handlers.
 * @param  heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()
    //       NOTE: Copy your code from a04 for this part

    // TODO: Append the hero cards to the $root element
    //       NOTE: Copy your code from a04 for this part

    for (let i = 0; i < heroes.length; i++) {
        $root.append(renderHeroCard(heroes[i]));
    }

    // TODO: Use jQuery to add handleEditButtonPress() as an event handler for
    //       clicking the edit button

    $root.on("click", ".edit", handleEditButtonPress);

    // TODO: Use jQuery to add handleEditFormSubmit() as an event handler for
    //       submitting the form

    $root.on("click", ".button", handleEditFormSubmit);

    // TODO: Use jQuery to add handleCancelButtonPress() as an event handler for
    //       clicking the cancel button
    $root.on("click", ".cancel", handleCancelButtonPress);
   
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
});
