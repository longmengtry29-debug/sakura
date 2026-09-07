/**
 * Tokyo Sakura 3D - Three.js Simulation
 * Features: Procedural Blooming Sakura Tree, Tokyo Tower Skyline,
 * Meguro River Reflections, Falling Petal Particle System,
 * Time of Day Presets, Web Audio Zen Synth, and Cinematic Tour.
 */

window.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. Procedural Texture Generators (Zero External Assets, 100% Offline)
  // =========================================================================

  // Generate realistic curved Sakura Petal Texture
  function createSakuraPetalCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    // Transparent background
    ctx.clearRect(0, 0, 128, 128);

    // Petal shape
    ctx.save();
    ctx.translate(64, 64);

    ctx.beginPath();
    ctx.moveTo(0, -48);
    // Notch at tip of sakura petal
    ctx.bezierCurveTo(-14, -48, -28, -28, -32, 0);
    ctx.bezierCurveTo(-36, 32, -18, 52, 0, 56);
    ctx.bezierCurveTo(18, 52, 36, 32, 32, 0);
    ctx.bezierCurveTo(28, -28, 14, -48, 0, -48);
    ctx.closePath();

    // Petal Gradient (White-pink tip to deep rosy core)
    const grad = ctx.createRadialGradient(0, -10, 5, 0, 10, 56);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.3, '#ffccdc');
    grad.addColorStop(0.75, '#ff85a2');
    grad.addColorStop(1, '#e03a68');

    ctx.fillStyle = grad;
    ctx.fill();

    // Subtle petal vein lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(0, 48);
    ctx.lineTo(0, -36);
    ctx.stroke();

    ctx.restore();
    return canvas;
  }

  // Generate Organic Tree Bark Texture
  function createBarkCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Deep wood base
    ctx.fillStyle = '#231815';
    ctx.fillRect(0, 0, 256, 256);

    // Bark grooves and striations
    for (let i = 0; i < 600; i++) {
      const y = Math.random() * 256;
      const h = 4 + Math.random() * 24;
      const x = Math.random() * 256;
      const w = 2 + Math.random() * 6;

      const alpha = 0.15 + Math.random() * 0.25;
      const isLight = Math.random() > 0.5;
      ctx.fillStyle = isLight ? `rgba(90, 68, 55, ${alpha})` : `rgba(18, 12, 10, ${alpha})`;
      ctx.fillRect(x, y, w, h);
    }

    // Moss patches
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      const r = 6 + Math.random() * 16;
      ctx.fillStyle = `rgba(50, 70, 40, ${0.1 + Math.random() * 0.15})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    return canvas;
  }

  // Generate Japanese Paper Lantern (Chōchin) Texture
  function createLanternCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Red-orange paper glow
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, '#c22026');
    grad.addColorStop(0.5, '#e63946');
    grad.addColorStop(1, '#9e151b');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);

    // Horizontal bamboo ribs
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.lineWidth = 3;
    for (let y = 16; y < 256; y += 22) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(256, y);
      ctx.stroke();
    }

    // Center Kanji "桜" (Sakura)
    ctx.fillStyle = '#111';
    ctx.font = 'bold 96px "Noto Serif JP", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('桜', 128, 130);

    return canvas;
  }

  // Generate Tokyo Skyscraper Window Grid Texture
  function createSkylineCanvas() {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#0a0d18';
    ctx.fillRect(0, 0, 128, 256);

    // Illuminated windows
    for (let y = 8; y < 250; y += 10) {
      for (let x = 6; x < 122; x += 10) {
        const rand = Math.random();
        if (rand > 0.45) {
          const isWarm = Math.random() > 0.4;
          const brightness = 0.4 + Math.random() * 0.6;
          ctx.fillStyle = isWarm
            ? `rgba(255, 215, 130, ${brightness})`
            : `rgba(180, 220, 255, ${brightness})`;
          ctx.fillRect(x, y, 6, 6);
        }
      }
    }
    return canvas;
  }

  // Textures
  const petalTexture = new THREE.CanvasTexture(createSakuraPetalCanvas());
  const barkTexture = new THREE.CanvasTexture(createBarkCanvas());
  barkTexture.wrapS = barkTexture.wrapT = THREE.RepeatWrapping;
  barkTexture.repeat.set(1, 4);

  const lanternTexture = new THREE.CanvasTexture(createLanternCanvas());
  const skylineTexture = new THREE.CanvasTexture(createSkylineCanvas());
  skylineTexture.wrapS = skylineTexture.wrapT = THREE.RepeatWrapping;
  skylineTexture.repeat.set(2, 4);

  // =========================================================================
  // 2. Three.js Scene, Camera, Renderer & Post-Processing
  // =========================================================================

  const container = document.getElementById('canvas-container');
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x060814, 0.008);

  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.5, 1000);
  camera.position.set(0, 14, 48);

  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxPolarAngle = Math.PI / 2 - 0.04; // Don't clip below water
  controls.minDistance = 10;
  controls.maxDistance = 120;
  controls.target.set(0, 10, 0);

  // Post-processing Unreal Bloom
  let composer = null;
  if (typeof THREE.EffectComposer !== 'undefined' && typeof THREE.UnrealBloomPass !== 'undefined') {
    composer = new THREE.EffectComposer(renderer);
    const renderPass = new THREE.RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new THREE.UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.65, // strength
      0.45, // radius
      0.3   // threshold
    );
    composer.addPass(bloomPass);
  }

  // =========================================================================
  // 3. Lighting System
  // =========================================================================

  const ambientLight = new THREE.AmbientLight(0x283250, 1.2);
  scene.add(ambientLight);

  // Moon / Sun Directional Light
  const mainDirLight = new THREE.DirectionalLight(0xaad0ff, 1.4);
  mainDirLight.position.set(30, 60, -40);
  mainDirLight.castShadow = true;
  mainDirLight.shadow.mapSize.width = 2048;
  mainDirLight.shadow.mapSize.height = 2048;
  mainDirLight.shadow.bias = -0.0005;
  scene.add(mainDirLight);

  // Warm Tree Core Uplight (Simulates ground illuminations for Yozakura)
  const treeUplight = new THREE.PointLight(0xff6688, 2.5, 35, 1.5);
  treeUplight.position.set(0, 4, 2);
  scene.add(treeUplight);

  // Second ambient fill for deep branches
  const treeFillLight = new THREE.PointLight(0xffb7c5, 1.8, 30, 1.8);
  treeFillLight.position.set(-6, 12, -4);
  scene.add(treeFillLight);

  // =========================================================================
  // 4. Procedural Blooming Sakura Tree
  // =========================================================================

  const treeGroup = new THREE.Group();
  scene.add(treeGroup);

  const barkMaterial = new THREE.MeshStandardMaterial({
    map: barkTexture,
    roughness: 0.85,
    metalness: 0.1,
    bumpScale: 0.05
  });

  // Helper: Create curved organic branch segment
  function createBranchMesh(radiusTop, radiusBottom, length, radialSegments = 10) {
    const geom = new THREE.CylinderGeometry(radiusTop, radiusBottom, length, radialSegments);
    geom.translate(0, length / 2, 0); // Origin at base
    return new THREE.Mesh(geom, barkMaterial);
  }

  // Build Trunk & Limbs
  const trunkBase = createBranchMesh(1.7, 2.4, 7);
  trunkBase.rotation.z = -0.08;
  trunkBase.rotation.x = 0.05;
  trunkBase.castShadow = true;
  trunkBase.receiveShadow = true;
  treeGroup.add(trunkBase);

  // Mid Trunk with organic lean
  const trunkMid = createBranchMesh(1.2, 1.7, 6);
  trunkMid.position.y = 6.8;
  trunkMid.rotation.z = -0.15;
  trunkMid.rotation.y = 0.2;
  trunkBase.add(trunkMid);

  // Blossom Cluster Positions accumulator
  const blossomClusters = [];
  const lanternPoints = [];

  // Recursive Branch Builder
  function addBranch(parent, length, radius, angleZ, angleX, angleY, depth) {
    const branch = createBranchMesh(radius * 0.65, radius, length);
    branch.position.y = length * 0.9;
    branch.rotation.z = angleZ;
    branch.rotation.x = angleX;
    branch.rotation.y = angleY;
    branch.castShadow = true;
    parent.add(branch);

    if (depth < 4) {
      // Sub-branches
      const branchesCount = depth === 3 ? 2 : 3;
      for (let i = 0; i < branchesCount; i++) {
        const nextLen = length * (0.65 + Math.random() * 0.25);
        const nextRad = radius * 0.65;
        const nZ = (Math.random() - 0.45) * 0.85;
        const nX = (Math.random() - 0.45) * 0.85;
        const nY = (i * (Math.PI * 2 / branchesCount)) + (Math.random() - 0.5) * 0.4;
        addBranch(branch, nextLen, nextRad, nZ, nX, nY, depth + 1);
      }
    } else {
      // Endpoint reached: Register for Cherry Blossom clusters!
      const worldPos = new THREE.Vector3();
      branch.getWorldPosition(worldPos);
      blossomClusters.push({
        position: worldPos,
        parent: branch,
        scale: 1.5 + Math.random() * 1.5
      });
    }

    // Hang lantern on select major boughs
    if (depth === 2 && Math.random() > 0.4 && lanternPoints.length < 5) {
      lanternPoints.push(branch);
    }
  }

  // Major primary boughs
  addBranch(trunkMid, 6.5, 1.1, 0.45, 0.25, 0.1, 1);
  addBranch(trunkMid, 6.0, 1.0, -0.55, -0.3, 2.1, 1);
  addBranch(trunkMid, 5.8, 0.95, 0.1, -0.65, -1.8, 1);
  addBranch(trunkMid, 5.5, 0.9, -0.2, 0.6, 1.2, 1);

  // Blossom Cloud Particles (Instanced clusters on branches)
  const blossomCount = 3800;
  const blossomGeom = new THREE.PlaneGeometry(0.85, 0.85);

  const blossomMat = new THREE.MeshStandardMaterial({
    map: petalTexture,
    transparent: true,
    alphaTest: 0.05,
    side: THREE.DoubleSide,
    roughness: 0.6,
    metalness: 0.05,
    emissive: 0xff758c,
    emissiveIntensity: 0.25
  });

  const blossomInstanced = new THREE.InstancedMesh(blossomGeom, blossomMat, blossomCount);
  blossomInstanced.castShadow = true;
  blossomInstanced.receiveShadow = true;

  const dummy = new THREE.Object3D();
  let bIdx = 0;

  // Distribute flowers organically around branch tips
  blossomClusters.forEach((cluster) => {
    const flowersInCluster = Math.floor(blossomCount / blossomClusters.length);

    for (let f = 0; f < flowersInCluster && bIdx < blossomCount; f++) {
      // Gaussian sphere distribution
      const r = (Math.random() * 2.8 + 0.3) * cluster.scale;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const dx = r * Math.sin(phi) * Math.cos(theta);
      const dy = r * Math.sin(phi) * Math.sin(theta) * 0.75 + 1.2;
      const dz = r * Math.cos(phi);

      dummy.position.set(
        cluster.position.x + dx,
        cluster.position.y + dy,
        cluster.position.z + dz
      );

      dummy.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      const s = 0.55 + Math.random() * 0.6;
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();

      blossomInstanced.setMatrixAt(bIdx, dummy.matrix);

      // Color variation: Blush pink, delicate pastel, pure white
      const colorRatio = Math.random();
      let pColor = new THREE.Color(0xff85a2);
      if (colorRatio > 0.6) pColor = new THREE.Color(0xffc2d1);
      else if (colorRatio > 0.85) pColor = new THREE.Color(0xffffff);

      blossomInstanced.setColorAt(bIdx, pColor);
      bIdx++;
    }
  });

  blossomInstanced.instanceMatrix.needsUpdate = true;
  if (blossomInstanced.instanceColor) blossomInstanced.instanceColor.needsUpdate = true;
  scene.add(blossomInstanced);

  // =========================================================================
  // 5. Hanging Traditional Paper Lanterns (Chōchin)
  // =========================================================================

  const lanternLights = [];
  const lanternMat = new THREE.MeshStandardMaterial({
    map: lanternTexture,
    emissive: 0xff3311,
    emissiveIntensity: 0.8,
    roughness: 0.5
  });

  const lanternCapMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.3 });

  lanternPoints.forEach((branch, i) => {
    const lanternGroup = new THREE.Group();

    // Suspension cord
    const cordGeom = new THREE.CylinderGeometry(0.015, 0.015, 1.4);
    const cordMesh = new THREE.Mesh(cordGeom, lanternCapMat);
    cordMesh.position.y = -0.7;
    lanternGroup.add(cordMesh);

    // Lantern Oval Body
    const bodyGeom = new THREE.CylinderGeometry(0.45, 0.45, 1.2, 16);
    // Bulge vertices slightly
    const posAttr = bodyGeom.attributes.position;
    for (let j = 0; j < posAttr.count; j++) {
      const y = posAttr.getY(j);
      const bulge = Math.cos((y / 0.6) * (Math.PI / 2)) * 0.25;
      posAttr.setX(j, posAttr.getX(j) * (1 + bulge));
      posAttr.setZ(j, posAttr.getZ(j) * (1 + bulge));
    }
    bodyGeom.computeVertexNormals();

    const bodyMesh = new THREE.Mesh(bodyGeom, lanternMat);
    bodyMesh.position.y = -1.9;
    lanternGroup.add(bodyMesh);

    // Caps
    const topCap = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.12, 16), lanternCapMat);
    topCap.position.y = -1.3;
    lanternGroup.add(topCap);

    const botCap = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.12, 16), lanternCapMat);
    botCap.position.y = -2.5;
    lanternGroup.add(botCap);

    // Tassel
    const tassel = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.06, 0.6), lanternCapMat);
    tassel.position.y = -2.85;
    lanternGroup.add(tassel);

    // Glowing PointLight inside lantern
    const light = new THREE.PointLight(0xff7722, 1.8, 18, 1.6);
    light.position.y = -1.9;
    lanternGroup.add(light);
    lanternLights.push(light);

    branch.add(lanternGroup);
  });

  // =========================================================================
  // 6. Tokyo Tower & City Skyline
  // =========================================================================

  const cityGroup = new THREE.Group();
  scene.add(cityGroup);

  // Tokyo Tower Model (Iconic Lattice Tower)
  const tokyoTowerGroup = new THREE.Group();
  tokyoTowerGroup.position.set(38, 0, -110);
  tokyoTowerGroup.scale.set(0.9, 1.1, 0.9);
  cityGroup.add(tokyoTowerGroup);

  const towerRedMat = new THREE.MeshStandardMaterial({
    color: 0xee2222,
    roughness: 0.4,
    emissive: 0xff2222,
    emissiveIntensity: 0.75
  });

  const towerWhiteMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.3,
    emissive: 0xffeeee,
    emissiveIntensity: 0.5
  });

  // 4 Angled Base Legs
  const legGeom = new THREE.CylinderGeometry(0.4, 0.8, 24, 6);
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2 + Math.PI / 4;
    const leg = new THREE.Mesh(legGeom, towerRedMat);
    leg.position.set(Math.cos(angle) * 8, 12, Math.sin(angle) * 8);
    leg.rotation.z = -Math.cos(angle) * 0.28;
    leg.rotation.x = Math.sin(angle) * 0.28;
    tokyoTowerGroup.add(leg);
  }

  // Cross struts lattice rings
  for (let y = 6; y <= 24; y += 5) {
    const r = 8 - (y / 24) * 5;
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.3, 4, 16), towerWhiteMat);
    ring.position.y = y;
    ring.rotation.x = Math.PI / 2;
    tokyoTowerGroup.add(ring);
  }

  // Main Observation Deck
  const deckGeom = new THREE.CylinderGeometry(3.6, 3.2, 3.5, 16);
  const deckMat = new THREE.MeshStandardMaterial({
    color: 0x111625,
    emissive: 0xffaa44,
    emissiveIntensity: 0.8,
    roughness: 0.3
  });
  const deck = new THREE.Mesh(deckGeom, deckMat);
  deck.position.y = 25.5;
  tokyoTowerGroup.add(deck);

  // Upper Tower Taper (Alternating Red & White)
  const upperLevels = [
    { h: 10, r1: 2.2, r2: 1.6, mat: towerWhiteMat, y: 32 },
    { h: 12, r1: 1.6, r2: 1.1, mat: towerRedMat, y: 43 },
    { h: 10, r1: 1.1, r2: 0.7, mat: towerWhiteMat, y: 54 },
    { h: 14, r1: 0.7, r2: 0.4, mat: towerRedMat, y: 66 }
  ];

  upperLevels.forEach(lvl => {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(lvl.r2, lvl.r1, lvl.h, 12), lvl.mat);
    mesh.position.y = lvl.y;
    tokyoTowerGroup.add(mesh);
  });

  // Top Spire & Beacon
  const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.35, 16, 8), towerWhiteMat);
  spire.position.y = 81;
  tokyoTowerGroup.add(spire);

  // Red Aviation Beacon Light
  const beaconGeom = new THREE.SphereGeometry(0.6, 12, 12);
  const beaconMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const beacon = new THREE.Mesh(beaconGeom, beaconMat);
  beacon.position.y = 89;
  tokyoTowerGroup.add(beacon);

  const beaconLight = new THREE.PointLight(0xff1122, 2.5, 50, 1.5);
  beaconLight.position.y = 89;
  tokyoTowerGroup.add(beaconLight);

  // Tokyo Tower Warm Glow Fill
  const towerGlowLight = new THREE.PointLight(0xff5533, 3.0, 120, 1.2);
  towerGlowLight.position.set(38, 35, -100);
  scene.add(towerGlowLight);

  // Tokyo Skyscrapers Skyline
  const buildingMat = new THREE.MeshStandardMaterial({
    color: 0x0c101c,
    map: skylineTexture,
    roughness: 0.4,
    metalness: 0.3
  });

  const bldgGeom = new THREE.BoxGeometry(1, 1, 1);
  const buildingCount = 42;

  for (let i = 0; i < buildingCount; i++) {
    const w = 6 + Math.random() * 14;
    const d = 6 + Math.random() * 12;
    const h = 20 + Math.random() * 55;

    const bldg = new THREE.Mesh(bldgGeom, buildingMat);
    bldg.scale.set(w, h, d);

    // Spread along the horizon behind the river
    const angle = (i / buildingCount) * Math.PI * 0.9 - Math.PI * 0.45;
    const dist = 110 + Math.random() * 50;

    bldg.position.set(
      Math.sin(angle) * dist,
      h / 2 - 1,
      -Math.cos(angle) * dist - 20
    );

    cityGroup.add(bldg);

    // Rooftop Antenna / Neon Spire on select buildings
    if (Math.random() > 0.45) {
      const spireH = 4 + Math.random() * 10;
      const roofSpire = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.25, spireH, 6),
        towerWhiteMat
      );
      roofSpire.position.set(bldg.position.x, h + spireH / 2, bldg.position.z);
      cityGroup.add(roofSpire);
    }
  }

  // =========================================================================
  // 7. River, Riverbank, Traditional Bridge & Stone Lantern
  // =========================================================================

  // Reflective Meguro River Water Surface
  const waterGeom = new THREE.PlaneGeometry(280, 280, 48, 48);
  const waterMat = new THREE.MeshStandardMaterial({
    color: 0x0b1326,
    roughness: 0.12,
    metalness: 0.88,
    flatShading: false
  });
  const waterMesh = new THREE.Mesh(waterGeom, waterMat);
  waterMesh.rotation.x = -Math.PI / 2;
  waterMesh.position.y = -0.05;
  waterMesh.receiveShadow = true;
  scene.add(waterMesh);

  // Riverbank Stone Wall / Ground
  const groundGeom = new THREE.PlaneGeometry(80, 60, 24, 24);
  const groundMat = new THREE.MeshStandardMaterial({
    color: 0x181f2b,
    roughness: 0.9,
    metalness: 0.1
  });
  const ground = new THREE.Mesh(groundGeom, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(-15, 0.1, 15);
  ground.receiveShadow = true;
  scene.add(ground);

  // Traditional Arched Red Bridge (Taiko-bashi)
  const bridgeGroup = new THREE.Group();
  bridgeGroup.position.set(-28, 0, -18);
  bridgeGroup.rotation.y = 0.45;
  scene.add(bridgeGroup);

  const bridgeRedMat = new THREE.MeshStandardMaterial({ color: 0xbd1e24, roughness: 0.45 });
  const bridgeFloorMat = new THREE.MeshStandardMaterial({ color: 0x241d1a, roughness: 0.8 });

  // Arched Deck
  const archSegments = 16;
  const bridgeWidth = 4.5;
  const bridgeSpan = 18;
  const archHeight = 2.8;

  for (let s = 0; s < archSegments; s++) {
    const t1 = s / archSegments;
    const t2 = (s + 1) / archSegments;
    const x1 = (t1 - 0.5) * bridgeSpan;
    const x2 = (t2 - 0.5) * bridgeSpan;
    const y1 = Math.sin(t1 * Math.PI) * archHeight;
    const y2 = Math.sin(t2 * Math.PI) * archHeight;

    const segGeom = new THREE.BoxGeometry(bridgeSpan / archSegments + 0.1, 0.4, bridgeWidth);
    const seg = new THREE.Mesh(segGeom, bridgeFloorMat);
    seg.position.set((x1 + x2) / 2, (y1 + y2) / 2, 0);
    seg.rotation.z = Math.atan2(y2 - y1, x2 - x1);
    seg.castShadow = true;
    seg.receiveShadow = true;
    bridgeGroup.add(seg);
  }

  // Bridge Red Railings
  for (let side of [-1, 1]) {
    for (let s = 0; s <= archSegments; s++) {
      const t = s / archSegments;
      const x = (t - 0.5) * bridgeSpan;
      const y = Math.sin(t * Math.PI) * archHeight;

      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.2, 8), bridgeRedMat);
      post.position.set(x, y + 0.6, side * (bridgeWidth / 2 - 0.2));
      bridgeGroup.add(post);
    }
  }

  // Stone Lantern (Tōrō) on the riverbank
  const lanternStoneMat = new THREE.MeshStandardMaterial({ color: 0x4a525d, roughness: 0.95 });
  const stoneLantern = new THREE.Group();
  stoneLantern.position.set(-6, 0, 8);
  stoneLantern.scale.set(0.9, 0.9, 0.9);
  scene.add(stoneLantern);

  const toroBase = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1.0, 0.5, 6), lanternStoneMat);
  toroBase.position.y = 0.25;
  stoneLantern.add(toroBase);

  const toroStem = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.4, 2.2, 6), lanternStoneMat);
  toroStem.position.y = 1.6;
  stoneLantern.add(toroStem);

  const toroPlatform = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 0.6, 0.4, 6), lanternStoneMat);
  toroPlatform.position.y = 2.9;
  stoneLantern.add(toroPlatform);

  // Light chamber
  const toroLightChamber = new THREE.Mesh(
    new THREE.CylinderGeometry(0.7, 0.7, 0.9, 6),
    new THREE.MeshStandardMaterial({
      color: 0x111,
      emissive: 0xff9933,
      emissiveIntensity: 1.2,
      roughness: 0.3
    })
  );
  toroLightChamber.position.y = 3.55;
  stoneLantern.add(toroLightChamber);

  const toroRoof = new THREE.Mesh(new THREE.ConeGeometry(1.4, 0.8, 6), lanternStoneMat);
  toroRoof.position.y = 4.4;
  stoneLantern.add(toroRoof);

  const toroLight = new THREE.PointLight(0xff9933, 1.6, 14, 1.8);
  toroLight.position.set(-6, 3.55, 8);
  scene.add(toroLight);

  // =========================================================================
  // 8. Dynamic Falling Sakura Petals Particle Simulation (2,500 Petals)
  // =========================================================================

  const PETAL_COUNT = 2500;
  const petalInstanced = new THREE.InstancedMesh(blossomGeom, blossomMat, PETAL_COUNT);
  petalInstanced.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  scene.add(petalInstanced);

  // Particle Attributes Array
  const petalsData = [];
  const pDummy = new THREE.Object3D();

  for (let i = 0; i < PETAL_COUNT; i++) {
    const p = {
      x: (Math.random() - 0.5) * 70,
      y: 1.0 + Math.random() * 32,
      z: (Math.random() - 0.5) * 60,
      vx: (Math.random() - 0.4) * 0.05,
      vy: -(0.035 + Math.random() * 0.045), // gentle fall
      vz: (Math.random() - 0.5) * 0.04,
      rotX: Math.random() * Math.PI * 2,
      rotY: Math.random() * Math.PI * 2,
      rotZ: Math.random() * Math.PI * 2,
      rotSpeedX: (Math.random() - 0.5) * 0.04,
      rotSpeedY: (Math.random() - 0.5) * 0.05,
      rotSpeedZ: (Math.random() - 0.5) * 0.03,
      wobbleSpeed: 1.5 + Math.random() * 2.5,
      wobblePhase: Math.random() * Math.PI * 2,
      scale: 0.35 + Math.random() * 0.45
    };
    petalsData.push(p);

    // Initial color variation
    const r = Math.random();
    let col = new THREE.Color(0xff85a2);
    if (r > 0.6) col = new THREE.Color(0xffc2d1);
    else if (r > 0.88) col = new THREE.Color(0xffffff);
    petalInstanced.setColorAt(i, col);
  }
  if (petalInstanced.instanceColor) petalInstanced.instanceColor.needsUpdate = true;

  // Wind speed controller state
  let baseWindFactor = 1.0;
  let blizzardBoost = 1.0;
  let blizzardTimer = 0;

  // Mouse wind swirl interaction
  const mouseRaycaster = new THREE.Raycaster();
  const mouseScreen = new THREE.Vector2(-9999, -9999);
  const mouseWorld = new THREE.Vector3(0, 10, 0);

  window.addEventListener('mousemove', (e) => {
    mouseScreen.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseScreen.y = -(e.clientY / window.innerHeight) * 2 + 1;
    mouseRaycaster.setFromCamera(mouseScreen, camera);
    mouseRaycaster.ray.at(25, mouseWorld);
  });

  // =========================================================================
  // 9. Time of Day Presets & Atmosphere
  // =========================================================================

  const TIME_PRESETS = {
    night: {
      name: 'Yozakura',
      status: 'Tokyo Night • 2,500 Petals In Flight',
      fogColor: 0x060814,
      ambientColor: 0x222a45,
      ambientInt: 1.2,
      dirColor: 0xaad0ff,
      dirInt: 1.4,
      dirPos: [30, 60, -40],
      treeUplightInt: 2.8,
      towerGlowInt: 3.2,
      waterColor: 0x0b1326
    },
    twilight: {
      name: 'Twilight',
      status: 'Twilight Sunset • Crimson & Gold Dusk',
      fogColor: 0x221226,
      ambientColor: 0x6a3855,
      ambientInt: 1.6,
      dirColor: 0xff8844,
      dirInt: 2.2,
      dirPos: [50, 20, -70],
      treeUplightInt: 1.5,
      towerGlowInt: 2.5,
      waterColor: 0x1f1424
    },
    dawn: {
      name: 'Spring Day',
      status: 'Crisp Morning Sun • Fresh Blossom Breeze',
      fogColor: 0xbfd8f0,
      ambientColor: 0x9bc2e6,
      ambientInt: 2.0,
      dirColor: 0xfffaed,
      dirInt: 2.6,
      dirPos: [40, 70, 30],
      treeUplightInt: 0.6,
      towerGlowInt: 0.8,
      waterColor: 0x1a334d
    }
  };

  function applyTimePreset(key) {
    const p = TIME_PRESETS[key];
    if (!p) return;

    document.getElementById('sceneStatus').textContent = p.status;

    scene.fog.color.setHex(p.fogColor);
    renderer.setClearColor(p.fogColor);

    ambientLight.color.setHex(p.ambientColor);
    ambientLight.intensity = p.ambientInt;

    mainDirLight.color.setHex(p.dirColor);
    mainDirLight.intensity = p.dirInt;
    mainDirLight.position.set(p.dirPos[0], p.dirPos[1], p.dirPos[2]);

    treeUplight.intensity = p.treeUplightInt;
    towerGlowLight.intensity = p.towerGlowInt;
    waterMat.color.setHex(p.waterColor);
  }

  // =========================================================================
  // 10. Web Audio Zen Sound Synthesizer (Japanese In-sen Scale Chimes & Wind)
  // =========================================================================

  let audioCtx = null;
  let isAudioActive = false;
  let windNoiseNode = null;
  let chimeTimer = null;

  // Japanese Hirajoshi / In-Sen pentatonic scale frequencies (D4, Eb4, G4, A4, C5, D5)
  const CHIME_FREQS = [293.66, 311.13, 392.00, 440.00, 523.25, 587.33];

  function initAudio() {
    if (audioCtx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();

    // Subtle filtered pink noise for gentle spring breeze
    const bufferSize = audioCtx.sampleRate * 2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      output[i] = (b0 + b1 + b2) * 0.08;
    }

    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 450;

    const windGain = audioCtx.createGain();
    windGain.gain.value = 0.12;

    whiteNoise.connect(filter);
    filter.connect(windGain);
    windGain.connect(audioCtx.destination);
    whiteNoise.start(0);
    windNoiseNode = windGain;

    // Organic Wind Chime Bell generator
    function triggerRandomChime() {
      if (!isAudioActive || !audioCtx) return;

      const freq = CHIME_FREQS[Math.floor(Math.random() * CHIME_FREQS.length)];
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      // Delicate bell envelope
      gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.18, audioCtx.currentTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 3.2);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 3.3);

      const nextDelay = 1800 + Math.random() * 4500;
      chimeTimer = setTimeout(triggerRandomChime, nextDelay);
    }

    triggerRandomChime();
  }

  function toggleAudio() {
    if (!audioCtx) initAudio();

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    isAudioActive = !isAudioActive;
    const btn = document.getElementById('audioToggleBtn');
    const label = document.getElementById('audioLabel');
    const iconOn = document.getElementById('audioIconOn');
    const iconOff = document.getElementById('audioIconOff');

    if (isAudioActive) {
      btn.classList.add('active');
      label.textContent = 'Sound: On';
      iconOn.style.display = 'block';
      iconOff.style.display = 'none';
      if (windNoiseNode) windNoiseNode.gain.setTargetAtTime(0.12, audioCtx.currentTime, 0.5);
    } else {
      btn.classList.remove('active');
      label.textContent = 'Sound: Off';
      iconOn.style.display = 'none';
      iconOff.style.display = 'block';
      if (windNoiseNode) windNoiseNode.gain.setTargetAtTime(0.0001, audioCtx.currentTime, 0.2);
    }
  }

  // =========================================================================
  // 11. Cinematic Tour Mode
  // =========================================================================

  let isCinematicTour = false;
  let tourProgress = 0;

  // Smooth spline curve around tree, river, and Tokyo Tower
  const tourPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 12, 48),
    new THREE.Vector3(-22, 9, 32),
    new THREE.Vector3(-24, 7, -10),
    new THREE.Vector3(4, 15, -18),
    new THREE.Vector3(26, 18, 14),
    new THREE.Vector3(12, 14, 42)
  ], true);

  // =========================================================================
  // 12. UI Event Listeners & HUD Controls
  // =========================================================================

  // Time presets
  document.querySelectorAll('.time-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyTimePreset(btn.dataset.time);
    });
  });

  // Wind speed slider
  const windSlider = document.getElementById('windSlider');
  const windVal = document.getElementById('windVal');
  windSlider.addEventListener('input', (e) => {
    baseWindFactor = parseFloat(e.target.value);
    windVal.textContent = `${baseWindFactor.toFixed(1)}x`;
  });

  // Sakura Fubuki (Petal Blizzard) Burst
  const blizzardBtn = document.getElementById('blizzardBtn');
  blizzardBtn.addEventListener('click', () => {
    blizzardBoost = 3.5;
    blizzardTimer = 320; // ~5 seconds of flurry
    blizzardBtn.style.transform = 'scale(0.95)';
    setTimeout(() => { blizzardBtn.style.transform = ''; }, 180);
  });

  // Camera Mode buttons
  const freeCamBtn = document.getElementById('freeCamBtn');
  const cinematicTourBtn = document.getElementById('cinematicTourBtn');

  freeCamBtn.addEventListener('click', () => {
    isCinematicTour = false;
    freeCamBtn.classList.add('active');
    cinematicTourBtn.classList.remove('active');
    controls.enabled = true;
  });

  cinematicTourBtn.addEventListener('click', () => {
    isCinematicTour = true;
    cinematicTourBtn.classList.add('active');
    freeCamBtn.classList.remove('active');
    controls.enabled = false;
  });

  // Audio Toggle
  document.getElementById('audioToggleBtn').addEventListener('click', toggleAudio);

  // Window Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (composer) composer.setSize(window.innerWidth, window.innerHeight);
  });

  // =========================================================================
  // 13. Main Render Loop & Animation
  // =========================================================================

  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();
    const delta = clock.getDelta();

    // 1. Lantern Flickering & Gentle Sway
    lanternLights.forEach((light, i) => {
      const flicker = Math.sin(elapsedTime * 8 + i * 2) * 0.15 + Math.cos(elapsedTime * 14 + i) * 0.1;
      light.intensity = 1.7 + flicker;
    });

    // 2. Beacon Pulsing on Tokyo Tower
    if (beaconLight) {
      beaconLight.intensity = Math.sin(elapsedTime * 3) > 0.4 ? 3.0 : 0.2;
    }

    // 3. Gentle Tree Limb Sway in the Breeze
    const sway = Math.sin(elapsedTime * 0.8) * 0.015 * baseWindFactor;
    treeGroup.rotation.z = sway;
    treeGroup.rotation.x = Math.cos(elapsedTime * 0.6) * 0.01 * baseWindFactor;

    // 4. Subtle Water Ripples (Vertex displacement animation)
    const waterPos = waterGeom.attributes.position;
    for (let i = 0; i < waterPos.count; i++) {
      const u = waterPos.getX(i);
      const v = waterPos.getY(i);
      const wave = Math.sin(u * 0.12 + elapsedTime * 1.5) * 0.08 +
                   Math.cos(v * 0.14 + elapsedTime * 1.2) * 0.08;
      waterPos.setZ(i, wave);
    }
    waterPos.needsUpdate = true;

    // 5. Petal Blizzard Decay
    if (blizzardTimer > 0) {
      blizzardTimer--;
      if (blizzardTimer === 0) blizzardBoost = 1.0;
    }

    const currentWindSpeed = baseWindFactor * blizzardBoost;

    // 6. Update Falling Sakura Petals Physics
    for (let i = 0; i < PETAL_COUNT; i++) {
      const p = petalsData[i];

      // Fluttering wobble & wind vector
      const wobble = Math.sin(elapsedTime * p.wobbleSpeed + p.wobblePhase);
      p.x += (p.vx + Math.sin(elapsedTime * 0.6) * 0.04 + wobble * 0.03) * currentWindSpeed;
      p.y += p.vy * (blizzardBoost > 1 ? 1.4 : 1.0);
      p.z += (p.vz + Math.cos(elapsedTime * 0.5) * 0.03) * currentWindSpeed;

      // Tumbling rotation
      p.rotX += p.rotSpeedX;
      p.rotY += p.rotSpeedY;
      p.rotZ += p.rotSpeedZ;

      // Mouse Wind Interaction: Petals swirl away from cursor ray
      const distToMouse = Math.hypot(p.x - mouseWorld.x, p.y - mouseWorld.y, p.z - mouseWorld.z);
      if (distToMouse < 12) {
        const force = (12 - distToMouse) * 0.015;
        p.x += (p.x - mouseWorld.x) * force;
        p.y += Math.abs(p.y - mouseWorld.y) * force * 0.5;
        p.z += (p.z - mouseWorld.z) * force;
      }

      // Ground / Water collision & boundary wrap
      if (p.y < 0.1 || p.x > 38 || p.x < -38 || p.z > 35 || p.z < -35) {
        p.x = (Math.random() - 0.5) * 60;
        p.y = 22 + Math.random() * 12; // Respawn in canopy
        p.z = (Math.random() - 0.5) * 45;
      }

      // Update instanced transform matrix
      pDummy.position.set(p.x, p.y, p.z);
      pDummy.rotation.set(p.rotX, p.rotY, p.rotZ);
      pDummy.scale.set(p.scale, p.scale, p.scale);
      pDummy.updateMatrix();

      petalInstanced.setMatrixAt(i, pDummy.matrix);
    }
    petalInstanced.instanceMatrix.needsUpdate = true;

    // 7. Camera Management: Free Orbit vs Cinematic Tour
    if (isCinematicTour) {
      tourProgress = (tourProgress + 0.00065) % 1;
      const camPos = tourPath.getPointAt(tourProgress);
      camera.position.copy(camPos);

      // Point towards tree center and Tokyo Tower
      const targetLook = new THREE.Vector3(8, 8, -25);
      camera.lookAt(targetLook);
    } else {
      controls.update();
    }

    // 8. Render Scene (with bloom post-processing if supported)
    if (composer) {
      composer.render();
    } else {
      renderer.render(scene, camera);
    }
  }

  // =========================================================================
  // 14. Initialization & Hide Loading Screen
  // =========================================================================

  applyTimePreset('night');
  animate();

  // Hide loading screen smoothly after initialization
  setTimeout(() => {
    const loader = document.getElementById('loadingOverlay');
    if (loader) loader.classList.add('hidden');
  }, 900);
});
