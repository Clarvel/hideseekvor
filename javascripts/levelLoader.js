var LevelLoader = function(){
    this.levels = LEVELLIST;
    console.log(LEVELLIST);
    this.ind = 0;

    this.createScene = function(engine, levelInd){
        if(levelInd < 0 || levelInd >= this.levels.length){
            console.log("ERROR: level index out of range!");
            return;
        }
        this.level = this.levels[levelInd];
        this.ind = levelInd;

        this.scene = new BABYLON.Scene(engine);
    		this.scene.enablePhysics();
    		this.scene.collisionsEnabled = true;
            this.scene.gravity = new BABYLON.Vector3(0, this.level.gravity, 0);

        this.lights=[];
        this.bounds=[];
        this.terrain=[];

        this.createLights();
        this.createBoundingArea();
        this.createTerrain();

        return this.scene;
    }

    this.createLights = function(){
        var lights = this.level.LIGHTS;
        for(var a = 0; a < lights.length; a++){
            var light;
            if(lights[a].nametype == "hemi"){
                light = new BABYLON.HemisphericLight(lights[a].ident, new BABYLON.Vector3(rad(lights[a].rotat[0]), rad(lights[a].rotat[1]), rad(lights[a].rotat[2])), this.scene);
            }else if(lights[a].nametype == "dirc"){
                light = new BABYLON.DirectionalLight(lights[a].ident, new BABYLON.Vector3(rad(lights[a].rotat[0]), rad(lights[a].rotat[1]), rad(lights[a].rotat[2])), this.scene);
            }else if(lights[a].nametype == "poin"){
                light = new BABYLON.PointLight      (lights[a].ident, new BABYLON.Vector3(rad(lights[a].rotat[0]), rad(lights[a].rotat[1]), rad(lights[a].rotat[2])), this.scene);
            }else{
                console.log("ERROR: could not determine light of type [" + lights[a].nametype + "]");
                return;
            }

            if(lights[a].shadowGen){
                this.shadowGenerator = new BABYLON.ShadowGenerator(this.level.shadowRes, light);
            }

            light.position = new BABYLON.Vector3(lights[a].posit[0], lights[a].posit[1], lights[a].posit[2]);
            light.intensity = lights[a].intensity;
            light.diffuse = new BABYLON.Color3(lights[a].diffuse[0], lights[a].diffuse[1], lights[a].diffuse[2]);
            light.specular = new BABYLON.Color3(lights[a].specular[0], lights[a].specular[1], lights[a].specular[2]);

            var lightSphere = BABYLON.Mesh.CreateSphere(lights[a].ident + " sphere", 16, 0.5, this.scene);
            lightSphere.material = new BABYLON.StandardMaterial("sphereMat", this.scene);
            lightSphere.material.emissiveColor = new BABYLON.Color3(lights[a].diffuse[0], lights[a].diffuse[1], lights[a].diffuse[2]);
            lightSphere.position = light.position;
            this.lights.push(light);         
        }
    }

    this.createBoundingArea = function(){
        var ground = this.level.GROUND;
        this.bounds.push(BABYLON.Mesh.CreateGround("Ground", ground[0], ground[1], ground[2], this.scene));
        this.bounds[0].receiveShadows = true;
        this.bounds[0].checkCollisions = true;
        this.bounds[0].setPhysicsState({ impostor: BABYLON.PhysicsEngine.PlaneImpostor, mass: 0});
        this.bounds[0].material = new BABYLON.StandardMaterial("Ground", this.scene);

        var bounds = this.level.BOUNDS;
        for(var a = 0; a < bounds.length; a++){
            var plane = BABYLON.Mesh.CreatePlane(bounds[a].ident, 1.0, this.scene);

            plane.scaling  = new BABYLON.Vector3(bounds[a].scale[0], bounds[a].scale[1], bounds[a].scale[2]);
            plane.position = new BABYLON.Vector3(bounds[a].posit[0], bounds[a].posit[1], bounds[a].posit[2]);
            plane.rotation = new BABYLON.Vector3(rad(bounds[a].rotat[0]), rad(bounds[a].rotat[1]), rad(bounds[a].rotat[2]));


            plane.receiveShadows = true;
            plane.checkCollisions = true;
            plane.setPhysicsState({ impostor: BABYLON.PhysicsEngine.PlaneImpostor, mass: 0});
            this.bounds.push(plane);
        }
    }

    this.createTerrain = function(){
        var terrain = this.level.TERRAIN;
        for(var a = 0; a < terrain.length; a++){
            var obj = BABYLON.Mesh.CreateBox(terrain[a].ident, 1, this.scene);
            obj.scaling  = new BABYLON.Vector3(terrain[a].scale[0], terrain[a].scale[1], terrain[a].scale[2]);
            obj.position = new BABYLON.Vector3(terrain[a].posit[0], terrain[a].posit[1], terrain[a].posit[2]);
            obj.rotation = new BABYLON.Vector3(rad(terrain[a].rotat[0]), rad(terrain[a].rotat[1]), rad(terrain[a].rotat[2]));

            obj.receiveShadows = true;
            obj.checkCollisions = true;
            obj.setPhysicsState({ impostor: BABYLON.PhysicsEngine.PlaneImpostor, mass: 0});
            if(this.shadowGenerator != undefined){
                this.shadowGenerator.getShadowMap().renderList.push(obj);
            }
            this.terrain.push(obj);
        }
    }
}