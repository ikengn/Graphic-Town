import * as L from "../libs/CS559-Framework/loaders.js";

function convertAngle(degree) {
    return degree * Math.PI/180;
}

export class Soldier extends L.FbxGrObject {
    constructor() {
        super({
            fbx: "../for_students/objects/soldier.fbx",
            norm: 4.0,
            name: "Soldier"
        });
    }
    stepWorld(delta) {}
    
}