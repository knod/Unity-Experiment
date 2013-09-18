// Knod 09/16/13
// !!!! Only works with the camera looking down from above
// Player can drag an object with the mouse either by clicking to pick up,
// moving the mouse, and clicking to set down, or by dragging and dropping
// To Do:
// Make it so that one object can't be dragged onto the spot of another object
// Use modulo when placing item down to only place the item within grid squares
// Make sure slectable objects have their rotation frozen

// Sources:
// http://wiki.unity3d.com/index.php?title=DragObject
// http://docs.unity3d.com/Documentation/ScriptReference/Camera.ScreenPointToRay.html
// http://docs.unity3d.com/Documentation/ScriptReference/Input-mousePosition.html
// http://docs.unity3d.com/Documentation/ScriptReference/Rigidbody.MovePosition.html
// http://docs.unity3d.com/Documentation/Manual/CameraRays.html
// http://docs.unity3d.com/Documentation/ScriptReference/MonoBehaviour.FixedUpdate.html
// http://answers.unity3d.com/questions/10993/whats-the-difference-between-update-and-fixedupdat.html

#pragma strict

// Mouse position stuff
public var mouseDownPos: Vector3;
public var mouseUpPos: Vector3;
var rayMouseDown: Ray;
var rayMouseUp: Ray;
private var currentMousePos: Vector3;

// No item is selected at the start
public var itemIsSelected: boolean = false;
// I don't really know what this is, but it helps select stuff
var locationHit: RaycastHit;
// Item that was selected
public var selection: Rigidbody;
// How far off the ground the object will go when it's selected
var addHeightWhenClicked: float = 1.5;
// Info for this object, which should be a camera
var thisCam: Camera;
// The position of this camera
var camTrans: Transform;
// What vector to add to the selection's position in order to move it with the mouse
var move: Vector3;
// Is triggered to drop an item when it's been deselected
var dropItem: boolean = false;


function Start () {
	// MaliusArth told me how "this" can refer to the camera, but it took us both a while to
	// figure out exactly how to use "this"
	// I seem to have to do the assignment in here
	thisCam = this.camera;
}


// Goes off once every frame
function Update () {

// Ok, this is how the mouse dragging and clicking works: The mouse is clicked
// That selects something. Then the mouse click is released.
// If the mouse has been moved far enough before being released, then it's been
// dragged and the selection is put down and unselected. If it didn't go far
// enough to indicate it was dragged, the item stays selected and keeps moving with
// the mouse. The next time the mouse is clicked, the item is put down and 
// unselected.

// <azura9310> GetMouseButtonDown(0) is for left click
// <azura9310> GetMouseButton(0) is for left button being held down

// Either move item with click-move-click or with click-drag
	if (Input.GetMouseButtonDown(0)) {
		//Debug.Log("Mouse was pressed");
		//Debug.Log(rayMouseDown);
		
		// If nothing is currently selected
		if (!itemIsSelected) {
			//Debug.Log("In !itemIsSelected check");
		
			// Now we do stuff to get mouse location so we can move the object
			mouseDownPos = Input.mousePosition;
		
			// Construct a Ray from the current mouse coordinates so we can get it's world position
			rayMouseDown = thisCam.ScreenPointToRay(mouseDownPos);
			// Detirmine which object the mouse clicked
			// <onlinecop> transform.gameObject will give you the GameObject attached to that particular transform
			if (Physics.Raycast(rayMouseDown, locationHit)) {
				//Debug.Log(Physics.Raycast(rayMouseDown, locationHit));

				//Debug.Log(locationHit.transform.gameObject.rigidbody != null);
				// Only if it's a rigidbody so it won't have an error
				if(locationHit.transform.gameObject.rigidbody != null) {
					selection = locationHit.transform.rigidbody;
					//Debug.Log(selection.name);
	
					// Lift it up a bit to go over other items.
					selection.useGravity = false;
					selection.position.y += addHeightWhenClicked;
				
					// Set mouse clicked to true to select the thing (i.e. maintain state)
					itemIsSelected = true;
					//Debug.Log("Past itemIsSelected = true;: " + itemIsSelected);
				}
			}
		}
		
		// If the mouse has selected something (and since it apparently wasn't dragged,
		// as evidenced by the fact that the mouse release didn't trigger the selection
		// to be unselected), we let the item go, deselecting it.
		// I had just an if statement here till <gman23> found the problem
		else if (itemIsSelected) {
			// Set mouse clicked to false to let it go
			itemIsSelected = false;
			//Debug.Log("Past itemIsSelected = false;: " + itemIsSelected);
			 
			// Trigger the FixedUpdate statemetn for dropping the item
			// Used to be:
			// selection.position.y -= addHeightWhenClicked; // Didn't work here, but...
			// did work in the getmousebuttonup section - why?
			// selection.useGravity = true;
			dropItem = true;
		}
	}
	
	if (Input.GetMouseButtonUp(0)) {
		//Debug.Log("Mouse was released");
		//Debug.Log (rayMouseUp);
		
		// If an items is selected (non-rigidbodies aren't selected)
		if (itemIsSelected) {
			mouseUpPos = Input.mousePosition;
	
			// Construct a Ray from the current mouse coordinates so we can get it's world position
			rayMouseUp = thisCam.ScreenPointToRay(Input.mousePosition);
	
			// Compare how close the initial position was to this position
			// If the space between the two points was enough to be a drag
			if (Mathf.Abs(mouseDownPos.x - mouseUpPos.x) +
								Mathf.Abs(mouseDownPos.z - mouseUpPos.z) > 0.2) {
				//Debug.Log("Mouse moved farther than 0.2 all together");
				// It counts as a drag, and lifting the mouse button deselects the item
				itemIsSelected = false;
				// Trigger the FixedUpdate statemetn for dropping the item
				dropItem = true;

				// (Otherwise the item stays selected so it can be moved by the mouse)
			}
		}
	}

	if (itemIsSelected) {
		//Debug.Log("In itemIsSelected");
		// Determine where in the world the mouse is as it moves
		// NuneShelping says they would put mouse position detection in Update, but that it probably doesn't matter
		// <ggmann> as unity`s docs said "all GUI functionality, mouse gestures put into...
		// Update or LateUpdate, use FixedUpdate ONLY for Phys
		currentMousePos = Input.mousePosition;
		
		// Translate mouse movement into world movement
		// Note: <Tenebrous> with screen to world point, the x & y you give it are the mouse coords,...
		// but the z is "how far in front of the camera i want this point to be"
		// Why does var move = thisCam.ScreenToWorldPoint(Vector3(mousePos.x, 0, mousePos.y)); not work?
		// or selection.MovePosition(selection.position + Vector3(mousePos.x, 0, mousePos.y));
		// Start by getting the camera position (might not be stationary in the future?)
		camTrans = thisCam.transform;
		// Then use this camera to get a point inside the world using the mouse position too
		move = thisCam.ScreenToWorldPoint(Vector3(currentMousePos.x, currentMousePos.y, camTrans.position.y - selection.position.y)) - selection.position;
		//Debug.Log("Move before y 0: " + move);
		//Debug.Log("Move before y 0: " + move.y);
		move.y = 0.0;
		//Debug.Log("Move after y 0: " + move);
		//Debug.Log("Move after y 0: " + move.y);
	}

// <DH--> if you want both [mouse behaviors] then you could use invoke to check if...
// the button is still held down and start your dragging code
// <DH--> or detect if the player moved his mouse between mouseDown and MouseUp
}


// http://answers.unity3d.com/questions/10993/whats-the-difference-between-update-and-fixedupdat.html
// Should mouse events be in Update or in FixedUpdate?
// <becksebenius> Fixed Update can be called multiple times with the same input state
// <becksebenius> so for example, you might get 2 fixed updates with a MouseDown event
// NuneShelping says that, logic wise, Update is the most regular, I think because...
// as stuff with FixedUpdate won't line up with what the player sees
// For mouse moving, since we're moving a rigidbody
function FixedUpdate() {
	if (itemIsSelected) {
		//Debug.Log("In FixedUpdate and itemIsSelected = true")
	
		// Use all the info above to move the object that was hit by the raycast as the mouse moves.
		selection.MovePosition(selection.position + move);
		// This is in a rigidbody way that is specific, with MovePosition(whateverpostion). Not sure this is the right choice. 
		// See: http://docs.unity3d.com/Documentation/ScriptReference/Rigidbody.MovePosition.html
	}
 
 	// If the mouse tests have deselected the object
	if (dropItem) { 
		// Then make the item drop - this should be in FixedUpdate, as it's physics, but how?
		// <ThomQ> Basic way would be to "lock" the event by a bool
		// Move the item back down - I'm worried about just doing this without also dropping it...
		// - what if the math adds up weird over many moves and it sinks or floats?
		selection.position.y -= addHeightWhenClicked;
		// This only works if it's an object that can have gravity and has ground to collide with
		selection.useGravity = true;

		// Then set dropItem to false so it won't happen again
		dropItem = false;
	}
}


// Use the keyboard to move stuff

