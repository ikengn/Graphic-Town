import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as T from "../libs/CS559-Three/build/three.module.js";
import { OBJLoader } from "../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "../libs/CS559-Three/examples/jsm/loaders/MTLLoader.js";
import { GLTFLoader } from "../libs/CS559-Three/examples/jsm/loaders/GLTFLoader.js";
import {ColladaLoader} from "../libs/CS559-Three/examples/jsm/loaders/ColladaLoader.js";
import * as L from "../libs/CS559-Framework/loaders.js";

function convertAngle(degree) {
    return degree * Math.PI/180;
}

export class Crate extends L.FbxGrObject {
    constructor() {
        super({
            fbx: "../for_students/objects/crate.fbx",
            norm: 1.5,
            name: "Crate"
        });
    }
    stepWorld(delta) {

    }
    
}