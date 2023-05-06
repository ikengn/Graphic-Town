import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as T from "../libs/CS559-Three/build/three.module.js";
import { OBJLoader } from "../libs/CS559-Three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "../libs/CS559-Three/examples/jsm/loaders/MTLLoader.js";
import { GLTFLoader } from "../libs/CS559-Three/examples/jsm/loaders/GLTFLoader.js";
import {ColladaLoader} from "../libs/CS559-Three/examples/jsm/loaders/ColladaLoader.js";
import * as L from "../libs/CS559-Framework/loaders.js";

export class Bush extends GrObject {
    constructor(radius = 1) {
        let bush_geom = new T.SphereGeometry(radius);
        let texture = new T.TextureLoader().load("./images/bush.png");
        texture.wrapS = T.RepeatWrapping;
        texture.wrapT = T.RepeatWrapping;
        texture.repeat.set(5,50);
        let bush_mat = new T.MeshStandardMaterial({
            map: texture,
            color: "white"
        })
        let bush = new T.Mesh(bush_geom, bush_mat);
        super("Bush", bush);
    }
}