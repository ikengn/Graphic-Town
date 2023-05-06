import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as T from "../libs/CS559-Three/build/three.module.js";

function convertAngle(degree) {
    return degree * Math.PI/180;
}

export class Flag extends GrObject {
    constructor() {
        let flag = new T.Group();
        let col_mat = new T.MeshStandardMaterial({
            color: 0xaaa9ad,
            roughness: 0.0,
            metalness: 0.5
        })
        let col = new T.Mesh(new T.CylinderGeometry(0.25,.25,8), col_mat);
        flag.add(col);
        col.translateY(4);

        let leaf_geom = new T.BoxGeometry(4,2,0.05);
        let leaf_mat = new T.ShaderMaterial("./shaders/flag.vs", "./shaders/flag.fs", {
            side: T.DoubleSide,
            uniforms: {}
        });
        let leaf = new T.Mesh(leaf_geom, leaf_mat);
        flag.add(leaf);
        leaf.translateY(7);
        leaf.translateX(2);
        
        super("Flag", flag);
        this.leaf = leaf;
    }

    stepWorld(delta) {}
}