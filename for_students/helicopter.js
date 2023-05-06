import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as T from "../libs/CS559-Three/build/three.module.js";

function convertAngle(degree) {
    return degree * Math.PI/180;
}

export class Helicopter extends GrObject {
    constructor() {
        let heli = new T.Group();

        let body_geom = new T.CylinderGeometry(1.25,1.25,3);
        let mat = new T.MeshStandardMaterial({
            color: 0x4b5320,
            metalness: 0.5,
            roughness: 0.0,
        });
        let body = new T.Mesh(body_geom, mat);
        body.rotateX(convertAngle(90));

        let head_geom = new T.SphereGeometry(1.25);
        let head = new T.Mesh(head_geom, mat);
        head.translateZ(1.5);

        let back_geom = new T.CylinderGeometry(1.25, 0.1, 1);
        let back = new T.Mesh(back_geom, mat);
        back.rotateX(convertAngle(90));
        back.translateY(-2);

        let tail = new T.Mesh(new T.CylinderGeometry(.5, 0.25, 4), mat);
        tail.translateZ(-3);
        tail.rotateX(convertAngle(90));

        let extrudeSettings = {
            steps: 2,
            bevelEnabled: true,
            bevelThickness: 0.2,
        }

        let crop_shape = new T.Shape();
        crop_shape.moveTo(-1,0);
        crop_shape.lineTo(-1,.5);
        crop_shape.lineTo(0,1.5);
        crop_shape.lineTo(0,0);
        crop_shape.lineTo(-1,0);
        let crop = new T.Mesh(new T.ExtrudeGeometry(crop_shape, extrudeSettings), mat);
        crop.translateZ(-5);
        crop.rotateY(convertAngle(90));
        crop.scale.set(1,1,.5);
        crop.translateY(-0.2);
        crop.translateZ(-.25);

        let fan_mat = new T.MeshStandardMaterial({
            color: "gray",
            metalness: 0.0,
            roughness: 0.0
        });
        let propeller = new T.Group();
        let cross1 = new T.Mesh(new T.BoxGeometry(0.1, 2, 0.25), fan_mat);
        propeller.add(cross1);
        let cross2 = new T.Mesh(new T.BoxGeometry(0.1, 0.25, 2), fan_mat);
        propeller.add(cross2);
        propeller.translateZ(-4.5);
        propeller.translateX(0.4);
        propeller.translateY(.25);

        let propeller2 = new T.Group();
        let cross3 = new T.Mesh(new T.BoxGeometry(5, .2, .3), fan_mat);
        propeller2.add(cross3);
        let cross4 = cross3.clone();
        cross4.rotateY(convertAngle(90));
        propeller2.add(cross4);
        propeller2.translateY(1.3);

        let glass_mat = new T.MeshStandardMaterial({
            color: "black",
            metalness: 0.0,
            roughness: 0.0
        });
        let glass = new T.Mesh(new T.SphereGeometry(1.25, 32, 16, 0, Math.PI/2), glass_mat);
        heli.add(glass);
        glass.translateZ(1.51);
        glass.rotateZ(convertAngle(-90));

        let leg_group = new T.Group();
        let stick = new T.Mesh(new T.CylinderGeometry(0.1,.1,1), fan_mat);
        stick.translateX(1.25);
        stick.rotateZ(convertAngle(30));
        let stick2 = stick.clone();
        stick.translateZ(-.5);
        stick2.translateZ(1);
        let stick3 = new T.Mesh(new T.CylinderGeometry(.1,.1,2.5), fan_mat);
        stick3.rotateX(convertAngle(90));
        stick3.translateZ(.5);
        stick3.translateX(1.5);
        stick3.translateY(.25);
        leg_group.add(stick);
        leg_group.add(stick2);
        leg_group.add(stick3);
        leg_group.translateY(-1);

        let leg_group2 = leg_group.clone();
        leg_group2.rotateY(convertAngle(180));
        leg_group2.translateZ(-.5);

        heli.add(leg_group);
        heli.add(leg_group2);

        heli.add(body);
        heli.add(head);
        heli.add(back);
        heli.add(tail);
        heli.add(crop);
        heli.add(propeller);
        heli.add(propeller2);

        super("Helicopter", heli);
        this.propeller = propeller;
        this.propeller2 = propeller2;
        this.heli = heli;
        this.start = 0;
        this.rideable = heli;
    }

    stepWorld(delta) {
        this.start += delta;
        let x = 15*Math.cos(this.start/1000);
        let z = 15*Math.sin(this.start/1000);
        let newPosition = new T.Vector3(x, 15, z);
        let direction = newPosition.clone().sub(this.heli.position);
        this.heli.position.copy(newPosition);
        this.heli.lookAt(this.heli.position.clone().add(direction));
        this.propeller.rotateX(delta * Math.PI/200);
        this.propeller2.rotateY(delta * Math.PI/200);
    }
}