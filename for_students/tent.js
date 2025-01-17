import * as L from "../libs/CS559-Framework/loaders.js";

function convertAngle(degree) {
    return degree * Math.PI/180;
}

export class Tent extends L.FbxGrObject {
    constructor() {
        super({
            fbx: "../for_students/objects/tent.fbx",
            norm: 20.0,
            name: "Tent"
        });
    }
    stepWorld(delta) {}
    
}