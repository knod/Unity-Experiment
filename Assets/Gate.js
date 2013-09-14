// To Do:
// Look into rigid body movement

#pragma strict

// size.x is the width, size.y is the height and size.z is the depth of the box
public var gateWidth: float;
public var inputConnected : boolean = false;
public var transferGreen : float = 5;
public var wireContactPoint : Vector3;
public var localSpacePoint : float;

//Tests

function Start () {
	// kruncher's help
	// Don't need the gate width because the contact points, when transformed, are taken from the center, thus getting negative and positive numbers
	// gateWidth = renderer.bounds.size.x;
}

function Update () {
// !!!!!!! Look into: Rigidbody has a MovePosition function (and its own .position property) that let you manually reposition it without using Transform's functions...
// !!!!!!! Moving a rigid body with transform.Translate is unreliable - NCarter
// For now, move the item by itself
// Move the object forward along its x axis 1 unit/second
	transform.Translate(Vector3.left * Time.deltaTime);
}


// Pseudo code take 3:
// When the logic gate object collides with something
	// if that thing is a wire
		// add it to the list of wires
		// If there are two wires in the list
			// sort the list from left most in the world to rightmost in the world
			



// Pseudo code take 2:
// When the logic gate object collides with something
// (This must be a rigid body (Add Component -> Physics -> Rigid Body) - azura9310)
// (Non-code reasons collide might not be working: something is set as a trigger, no rigidbody,...
// if a collider on an object is size 0,0,0 it won't detect anything colliding with it)
function OnCollisionEnter (someWire : Collision) {
	// Debug.Log("Is Collided");
	// Test that we're colliding with a wire
	if (someWire.gameObject.GetComponent.<Wire>().id == "wire") {
		Debug.Log("Is Wire");
		// Get the contact point (which is in world space - NCarter)
		wireContactPoint = someWire.contacts[0].point;
		// Translate that to local space - NCarter
		localSpacePointX = transform.InverseTransformPoint(wireContactPoint).x;
		// If the contact point is negative (it's on the left side, the input side)
		if (localSpacePointX <= 0) {
			Debug.Log("Is negative");
			// Test by changing color
			renderer.material.color = Color(.5, 0, .5, 1);
										// If I can't have the function in here: Set the variable inputWire to this object
			// Make the variable green in here equal to the variable green in the collided object
			// Deozaan's, DeoDroid's, and NCarter's help
			transferGreen = someWire.gameObject.GetComponent.<Wire>().green;
			// Set the fact that the left side is connected to true
			inputConnected = true;
			// When the logic gate object disconnects from this object
				// Set inputConnected to false
				// Set
				}
		// If the point is greater than half, and there's something contacting the left side of the object
			// Make the green variable of the object into the green variable in here
			// Update that object?
	
	
			// If the inputWire object
		}

}


// Don't know how to use this: ContactPoint.point 



// Pseudo code take 1:
// Needs to be put on the logic gate object. Lordfaust at #Unity3D helped the most.
// When this connector collides with an object (a wire)
//function OnColliderEnter (someWire : Collider) {
	// Add that wire to a list of wires
	// Pseudo code: Dictionary(or List)<name, object> += collider.gameObject

	// If there are two objects in the dictionary
//	if () { // Pseudo code: (dictionary.len == 2){
		// Sort the dictionary using the x position 
		// Pseudo code: ? (variableNameOfWireInHere.gameObject.transform.position.x, y, z)
		// Change the b value of the wire with index 1 to the color of wire with index 0
		// Pseudo code: wireAtIndex1.gameObject.b? = wireAtIndex0.gameObject.b
//		} ;
//		else {
			// +0.5 to the blue color value (variable b) of the other wire
			// How do I get the other wire?
			
			// and update that wire
//		} ;
//}

//function OnColliderExit (someWire : Collider) {
	// If a wire isn't touching the connector anymore remove it from that connector's dictionary
	// Dictionary<name, object> -= collider.gameObject
	// Change the colors back to being connected to previous wires...
//}

// contact points are in world space
// colision.contacts[0].point



//[15:24] <Tenebrous> or something like  positionSnapped = (position/snap - (int)(position/snap))*snap;
//[15:25] <Tenebrous> er
//[15:25] <Tenebrous> or something like  positionSnapped = ((int)(position/snap))*snap;

