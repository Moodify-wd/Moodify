function moodSelector(){
    var pickedMood=document.getElementById("moodValue");
    var userMood=pickedMood.options[pickedMood.selectedIndex].value;
    console.log("Your selected mood was: " + userMood);
    if (userMood=="happy"){
        alert("Variable works");
    }
}