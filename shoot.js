AFRAME.registerComponent("bullets", {
    
    init : function () {
        this.shootBullet();
    },
    shootBullet : function () {
        window.addEventListener("keydown", (e) => {
            if (e.key === "z") {
                var bullet = document.createElement("a-entity");

                bullet.setAttribute("geometry", {
                    primitive : "sphere",
                    radius : 0.1,
                });

                bullet.setAttribute("material", "color", "black");

                var cam = document.querySelector("#camera");

                pos = cam.getAttribute("position");

                bullet.setAttribute("position", {
                    x : pos.x,
                    y : pos.y,
                    z : pos.z,
                });

                bullet.setAttribute("velocity", { x : 0, y : 0, z : -1 });

                var scene = document.querySelector("#scene");

                cam.appendChild(bullet);

                var camera = document.querySelector("#camera").object3D;

                var direction = new THREE.Vector3();
                camera.getWorldDirection(direction);

                bullet.setAttribute("velocity", direction.multiplyScalar(-50));

                var scene = document.querySelector("#scene");

                bullet.setAttribute("dynamic-body", {
                shape: "sphere",
                mass: "50",
                });

                bullet.addEventListener("collide", this.removeBullet);

                scene.appendChild(bullet);
                this.shootSound();
            }
        });
    },
    removeBullet: function (e) {
    var scene = document.querySelector("#scene");
    
    //bullet element
    var element = e.detail.target.el;

    //element which is hit
    var elementHit = e.detail.body.el;

    if (elementHit.id.includes("enemy")) {
      
      var countShooterEl = document.querySelector("#countShooter");
      var shootersFired = parseInt(countshooterEl.getAttribute("text").value);
      shootersFired -= 1;

      countshooterEl.setAttribute("text", {
        value: shootersFired
      });

      if (shootersFired === 0) {
        var txt = document.querySelector("#completed");
        txt.setAttribute("visible", true);       
        
      }
      scene.removeChild(elementHit);
    }
    //remove event listener
    element.removeEventListener("collide", this.removeBullet);

    //remove the bullets from the scene   
    scene.removeChild(element);
  },
  shootSound: function () {
    var entity = document.querySelector("#sound1");
    entity.components.sound.playSound();
  },
});