class Helper {
    constructor(obj) {
        this.three = obj;
    }
    move(object, x, y = x, z = x) {
        object.position.x = x;
        object.position.y = y;
        object.position.z = z;
    }

    rotate(object, x, y = x, z = x) {
        object.rotation.x = object.rotation.x + (x * (Math.PI / 180));
        object.rotation.y = object.rotation.y + (y * (Math.PI / 180));
        object.rotation.z = object.rotation.z + (z * (Math.PI / 180));
    }

    scale(object, x, y = x, z = x) {
        object.scale.x = x;
        object.scale.y = y;
        object.scale.z = z;
    }

    createPlane(color, material = null, x, z = x) {
        const geometry = new this.three.PlaneGeometry( x, z );
        const nMaterial = material != null ? material : new this.three.MeshStandardMaterial( {color: color} ); 
        const mesh = new this.three.Mesh( geometry, nMaterial );
    
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

    createBox(color, material = null, x, y = x, z = x) {
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