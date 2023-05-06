import { GrObject } from "../libs/CS559-Framework/GrObject.js";
import * as T from "../libs/CS559-Three/build/three.module.js";

function convertAngle(degree) {
    return degree * Math.PI/180;
}

export class AirCraftArmy extends GrObject {
    constructor () {
        let aircraft = new T.Group();

        // body
        let shape = new T.Shape();
        shape.moveTo(-5,0);
        shape.lineTo(-5,0.75);
        shape.lineTo(-4,1);
        shape.lineTo(-3.75,1.5);
        shape.lineTo(5,1);
        shape.lineTo(5,0);
        shape.lineTo(-5,0);
        let extrudeSettings = {
            steps: 2,
            bevelEnabled: true,
            bevelThickness: 0.1,
        }
        let geom = new T.ExtrudeGeometry(shape, extrudeSettings);
        let texture = new T.TextureLoader().load("../for_students/images/camouflag.jpg");
        texture.repeat.set(0.25,0.25);
        texture.wrapS = T.RepeatWrapping;
        texture.wrapT = T.RepeatWrapping;       
        let material = new T.MeshStandardMaterial({
            color: "white",
            roughness: 0.75,
            metalness: 0.0,
            map: texture
        })
        let body = new T.Mesh(geom, material);
        body.rotateY(convertAngle(90));

        // glass
        let glass_geom = new T.BoxGeometry(.5,.1,1);
        let glass_mat = new T.MeshStandardMaterial({
            color: "black",
            metalness: 0.0,
            roughness: 0.0
        });
        let glass = new T.Mesh(glass_geom, glass_mat);
        glass.translateY(1.25);
        glass.rotateY(convertAngle(90));
        glass.translateX(-3.85);
        glass.translateZ(.5);
        glass.rotateZ(convertAngle(65));

        // wing
        let wing_shape = new T.Shape()
        wing_shape.moveTo(-5,0);
        wing_shape.lineTo(-5,0.5);
        wing_shape.lineTo(-0.5,2);
        wing_shape.lineTo(.5,2);
        wing_shape.lineTo(5,0.5);
        wing_shape.lineTo(5,0);
        wing_shape.lineTo(-5,0);
        let wing_geom = new T.ExtrudeGeometry(wing_shape, extrudeSettings);
        let wing = new T.Mesh(wing_geom, material);
        wing.scale.set(1,1,.1);
        wing.translateY(1.2);
        wing.translateZ(.5);
        wing.translateX(.5);
        wing.rotateY(convertAngle(180));
        wing.rotateX(convertAngle(-90));

        // back wing
        let back_wing = wing.clone();
        back_wing.scale.set(.5,.5,.1);
        back_wing.translateY(-5.4);
        back_wing.translateZ(-.25);

        // crop
        let crop_shape = new T.Shape();
        crop_shape.moveTo(-1,0);
        crop_shape.lineTo(0,1.5);
        crop_shape.lineTo(0,0);
        crop_shape.lineTo(-1,0);
        let crop_geom = new T.ExtrudeGeometry(crop_shape, extrudeSettings);
        let crop = new T.Mesh(crop_geom, material);
        crop.scale.set(1,1,.1);
        crop.translateY(1);
        crop.rotateY(convertAngle(90));
        crop.translateX(5);
        crop.translateZ(0.5);

        // propeller
        let propeller = new T.Group();
        let cross1 = new T.Mesh(new T.BoxGeometry(0.1, 2, 0.25), glass_mat);
        propeller.add(cross1);
        let cross2 = new T.Mesh(new T.BoxGeometry(0.1, 0.25, 2), glass_mat);
        propeller.add(cross2);
        propeller.translateY(.5);
        propeller.rotateY(convertAngle(90));
        propeller.translateX(-5.05);
        propeller.translateZ(.5);

        aircraft.add(body);
        aircraft.add(glass);
        aircraft.add(wing);
        aircraft.add(back_wing);
        aircraft.add(crop);
        aircraft.add(propeller);

        aircraft.translateY(10);

        super("AirCraftArmy", aircraft);
        this.aircraft = aircraft;
        this.propeller = propeller;
        this.start = 0;
        this.rideable = this.aircraft;
    }

    stepWorld(delta) {
        this.propeller.rotateX(delta * Math.PI/200);
        let x = 15 * Math.sin(this.start);
        let z = 15 * Math.sin(2 * this.start);
        let newPosition = new T.Vector3(x, 10, z);
        let direction = newPosition.clone().sub(this.aircraft.position);
        this.aircraft.position.copy(newPosition);
        this.aircraft.lookAt(this.aircraft.position.clone().add(direction));
        this.start += delta / 2000;
    }
}