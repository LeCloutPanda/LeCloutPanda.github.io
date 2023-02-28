class Helper {
    constructor(obj) {
        this.three = obj;
        this.rotationConversion = Math.PI / 180;
        this.standardMaterial = new this.three.MeshStandardMaterial({ color: 0xffffff });
    }
    move(object, x, y = x, z = x) {
        object.position.x = x;
        object.position.y = y;
        object.position.z = z;
    }

    rotate(object, x, y = x, z = x) {
        object.rotation.x += x * this.rotationConversion;
        object.rotation.y += y * this.rotationConversion;
        object.rotation.z += z * this.rotationConversion;
    }

    scale(object, x, y = x, z = x) {
        object.scale.x = x;
        object.scale.y = y;
        object.scale.z = z;
    }

    createPlane(material = null, x, z = x) {
        const geometry = new this.three.PlaneGeometry( x, z );
        const nMaterial = material || this.standardMaterial;
        const mesh = new this.three.Mesh( geometry, nMaterial );
    
        mesh.castShadow = true;
        mesh.receiveShadow = true;
    
        return mesh;
    }

    createSkyBox(scale) {
        const geometry = new this.three.BoxGeometry(scale, scale, scale);
        const material =this.standardMaterial;
        const mesh = new this.three.Mesh( geometry, material );
    
        return mesh;
    }

    createBox(material = null, size, castShadow = true, receiveShadow = true) {
        const geometry = new this.three.BoxGeometry(size.x, size.y, size.z);
        const nMaterial = material || this.standardMaterial;
        const mesh = new this.three.Mesh(geometry, nMaterial);
        mesh.castShadow = castShadow;
        mesh.receiveShadow = receiveShadow;
    
        return mesh;
    }

    createIcoSphere(radius, detail, material = null) {
        const geometry = new this.three.IcosahedronGeometry(radius, detail);
        const nMaterial = material || this.standardMaterial;
        const mesh = new this.three.Mesh(geometry, nMaterial);
        
        return mesh;
    }
}

export { Helper };