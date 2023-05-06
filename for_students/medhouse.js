import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as T from "../libs/CS559-Three/build/three.module.js";

function convertAngle(degree) {
    return degree * Math.PI/180;
}

export class Medhouse extends GrObject {
    constructor(main) {
        let medhouse = new T.Group();

        let extrudeSettings = {
            steps: 2,
            bevelEnabled: true,
            bevelThickness: 0.2,
        }

        let body_mat = new T.MeshStandardMaterial({
            color: "white",
            metalness: 0.0,
            roughness: 0.0
        })

        let body_shape = new T.Shape();
        body_shape.moveTo(-3,0);
        body_shape.lineTo(-3,3.5);
        body_shape.lineTo(0,5);
        body_shape.lineTo(3,3.5);
        body_shape.lineTo(3,0);
        body_shape.lineTo(-3,0);
        let body = new T.Mesh(new T.ExtrudeGeometry(body_shape, extrudeSettings), body_mat);
        body.scale.set(1,1,5);

        let wall_mat = new T.MeshStandardMaterial({
            color: 0x4b5320,
            metalness: 0.5,
            roughness: 0.0,
        });

        let surround1 = new T.Mesh(new T.BoxGeometry(.5,1.5,7), wall_mat);
        medhouse.add(surround1);
        surround1.translateX(3.25);
        surround1.translateZ(2.5);
        surround1.translateY(0.75);
        let surround2 = surround1.clone();
        surround2.translateX(-6.5);
        medhouse.add(surround2);

        let surround3 = new T.Mesh(new T.BoxGeometry(7,1.5,.5), wall_mat);
        medhouse.add(surround3);
        surround3.translateY(0.75);
        surround3.translateZ(-1);

        let roof1 = new T.Mesh(new T.BoxGeometry(3.75, 0.25,7.5), wall_mat);
        medhouse.add(roof1);
        roof1.translateY(4.4);
        roof1.translateZ(2.5);
        roof1.translateX(1.6);
        roof1.rotateZ(convertAngle(-27));
        let roof2 = roof1.clone();
        roof2.rotateZ(convertAngle(54));
        medhouse.add(roof2);
        roof2.translateX(-2.9);
        roof2.translateY(1.5);

        let op_mat = new T.MeshStandardMaterial({
            color: "black"
        })
        let opening = new T.Mesh(new T.BoxGeometry(4,2,0.1), op_mat);
        medhouse.add(opening);
        opening.translateZ(6);
        opening.translateY(1);

        let front_door = new T.Mesh(new T.BoxGeometry(1.25, 2, 0.2), wall_mat);
        medhouse.add(front_door);
        front_door.translateZ(6);
        front_door.translateY(1);
        let front_door2 = front_door.clone();
        medhouse.add(front_door2);
        front_door.translateX(1.4);
        front_door2.translateX(-1.4);

        let handler = new T.Mesh(new T.BoxGeometry(4.5, 0.2, 0.3), wall_mat);
        handler.translateZ(6);
        handler.translateY(2);
        medhouse.add(handler);

        if (main) {
            let texture = new T.TextureLoader().load("./images/plus.jpg");
            let cir_mat = new T.MeshStandardMaterial({
                color: "white",
                map: texture
            });
            let cir = new T.Mesh(new T.CircleGeometry(1), cir_mat);
            medhouse.add(cir);
            cir.translateY(3.5);
            cir.translateZ(6.05);
        }

        medhouse.add(body);
        super("Medhouse", medhouse);
    }
}