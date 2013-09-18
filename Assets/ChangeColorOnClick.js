#pragma strict
// Knod 09/14/13: Object color starts as red. Every time the object is clicked
// a bit of green gets added (goes to orange, then yellow, then 
// I don't understand what happens)


// Set the variables for the color of the wire
public var red : float = 1;
public var green : float = 0;
public var blue : float = 0;

function Start () {
	renderer.material.color = Color(red, green, blue, 1);
}


function Update () {
}

// Testing changing the wire's color
function OnMouseDown()
{
	// Makes the color greener
  	green += 0.5;
  	// re-renders the material color so that the new green is active
  	renderer.material.color = Color(red, green, blue, 1);
}



