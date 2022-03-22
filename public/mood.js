// function to initate playlist creation. Gets called when the "generate" button is clicked.
function moodSelector(){

    //gets the contents of element "moodValue"
    var pickedMood=document.getElementById("moodValue");
    
    //gets the users SELECTED mood from moodValue list
    var userMood=pickedMood.options[pickedMood.selectedIndex].value;

    // gets the content of element... by id..
    var moodDiv=document.getElementById("moodSelector");
    var moodHeading=document.getElementById("heading2");

    // debug purposes to check correct selection is being assigned to userMood
    console.log("Your selected mood was: " + userMood);

    // switch statement for userMood.. eventually will be used to generate playlist based on picked mood.
    switch (userMood){
        case "happy":
        moodHeading.innerHTML="";
        moodDiv.innerHTML="You are happy!";
        break;

        case "sad":
        moodDiv.innerHTML="You are sad!";
        break;

        case "angry":
        moodDiv.innerHTML="You are angry!";
        break;

        case "heartbroken":
        moodDiv.innerHTML="You are heartbroken!";
        break;
    }
}