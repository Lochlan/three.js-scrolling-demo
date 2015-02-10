(function () {
    'use strict';

    var renderer, scene, camera;
    var geometry, material, mesh, light;
    var pivot;

    init();
    animate();

    function init() {

        renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        var width = window.innerWidth;
        var height = window.innerHeight;
        camera.position.z = 800;
        camera.position.y = 50;

        geometry = new THREE.TextGeometry("Lochlan McIntosh", {
            bevelEnabled: true,
            bevelSize: 2,
            bevelThickness: 1.5,
            curveSegments: 10,
            font: 'gentilis',
            height: 5,
            size: 100,
            style: 'normal',
            weight: 'normal',
        });
        material = new THREE.MeshLambertMaterial({ color: 0x111111 });
        mesh = new THREE.Mesh(geometry, material);

        geometry.computeBoundingBox();
        var textWidth = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
        var textDepth = geometry.boundingBox.max.z - geometry.boundingBox.min.z;

        mesh.position.set( -0.5 * textWidth, 0, -0.5 * textDepth );

        pivot = new THREE.Object3D();
        pivot.add( mesh );
        scene.add( pivot );

        light = new THREE.PointLight(0xffffff);
        light.position.set(50, 50, 1000);
        scene.add(light);

        document.body.appendChild(renderer.domElement);
    }

    function animate() {

        requestAnimationFrame(animate);

        pivot.rotation.y += 0.02;

        renderer.render(scene, camera);

    }

})();
