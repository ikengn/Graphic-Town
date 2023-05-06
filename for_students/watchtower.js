import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as T from "../libs/CS559-Three/build/three.module.js";

function convertAngle(degree) {
    return degree * Math.PI/180;
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
            color: 0x4e3524,
            roughness: 0.2,
            metalness: 0.2
        })
        let box = new T.Mesh(new T.BoxGeometry(2.1,1,2.1), box_mat);
        group.add(box);
        box.position.set(0.9,2.5,0.9);

        let pyramid_mat = new T.MeshStandardMaterial({
            color: 0x4b5320,
            metalness: 0.5,
            roughness: 0.0,
        })
        let pyramid = new T.Mesh(new T.ConeGeometry(1.75,1,4), pyramid_mat);
        group.add(pyramid);
        pyramid.rotateY(convertAngle(45));
        pyramid.position.set(0.9,4.5,0.9);

        super("Watch tower", group);
    }
}