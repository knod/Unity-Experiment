// Knod 09/18/13
// Gate detects left and right side, transfers colors when it...
// is connected to wires, reverts colors when it is disconnected.

#pragma strict

// Let's me make a List
import System.Collections.Generic;

// Is the connector touching any wires on it's left?
public var inputConnected : boolean = false;
// Is the connector touching any wires on it's right?
public var outputConnected : boolean = false;
// The wire units that become connected
public var inputUnit: GameObject;
public var outputUnit: GameObject;

// Color retrived from a wire unit
public var newColor : Color;
// Where the collision of those objects occured in world space
public var wireContactPoint : Vector3;
// x value of the point on which the collision accured in local space
public var localSpacePointX : float;


function Start () {

}

function Update () {

}


// When the logic gate object collides with something
function OnCollisionEnter (someWire : Collision) {
	// Debug.Log("Is Collided");
	// Test that we're colliding with a wire
	if (someWire.gameObject.GetComponent.<WireUnit>().id == "wireUnit") {
		//Debug.Log("Is WireUnit");
		// Get the contact point (which is in world space - NCarter)
		wireContactPoint = someWire.contacts[0].point;
		// Translate that to local space - NCarter
		localSpacePointX = transform.InverseTransformPoint(wireContactPoint).x;

		// If the x value of the contact point is negative, it's on the left side, the input side
		if (localSpacePointX <= 0) {
			Debug.Log("Is negative");
			// Make a record that this is the inputUnit
			inputUnit = someWire.gameObject;
			Debug.Log("inputUnit: " + inputUnit);
			
			// Set the fact that the left side is connected to true
			inputConnected = true;
			// Get the color of the inputUnit
			// Deozaan's, DeoDroid's, and NCarter's help
			newColor = inputUnit.GetComponent.<WireUnit>().myColor;

			// If there is a right contact point too
			if (outputConnected) {
				Debug.Log("In if (outputConnected)");
				// Send it the new color input and set off the chain of color change
				SendColor(newColor, outputUnit);
			}
		}

		// If the x value of the contact point is positive, it's on the right side, the output side
		if (localSpacePointX > 0) {
			Debug.Log("Is positive");
			// Make a record that this is the outputUnit
			outputUnit = someWire.gameObject;
			Debug.Log("outputUnit: " + outputUnit);

			// Set the fact that the left side is connected to true
			outputConnected = true;
			
			// If there is a left contact point too
			if (inputConnected) {
				Debug.Log("In if (inputConnected)");
				// Send it the new color input and set off the chain of color change
				SendColor(newColor, outputUnit);
			}
		}
	}
}


// Reset all the variable states
function OnCollisionExit(someWire : Collision) {
			// When the logic gate object disconnects from this object
				// Set inputConnected to false
				// Set
}


// Give the output unit a new input for color and sett off it's color sending chain
function SendColor(newColor, outputUnit) {

}