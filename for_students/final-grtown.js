/*jshint esversion: 6 */
// @ts-check

/**
 * Graphics Town Framework - "Main" File
 *
 * This is the main file - it creates the world, populates it with
 * objects and behaviors, and starts things running
 *
 * The initial distributed version has a pretty empty world.
 * There are a few simple objects thrown in as examples.
 *
 * It is the students job to extend this by defining new object types
 * (in other files), then loading those files as modules, and using this
 * file to instantiate those objects in the world.
 */

import { GrWorld } from "../libs/CS559-Framework/GrWorld.js";
import { WorldUI } from "../libs/CS559-Framework/WorldUI.js";
import { TextureLoader } from "../libs/CS559-Three/build/three.module.js";
import * as T from "../libs/CS559-Three/build/three.module.js";
import { AirCraftArmy } from "./aircraft.js"
import { GreenTank } from "./tank.js";
import { Cannon } from "./cannon.js";
import { Tent } from "./tent.js";
import { Ground } from "./groundplane.js";

function convertAngle(degree) {
    return degree * Math.PI/180;
}

/**
 * The Graphics Town Main -
 * This builds up the world and makes it go...
 */

// make the world

let world = new GrWorld({
    width: 800,
    height: 600,
    groundplanesize: 20, // make the ground plane big enough for a world of stuff
});

// put stuff into the world
let aircraft1 = new AirCraftArmy();
world.add(aircraft1);

let tank1 = new GreenTank();
world.add(tank1);
tank1.setPos(10,0,-8);
tank1.objects[0].rotateY(convertAngle(45));
let tank2 = new GreenTank();
world.add(tank2);
tank2.setPos(5,0,13);
tank2.objects[0].rotateY(convertAngle(-90));
let tank3 = new GreenTank();
world.add(tank3);
tank3.setPos(-1,0,13);
tank3.objects[0].rotateY(convertAngle(-90));

let cannon1 = new Cannon();
world.add(cannon1);
cannon1.setPos(-10,1,-5);
cannon1.objects[0].rotateY(convertAngle(20));
let cannon2 = new Cannon();
world.add(cannon2);
cannon2.setPos(-5.5,1,-4);
cannon2.objects[0].rotateY(convertAngle(30));
let cannon3 = new Cannon();
world.add(cannon3);
cannon3.setPos(-13.5,1,-3);

let tent1 = new Tent();
world.add(tent1);
tent1.setPos(15,0,9);
tent1.objects[0].rotateY(convertAngle(-90));

// while making your objects, be sure to identify some of them as "highlighted"

///////////////////////////////////////////////////////////////
// because I did not store the objects I want to highlight in variables, I need to look them up by name
// This code is included since it might be useful if you want to highlight your objects here
function highlight(obName) {
    const toHighlight = world.objects.find(ob => ob.name === obName);
    if (toHighlight) {
        toHighlight.highlighted = true;
    } else {
        throw `no object named ${obName} for highlighting!`;
    }
}
// of course, the student should highlight their own objects, not these
highlight("AirCraftArmy");
highlight("Cannon");
highlight("GreenTank");
highlight("Tent");

/** 
world.scene.traverse(obj => obj.castShadow = true);
world.scene.traverse(obj => obj.receiveShadow = true);
world.renderer.shadowMap.enabled = true;
*/

world.scene.background = new T.CubeTextureLoader().setPath("../for_students/images/").load([
    "redeclipse_ft.png", "redeclipse_bk.png",
    "redeclipse_up.png", "redeclipse_dn.png",
    "redeclipse_rt.png", "redeclipse_lf.png"
]);
let plane = new Ground();
world.add(plane);
plane.objects[0].translateY(0.05);

///////////////////////////////////////////////////////////////
// build and run the UI
// only after all the objects exist can we build the UI
// @ts-ignore       // we're sticking a new thing into the world
world.ui = new WorldUI(world);
// now make it go!
world.go();
