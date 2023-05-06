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
import { Soldier } from "./soldier.js";
import { Helicopter } from "./helicopter.js";
import { Medhouse } from "./medhouse.js";
import { Flag } from "./flag.js";
import { ConeTree } from "./conetree.js"
import { Crate } from "./crate.js";
import { WatchTower } from "./watchtower.js";
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

let soldier1 = new Soldier();
soldier1.setPos(-8,0,9);
soldier1.objects[0].rotateY(convertAngle(100));
let soldier2 = new Soldier();
soldier2.setPos(10,0,6);
soldier2.objects[0].rotateY(convertAngle(-45));
let soldier3 = new Soldier();
soldier3.setPos(-6,0,11);
soldier3.objects[0].rotateY(convertAngle(130))
let soldier4 = new Soldier();
soldier4.setPos(7,0,-11);
soldier4.objects[0].rotateY(convertAngle(-45));
let soldier5 = new Soldier();
soldier5.setPos(3,0,5);
soldier5.objects[0].rotateY(convertAngle(-45));
let soldier6 = new Soldier();
soldier6.setPos(4,0,0);
soldier6.objects[0].rotateY(convertAngle(-80));
let soldier7 = new Soldier();
soldier7.setPos(-2,0,-7);
soldier7.objects[0].rotateY(convertAngle(30));
let soldier8 = new Soldier();
soldier8.setPos(-8,0,-9);
soldier8.objects[0].rotateY(convertAngle(-30));

world.add(soldier1);
world.add(soldier2);
world.add(soldier3);
world.add(soldier4);
world.add(soldier5);
world.add(soldier6);
world.add(soldier7);
world.add(soldier8);

let heli1 = new Helicopter(15,1);
world.add(heli1);
let heli2 = new Helicopter(8,-1);
world.add(heli2);

let med = new Medhouse(true);
world.add(med);
med.setPos(-7,0,-18);
let med2 = new Medhouse(false);
world.add(med2);
med2.setPos(-14,0,-18);
let med3 = new Medhouse(false);
world.add(med3);
med3.setPos(0,0,-18);

let flag = new Flag();
world.add(flag);

let conetree1 = new ConeTree();
world.add(conetree1);
conetree1.setPos(-15,2,16);
let conetree2 = new ConeTree();
world.add(conetree2);
conetree2.setPos(-17,2,10);
let conetree3 = new ConeTree();
world.add(conetree3);
conetree3.setPos(-12,2,12);
let conetree4 = new ConeTree();
world.add(conetree4);
conetree4.setPos(-9,2,17);
let conetree5 = new ConeTree();
world.add(conetree5);
conetree5.setPos(-14,2,5);
let conetree6 = new ConeTree();
world.add(conetree6);
conetree6.setPos(-4,2,3);
let conetree7 = new ConeTree();
world.add(conetree7);
conetree7.setPos(15,2,-14);
let conetree8 = new ConeTree();
world.add(conetree8);
conetree8.setPos(9,2,-17);
let conetree9 = new ConeTree();
world.add(conetree9);
conetree9.setPos(17,2,-3);
let conetree10 = new ConeTree();
world.add(conetree10);
conetree10.setPos(-15,2,-8);

let crate1 = new Crate();
world.add(crate1);
crate1.setPos(6,0,3);
crate1.objects[0].rotateY(convertAngle(30));
let crate2 = new Crate();
world.add(crate2);
crate2.setPos(7.5,0,2);
crate2.objects[0].rotateY(convertAngle(50));
let crate3 = new Crate();
world.add(crate3);
crate3.setPos(6.5,1.5,2.5);
crate3.objects[0].rotateY(convertAngle(40));

let tower1 = new WatchTower();
world.add(tower1);
tower1.setPos(0,10,0)

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
highlight("Soldier");
highlight("Helicopter");
highlight("Flag");

/** 
world.scene.traverse(obj => obj.castShadow = true);
world.scene.traverse(obj => obj.receiveShadow = true);
world.renderer.shadowMap.enabled = true;*/

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
