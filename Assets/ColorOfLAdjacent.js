// Knod 09/15/13
// !!! This will only work if there's only one wire because...
// all the variables are public, so they will be replaced each...
// time a new wire is created

// Units that inherit the color of the unit to the left of them
// The units that have this now have a WireUnit script too...
// because I have to make everything work with WireUnit

#pragma strict

public var inputUnit: GameObject;
public var outputUnit: GameObject;
public var myColor: Color;

function Start () {
	myColor = renderer.material.GetColor("_Color");
}


function Update () {
}


// Get the color of the wireUnit on the left, match it, then tell the unit to the
// right to do the same
function passTheColor () {
//	Debug.Log("Got in passTheColor");
//	Debug.Log(inputUnit);
	// If inputWireUnit has a value (Mixxit, pengo, and SaraDT_)
	if (inputUnit != null) {
		// Debug.Log(gameObject.name + "'s input is " + inputUnit.name);
		// make that unit's myColor value into this unit's myColor value
		myColor = inputUnit.gameObject.GetComponent.<ColorOfLAdjacent>().myColor;
		renderer.material.color = myColor;
		// Debug.Log(renderer.material.GetColor("_Color"));
	}

	// If outputWire has a value
	if (outputUnit != null) {
		Debug.Log(gameObject.name + "'s output is to " + outputUnit.name);
		// make that unit run the same method
		outputUnit.GetComponent.<ColorOfLAdjacent>().passTheColor();
	}
}