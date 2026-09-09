// 负责视频录制的主代码块

if (navigator.mediaDevices.getUserMedia) {
  let constraints = {
     audio: false,
     video: true
  }

  navigator.mediaDevices.getUserMedia(constraints)
  .then(function(stream) {
    const video = document.createElement('video');
    video.srcObject = stream;
    video.onloadedmetadata = function() {
      video.play();
      threeRender(video);
    };
  })
  .catch(function(err) {
    console.log('The following gUM error occured: ' + err);
  });
} else {
   console.log('你的浏览器不支持 getUserMedia！');
}

// 绘制 Three.js 立方体

function threeRender(video) {

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  const renderer = new THREE.WebGLRenderer();

  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  // 加载纹理，并将重复模式设为 repeat
  let texture = new THREE.Texture(video);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set( 1, 1 );

  let geometry = new THREE.BoxGeometry(3,3,3);
  let material = new THREE.MeshLambertMaterial( { map: texture, shading: THREE.FlatShading } );
  let cube = new THREE.Mesh( geometry, material );
  scene.add( cube );

  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 5;

  let light = new THREE.AmbientLight( 'rgb(100,100,100)' ); // 柔和的白光
  scene.add( light );

  // 白色 directional light at half intensity shining from the top.
  //var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
  //directionalLight.position.set( 0, 1, 0 );
  //scene.add( directionalLight );

  // 从侧面照射并投下阴影的白色聚光灯
  let spotLight = new THREE.SpotLight( 'rgb(255,255,255)' );
  spotLight.position.set( 100, 1000, 1000 );
  spotLight.castShadow = true;
  spotLight.shadowMapWidth = 1024;
  spotLight.shadowMapHeight = 1024;
  spotLight.shadowCameraNear = 500;
  spotLight.shadowCameraFar = 4000;
  spotLight.shadowCameraFov = 30;
  scene.add( spotLight );

  // 渲染场景

  function render() {
    requestAnimationFrame(render);

    cube.rotation.x += 0.005;
    cube.rotation.y += 0.005;
    texture.needsUpdate = true;
    renderer.render(scene, camera);
  }

  render();

  // 键盘控制

  const body = document.querySelector('body');

  body.onkeydown = function(e) {
    // 37 is arrow left, 39 is arrow right,
    // 38 is arrow up, 40 is arrow down

    if(e.keyCode == 37) {
      camera.position.x += 0.05;
    };

    if(e.keyCode == 39) {
      camera.position.x -= 0.05;
    };

    if(e.keyCode == 38) {
      camera.position.y -= 0.05;
    };

    if(e.keyCode == 40) {
      camera.position.y += 0.05;
    };
  }

  function onWindowResize() {
      renderer.setSize( window.innerWidth, window.innerHeight );
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
  }
  window.addEventListener( 'resize', onWindowResize, false );

}
