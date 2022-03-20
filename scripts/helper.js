class Helper {
    constructor(obj) {
        this.three = obj;
    }

    move(object, x, y = x, z = x) {
        object.translateX(x);
        object.translateY(y);
        object.translateZ(z);
    }

    rotate(object, x, y = x, z = x) {
        object.rotateX(this.three.Math.degToRad(x));
        object.rotateY(this.three.Math.degToRad(y));
        object.rotateZ(this.three.Math.degToRad(z));
    }

    scale(object, x, y = x, z = x) {
        object.scale.set(x, y, z);
    }

    createPlane(x, z = x, color) {
        const geometry = new this.three.PlaneGeometry( x, z );
        const material = new this.three.MeshStandardMaterial( {color: color } );
        const mesh = new this.three.Mesh( geometry, material );
    
        mesh.castShadow = true;
        mesh.receiveShadow = true;
    
        return mesh;
    }

    createSkyBox(color, scale) {
        const geometry = new this.three.BoxGeometry(scale, scale, scale);
        const material = new this.three.MeshStandardMaterial( {color: color } );
        const mesh = new this.three.Mesh( geometry, material );
    
        return mesh;
    }

    createBox(color, x, y = x, z = x, material = null) {
        const geometry = new this.three.BoxGeometry(x, y, z);
        const nMaterial = material != null ? material : new this.three.MeshStandardMaterial( {color: color} ); 
        const mesh = new this.three.Mesh(geometry, nMaterial);
    
        return mesh;
    }

    createIcoSphere(radius, detail, color, material = null) {
        const geometry = new this.three.IcosahedronGeometry(radius, detail);
        const nMaterial = material != null ? material : new this.three.MeshStandardMaterial( {color: color} ); 
        const mesh = new this.three.Mesh(geometry, nMaterial);
        
        return mesh;
    }
}

export { Helper };