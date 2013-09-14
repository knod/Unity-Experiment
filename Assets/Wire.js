#pragma strict

// Set the variables for the color of the wire
public var red : float = 1;
public var green : float = 0;
public var blue : float = 0;
public var id : String = "wire";

function Start () {
	renderer.material.color = Color(red, green, blue, 1);
}


function Update () {
}

// Testing changing the wire's color
function OnMouseDown()
{
  green += 0.5;
  renderer.material.color = Color(red, green, blue, 1);
}

// Somehow make it so that a wire is the same color as the wire before it.


