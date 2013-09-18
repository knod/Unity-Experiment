// Knod 09/15/13
// Each wire unit's behavior, color controls right now
// Gets activated initially by ColorInherit.js (which will be in the...
// gates later on.

#pragma strict

var id : String = "wireUnit";
var inputUnit: GameObject;
var outputUnit: GameObject;
var myColor: Color;

function Start () {
	myColor = renderer.material.GetColor("_Color");
	Debug.Log(myColor);
}


function Update () {
}


// Somehow make it so that a wire is the same color as the wire before it. From ColorOfLAdjacent.js
// Get the color of the wire unit on the left, match it, then tell the unit to the
// right to do the same
function passTheColor () {
	//	Debug.Log("Got in passTheColor");
	//	Debug.Log(inputUnit);
	// If inputWireUnit has a value (Mixxit, pengo, and SaraDT_)
	if (inputUnit != null) {
		Debug.Log(gameObject.name + "'s input is " + inputUnit.name);
		// make that unit's myColor value into this unit's myColor value
		Debug.Log("Changed to color: " + inputUnit.gameObject.GetComponent.<WireUnit>().myColor);
		myColor = inputUnit.gameObject.GetComponent.<WireUnit>().myColor;
		Debug.Log("Changed now: " + myColor);
		renderer.material.color = myColor;
		// Debug.Log(renderer.material.GetColor("_Color"));
	}

	// If outputWire has a value
	if (outputUnit != null) {
		// Debug.Log(gameObject.name + "'s output is to " + outputUnit.name);
		// make that unit run the same method
		outputUnit.GetComponent.<WireUnit>().passTheColor();
	}
}

function OnMouseDown() {
	Debug.Log("Input unit/output unit: " + inputUnit + ", " + outputUnit);
}

// <pommak_> if you do that, try using .sharedMaterial, it should help