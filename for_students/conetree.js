import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as T from "../libs/CS559-Three/build/three.module.js";

function convertAngle(degree) {
    return degree * Math.PI/180;
}

export class ConeTree extends GrObject {
    constructor() {
        let tree = new T.Group();
        super("Tree", tree);

        let trunktxt = new T.TextureLoader().load("./images/trunk.jpg");
        trunktxt.wrapS = T.MirroredRepeatWrapping;
        trunktxt.wrapT = T.MirroredRepeatWrapping;
        trunktxt.repeat.set(1,2);

        let trunk_geom = new T.CylinderGeometry(.5,.5,4);
        let trunk_mat = new T.MeshStandardMaterial({
            color: "white",
            map: trunktxt,
            side: T.DoubleSide
        })
        let trunk = new T.Mesh(trunk_geom, trunk_mat);
        tree.add(trunk);

        let leaftxt = new T.TextureLoader().load("./images/leaf.jpg");
        leaftxt.repeat.set(2,2);
        leaftxt.wrapS = T.RepeatWrapping;
        leaftxt.wrapT = T.RepeatWrapping;
        let mid_geom = new T.ConeGeometry(1.5,4);
        let mid_mat = new T.MeshStandardMaterial({
            color: "white",
            map: leaftxt
        });
        let mid = new T.Mesh(mid_geom, mid_mat);
        tree.add(mid);
        mid.translateY(2);

        let top_geom = new T.ConeGeometry(1, 3);
        let top = new T.Mesh(top_geom, mid_mat);
        tree.add(top);
        top.translateY(4);
    }
}