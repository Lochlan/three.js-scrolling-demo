(function (THREE) {
    'use strict';

    var renderer, scene, camera;
    var pivot;

    init();
    animate();

    function init() {
        var geometry, material, mesh, light, textWidth, textDepth;

        renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 50000);
        camera.position.z = 800;
        camera.position.y = 50;

        geometry = new THREE.TextGeometry('"Hello, World!"', {
            bevelEnabled: true,
            bevelSize: 2,
            bevelThickness: 1.5,
            curveSegments: 10,
            font: 'gentilis',
            height: 10,
            size: 100,
            style: 'normal',
            weight: 'normal',
        });
        material = new THREE.MeshLambertMaterial({ color: 0xff00ff });
        mesh = new THREE.Mesh(geometry, material);

        geometry.computeBoundingBox();
        textWidth = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
        textDepth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

        mesh.position.set(-0.5 * textWidth, 0, -0.5 * textDepth);

        pivot = new THREE.Object3D();
        pivot.add(mesh);
        scene.add(pivot);

        light = new THREE.PointLight(0xffffff);
        light.position.set(50, 50, 1000);
        scene.add(light);

        document.querySelector('.canvas_container').appendChild(renderer.domElement);
    }

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    window.onscroll = function () {
        // spinning out of control
        pivot.rotation.y = -0.001 * window.pageYOffset;
        pivot.rotation.x = 0.01 * window.pageYOffset;
        pivot.position.x = 2 * window.pageYOffset;
        pivot.position.z = -10 * window.pageYOffset;
    };

})(THREE);
