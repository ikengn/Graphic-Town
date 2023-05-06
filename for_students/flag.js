import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as T from "../libs/CS559-Three/build/three.module.js";
import { shaderMaterial } from "../libs/CS559-Framework/shaderHelper.js";

function convertAngle(degree) {
    return degree * Math.PI/180;
}

export class Flag extends GrObject {
    constructor() {
        let flag = new T.Group();
        super("Flag", flag);

        let col_mat = new T.MeshStandardMaterial({
            color: 0xaaa9ad,
            roughness: 0.0,
            metalness: 0.5
        })
        let col = new T.Mesh(new T.CylinderGeometry(0.25,.25,8), col_mat);
        flag.add(col);
        col.translateY(4);

        let leaf_geom = new T.BoxGeometry(4,2,0.05);
        let leaf_mat = new shaderMaterial("./shaders/flag.vs", "./shaders/flag.fs", {
            side: T.DoubleSide,
            uniforms: {}
        });
        let leaf = new T.Mesh(leaf_geom, leaf_mat);
        flag.add(leaf);
        leaf.translateY(7);
        leaf.translateX(2);
        
        this.leaf = leaf;
    }

    stepWorld(delta) {}
}

export class WatchTower extends GrObject {
    constructor() {
        let group = new T.Group();

        let leg_mat = new T.MeshStandardMaterial({
            color: 0x964b00,
            roughness: 0.2,
            metalness: 0.0
        })
        let stick = new T.Mesh(new T.BoxGeometry(0.2,5,0.2), leg_mat);
        stick.translateY(1.5);
        group.add(stick);

        let rstick = new T.Mesh(new T.BoxGeometry(0.2,2.5,0.2), leg_mat);
        stick.add(rstick);
        rstick.translateY(-.5);
        rstick.translateZ(0.9);
        rstick.rotateX(convertAngle(45));
        let rstick2 = rstick.clone();
        rstick2.rotateX(convertAngle(90));
        stick.add(rstick2);
        let stick2 = stick.clone();
        group.add(stick2);
        stick2.rotateY(convertAngle(90));
        stick2.translateX(-1.8);
        let stick3 = stick2.clone();
        group.add(stick3);
        stick3.rotateY(convertAngle(90));
        stick3.translateX(-1.8);
        let stick4 = stick3.clone();
        group.add(stick4);
        stick4.rotateY(convertAngle(90));
        stick4.translateX(-1.8);

        let box_mat = new T.MeshStandardMaterial({
            color: 0xd8cbc4,
            roughness: 0.2,
            metalness: 0.2
        })
        let box = new T.Mesh(new T.BoxGeometry(2.1,1,2.1), box_mat);
        group.add(box);
        box.position.set(0.9,2.5,0.9);

        super("Watch tower", group);
    }
}