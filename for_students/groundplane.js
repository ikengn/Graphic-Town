import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as T from "../libs/CS559-Three/build/three.module.js";

export class Ground extends GrObject {
    constructor() {
        let plane_geom = new T.BoxGeometry(40,0,40);
        let texture = new T.TextureLoader().load("./images/battlefield.webp");
        texture.repeat.set(2,2);
        texture.wrapS = T.RepeatWrapping;
        texture.wrapT = T.RepeatWrapping;

        let plane_mat = new T.MeshStandardMaterial({
            color: "white",
            map: texture
        })
        let plane = new T.Mesh(plane_geom, plane_mat);
        super("Ground",plane);
    }
}