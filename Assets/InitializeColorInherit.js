// Knod 09/14/13
// Figuring out how to make objects inherit the color of the object...
// to their left. Goes on the "wire" - the object containing all the...
// wire units.

#pragma strict

// Lets me make a List
import System.Collections.Generic;

// This is so that I don't have to manually enter in each wire unit every time I
// make a wire.
var wireList: List.<GameObject> = new List.<GameObject>();

function Start () {
	//Debug.Log(gameObject.name);
	// UnicornForest gave initial script in C#, SeonR gave it in almost js
	// Art_Vandelay: gameObject.GetComponentsInChildren<GameObject>() will give you an array
	for (var child: Transform in transform) {
		//Debug.Log("child: " + child);
		wireList.Add(child.gameObject);
	};
	//Debug.Log("List.Count: " + wireList.Count);

	// Sort the list. This brings up a long error
	// wireList.Sort();
	
	// Testing getting objects in list
//	for (var object: GameObject in wireList) {
//	Debug.Log("Object: " + object.name);
//	};
	
	// Send each object the child object to it's left and right
	for (var unitIndex: int = 1; unitIndex < wireList.Count; unitIndex++) {
		// Debug.Log(wireList[unitIndex].name);
		// If there is an object to the left of this object
		if (unitIndex - 1 >= 0) {
			// set the object to the left as the inputUnit for this object to be able to get it's color
			wireList[unitIndex].GetComponent.<WireUnit>().inputUnit = wireList[unitIndex - 1];
		}
		
		// If there's an object to the right (if we're not going past the last index of wireList)
		if (unitIndex + 1 <= wireList.Count - 1) {
			// set the object to the right as the outputUnit for this object so that this object can
			// tell the one to it's right to run the color method.
			wireList[unitIndex].GetComponent.<WireUnit>().outputUnit = wireList[unitIndex + 1];
		}
	};

	// Start the color avalanche (each unit has the command to get the next unit to do the same)
	wireList[1].GetComponent.<WireUnit>().passTheColor();

}


function Update () {

}

// Call a function in the next item - LordNed

// Notes:
// ThomasS told me to drag objects into an empty object (I found out in hierarchy)...
// in order to make them move as a group
// Art_Vandelay_ and NCarter helped me figure out local space for grouped items

