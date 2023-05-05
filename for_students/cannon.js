import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as T from "../libs/CS559-Three/build/three.module.js";

function convertAngle(degree) {
    return degree * Math.PI/180;
}

export class Cannon extends GrObject {
    constructor() {
        let cannon = new T.Group();

        let texture = new T.TextureLoader().load("../for_students/images/camouflag.jpg");
        texture.repeat.set(0.5,.25);
        texture.wrapS = T.RepeatWrapping;
        texture.wrapT = T.RepeatWrapping;       
        let material = new T.MeshStandardMaterial({
            color: "white",
            roughness: 0.0,
            metalness: 0.0,
            map: texture
        })

        // base
        let base_geom = new T.BoxGeometry(2, .5, 2);
        let base = new T.Mesh(base_geom, material);
        cannon.add(base);
        base.rotateX(convertAngle(60));

        let extrudeSettings = {
            steps: 2,
            bevelEnabled: true,
            bevelThickness: 0.2,
        }

        let back_shape = new T.Shape();
        back_shape.moveTo(-0.5,0);
        back_shape.lineTo(0,1);
        back_shape.lineTo(3,0);
        back_shape.lineTo(-0.5,0);
        let back_geom = new T.ExtrudeGeometry(back_shape, extrudeSettings);
        let back_mat = new T.MeshStandardMaterial({
            color: 0x4b5320,
            metalness: 0.5,
            roughness: 0.0,
        })
        let back = new T.Mesh(back_geom, back_mat);
        cannon.add(back);
        back.rotateY(convertAngle(90));
        back.translateY(-.75);
        back.translateZ(-.5);

        // barrel 
        let barrelGeometry = new T.CylinderGeometry(0.15, 0.25, 4, 32);
        let barrelMaterial = new T.MeshStandardMaterial({
            color: 0x808080,
            metalness: 0.5,
            roughness: 0.0,
        });
        let barrel = new T.Mesh(barrelGeometry, barrelMaterial);
        barrel.rotateX(convertAngle(60));
        barrel.translateY(2);

        // aim
        let aim_geom = new T.CylinderGeometry(0.3, 0.3, 1, 32);
        let aim = new T.Mesh(aim_geom, back_mat);
        barrel.add(aim);
        aim.translateY(2);

        let bone = new T.Group();
        cannon.add(bone);
        bone.add(barrel);

        // wheel
        let wheelGeometry = new T.TorusGeometry(.5, 0.2, 16, 100);
        let wheelMaterial = new T.MeshStandardMaterial({
            color: 0x000000,
            metalness: 0.5,
            roughness: 0.5,
        });

        let wheel = new T.Mesh(wheelGeometry, wheelMaterial);
        wheel.rotateY(convertAngle(90));
        cannon.add(wheel);
        wheel.translateZ(1.2);
        wheel.translateY(-.35);
        wheel.translateX(-0.25);
        let wheel2 = wheel.clone();
        wheel2.translateZ(-2.4);
        cannon.add(wheel2);

        super("Cannon", cannon);
        this.cannon = cannon;
        this.barrel = bone;
        this.starttime = 0;
    }

    stepWorld(delta) {
        this.starttime += delta;
        this.barrel.rotation.x = Math.sin(this.starttime/2000) * Math.PI/8;
    }
}