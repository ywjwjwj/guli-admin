<template class="tmp">
  <div class="dashboard-container">
    <div>
      <div>
        <canvas id="three"></canvas>
      </div>
      <el-row :gutter="20">
        <el-col >
          <div class="grid-content bg-purple" id="box">
            <el-card shadow="hover">
              <div class="dashboard-text">欢迎你，{{ name }}!</div>
            </el-card>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col >
          <div class="grid-content bg-purple">
            <el-card shadow="hover">
              <div class="dashboard-text">当前你的角色是:<span v-for="role in roles" :key="role">{{ role }}</span></div>
            </el-card>
          </div>
        </el-col>
      </el-row>

    </div>

  </div>
</template>

<script>
  import userApi from '../../api/acl/user.js'
  import loginApi from '../../api/login.js'
  import {
    mapGetters
  } from 'vuex'
  import * as THREE from "three";
  import {
    GLTFLoader
  } from "three/examples/jsm/loaders/GLTFLoader.js";
  import {
    OrbitControls
  } from "three/examples/jsm/controls/OrbitControls";

  // import {
  //   GUI
  // } from "three/examples/jsm/libs/dat.gui.module.js";
  import {
    RGBELoader
  } from "three/examples/jsm/loaders/RGBELoader.js";
  // import { addRotate } from "@/utils/util";

  export default {
    name: 'Dashboard',
    components: {

    },
    computed: {
      ...mapGetters([
        'name',
        'roles',
        'token'
      ])
    },
    data() {
      return {
        //three.js
        scene: null, //场景
        camera: null, //照相机
        controls: null, //控制器
        renderer: null, //渲染器
      }
    },
    mounted() {
      this.initThree(); //初始化场景
      this.addLight(); //添加光源
      this.addModel(); // 加载模型
      this.animate(); //动画
    },
    methods: {
      initThree() {
        // 创建一个场景
        this.scene = new THREE.Scene();
        // 给场景添加颜色
        this.scene.background = new THREE.Color("#ffffff");
        // // 增加雾化效果 参数1 雾化颜色 参数2
        // this.scene.fog = new THREE.Fog("#eee", 20, 50);
        const container = document.getElementById("three");
        const canvas = document.querySelector("#three");
        // 将画布元素添加到渲染器中
        this.renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: true
        });
        // 开起渲染器阴影效果
        this.renderer.shadowMap.enabled = true;
        // 添加照相机
        this.camera = new THREE.PerspectiveCamera(
          70,
          container.clientWidth / container.clientHeight,
          0.01,
          5000
        );
        // 移动照相位置 （照相机最初位置在原点）
        // this.camera.position.x = -1000
        // this.camera.position.z = -1000; //宝石
        // this.camera.position.y = 1;//宝石

        this.camera.position.z = -1000;
        this.camera.position.y = 1;

        // this.camera.rotation.y = -Math.PI
        // this.camera.zoom = 20;
        // this.camera.updateProjectionMatrix();
        var axesHelper = new THREE.AxesHelper(100);
        this.scene.add(axesHelper);

        const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
        pmremGenerator.compileEquirectangularShader();
        new RGBELoader()
          .setDataType(THREE.UnsignedByteType)
          .setPath("static/")
          .load("gem.gltf", (texture) => {
            const envMap = pmremGenerator.fromEquirectangular(texture).texture;

            this.scene.background = envMap;
            this.scene.environment = envMap;

            texture.dispose();
            pmremGenerator.dispose();
            this.animate();
          });

        // 相机控件OrbitControls.js可以对Threejs的三维场景进行缩放、平移、旋转操作，本质上改变的并不是场景，而是相机的参数
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = false;
        this.controls.minPolarAngle = 0;
        this.controls.maxPolarAngle = 0;
        this.controls.enablePan = false; //禁用右键


        // 上下旋转范围
        this.controls.minPolarAngle = Math.PI / 2;
        this.controls.maxPolarAngle = Math.PI / 2;
        // 左右旋转范围
        this.controls.minAzimuthAngle = -Math.PI * (100 / 180);
        this.controls.maxAzimuthAngle = Math.PI * (100 / 180);

        // 原因是设备的物理像素分辨率与CSS像素分辨率的比值的问题，我们的canvas绘制出来后图片因为高清屏设备的影响，导致图片变大，然而我们在浏览器的渲染窗口并没有变大，因此图片会挤压缩放使得canvas画布会变得模糊。
      },
      addLight() {
        // const ambient = new THREE.AmbientLight(0x222222);
        // this.scene.add(ambient);

        // const directionalLight = new THREE.DirectionalLight(0xdddddd, 4);
        // directionalLight.position.set(0, 0, 1).normalize();
        // this.scene.add(directionalLight);
        // let spot1 = new THREE.SpotLight(0xffffff, 1);
        // spot1.position.set(5, 10, 5);
        // spot1.angle = 0.5;
        // spot1.penumbra = 0.75;
        // spot1.intensity = 100;
        // spot1.decay = 2;

        // spot1.castShadow = true;
        // spot1.shadow.bias = 0.0001;
        // spot1.shadow.mapSize.width = 2048;
        // spot1.shadow.mapSize.height = 2048;

        // this.scene.add(spot1);
        // var spotLight = new THREE.SpotLight(0xffffff);
        // spotLight.position.set(10, 10, 10);
        // this.scene.add(spotLight);

        // var spotLightHelper = new THREE.SpotLightHelper(spotLight);
        // this.scene.add(spotLightHelper);

        // 点光源
        // var light = new THREE.PointLight(0xffffff, 1, 100);
        // light.position.set(0, 0, -80);
        // this.scene.add(light);

        // 环境光源
        // const hemLight = new THREE.HemisphereLight(0x0055ff, 0x0055ff, 9);
        // hemLight.position.set(0, 10, 0);
        // this.scene.add(hemLight);

        // 平行光源
        const dirLight = new THREE.DirectionalLight(0xffffff, 3.6);
        //光源等位置
        dirLight.position.set(-20, 10, 10);
        // 可以产生阴影
        dirLight.castShadow = true;
        dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
        this.scene.add(dirLight);
        const dirLight2 = new THREE.DirectionalLight(0xffffff, 5.6);
        //光源等位置
        dirLight2.position.set(20, -15, -10);
        // 可以产生阴影
        dirLight2.castShadow = true;
        dirLight2.shadow.mapSize = new THREE.Vector2(1024, 1024);
        this.scene.add(dirLight2);
      },

      addModel() {
        // 创建模型加载器
        const gltfLoader = new GLTFLoader();
        // music
        gltfLoader.load("static/gem.gltf", (gltf) => {
          let model = gltf.scene;
          model.scale.set(100, 100, 100);//缩放宝石
          // model.position.copy(new THREE.Vector3(0, 3, 0)); //基于远点的位置
          model.rotation.copy(new THREE.Euler(0, Math.PI, 0)); //旋转
          // 遍历模型每部分
          model.traverse((o) => {
            //将图片作为纹理加载
            let explosionTexture = new THREE.TextureLoader().load(
              "static/wl.jpg"
            );
            // //调整纹理图的方向
            // explosionTexture.flipY = false;
            // //将纹理图生成基础网格材质(MeshBasicMaterial)
            // const material = new THREE.MeshBasicMaterial({
            //   map: explosionTexture,
            // });
            // //给模型每部分上材质
            // o.material = material;
            // if (o.isMesh) {
            //   //设置模型生成阴影并接收阴影
            //   o.castShadow = true;
            //   o.receiveShadow = true;
            // }
          });
          this.scene.add(model);
        });
      },
      resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        var width = window.innerWidth;
        var height = window.innerHeight;
        // devicePixelRatio此属性返回当前显示设备的物理像素分辨率与CSS像素分辨率的比值。该值也可以被解释为像素大小的比例：即一个CSS像素的大小相对于一个物理像素的大小的比值。
        var canvasPixelWidth = canvas.width / window.devicePixelRatio;
        var canvasPixelHeight = canvas.height / window.devicePixelRatio;

        const needResize =
          canvasPixelWidth !== width || canvasPixelHeight !== height;
        if (needResize) {
          renderer.setSize(width, height / 2, false);
        }
        return needResize;
      },
      animate() {
        // 更新控制器
        // this.controls.update();
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animate);
        if (this.resizeRendererToDisplaySize(this.renderer)) {
          const canvas = this.renderer.domElement;
          this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
          this.scene.rotateY(0.01) //Y轴旋转
          // 更新场景的渲染
          this.camera.updateProjectionMatrix();
        }
      }
      ,
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .dashboard {

    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }

  #three {
    width: 100%;
    height: 100%;
  }

  .el-row {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }


</style>
<style>
  @keyframes animated-border {
    0% {
      box-shadow: 0 0 0 0 #004444;
    }
    100% {
      box-shadow: 0 0 0 20px #55ff7f;
    }
  }
  #box {
    animation: animated-border 1.5s infinite;
    font-size: 30px;
    line-height: 46px;
  }
</style>
