import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as T from "../libs/CS559-Three/build/three.module.js";
import { ceilPowerOfTwo } from "../libs/CS559-Three/build/types/math/MathUtils.js";

function convertAngle(degree) {
    return degree * Math.PI/180;
}

export class WatchTower extends GrObject {
    constructor() {
        let group = new T.Group();

        let leg_mat = new T.MeshStandardMaterial({
            color: "brown",
            roughness: 0.2,
            metalness: 0.0
        })
        let stick = new T.Mesh(new T.BoxGeometry(0.2,4,0.2), leg_mat);
        group.add(stick);

        let rstick = new T.Mesh(new T.BoxGeometry(0.2,2.5,0.2), leg_mat);
        stick.add(rstick);
        rstick.translateY(1);
        rstick.translateZ(0.9);
        rstick.rotateX(convertAngle(45));
        let rstick2 = rstick.clone();
        rstick2.rotateX(convertAngle(90));
        stick.add(rstick2);

        let stick2 = stick.clone();
        //stick2.rotateY(convertAngle(90));
        group.add(stick2);
        let stick3 = stick.clone();
        group.add(stick3);
        let stick4 = stick.clone();
        group.add(stick4);

        super("Watch tower", group);
    }
}