import * as THREE from 'three';    
import * as D3D from '3d-nft-viewer'
let counter = 0;
//const PROXYURL = 'http://nftzexpress.azurewebsites.net/proxy?url='; //URL and parameter to add to request for image
const PROXYURL = 'http://localhost:3001/proxy?url='; //URL and parameter to add to request for image
  //create array of nfts to view
  let nfts3D = [];
  let nfts2D = [];

export const createScene = (el) => {

  /*  Get username from url - this will be gallery name in nftz  */
  const urlParams = new URLSearchParams(window.location.search);
  const nftUserName = urlParams.get('username');

  /* TODO Get these parameters from NFT stored gallery preferences instead of URL  */
  var sceneryName = urlParams.get('scenery');
    console.log('sceneryName from url: '+sceneryName);

  if(!sceneryName){
    sceneryName = 'art1';
  };
  console.log('sceneryName: '+sceneryName);


  let vrControls = "walking";
  let vrControlsParam =  urlParams.get('vrcontrols'); 

  if(vrControlsParam){
    vrControls = vrControlsParam;
  };

  const avatar = urlParams.get('avatar');

  let sceneryOptions = {'modern':{
      hasCircleLayout: true,
      radius: 20,
      sceneryPath: 'https://bitcloutweb.azureedge.net/public/3d/models/large_round_gallery_room/scene.gltf',
      sceneScale: 0.01,
      scaleModelToHeight:6,
      scaleModelToWidth: 6,
      scaleModelToDepth: 6,
      playerStartPos: {x:10,y:4,z:10},
      floorPlan: [{type:'centerPiece',
                maxItems: 1},
                {type:'circle',
                radius: 5,
                maxItems: 3},
                {type:'circle',
                 radius: 12,
                maxItems: 6},
                {type:'circle',
                 radius: 20,
                maxItems: 12}]
    },
    'art1':{
      hasCircleLayout: false,
      sceneryPath: 'https://bitcloutweb.azureedge.net/public/3d/models/art1/scene.gltf',
      sceneScale: 0.01,
      scaleModelToHeight:2,
      scaleModelToWidth: 2,
      scaleModelToDepth: 2,
      playerStartPos: {x:0,y:-1,z:0},
      floorPlan: [{type:'list',
                  spots:[  {pos:{x: -0.10944072448069289, y: -1.6, z: -6.047203540802002}, dims:{width:1.5, height: 1.5}},
                           {pos:{x: -0.06733116066026976, y: -0.8, z: -16.733196258544922}, dims:{width:1.5, height: 3}},
                           {pos:{x: 7.697452392578127, y: -0.8, z: -11.542924826859029}, dims:{width:1.5, height: 2.25}, rot:{x:0,y:1.57079632679,z:0}},
                           {pos:{x: -7.731833457946777, y: -0.8, z: -11.617785725239571}, dims:{width:1.5, height: 2.25}, rot:{x:0,y:1.57079632679,z:0}},
                           {pos:{x: -0.013148501254326372, y: -1.6, z: 6.044923782348633}, dims:{width:1.5, height: 1.5}},
                           {pos:{x: -0.07595948011816395, y: -0.8, z: 16.75197982788086}, dims:{width:1.5, height: 3}},
                           {pos:{x: -7.731833457946778, y: -0.8, z: 11.544662040888163}, dims:{width:1.5, height: 3}, rot:{x:0,y:1.57079632679,z:0}},
                           {pos:{x: 7.6974523925781275, y: -0.8, z: 11.73381267645709}, dims:{width:1.5, height: 3}, rot:{x:0,y:1.57079632679,z:0}},
                           {pos:{x: 19.842348098754883, y: -1.4, z: 0.18324702120981307}, dims:{width:1.5, height: 3}, rot:{x:0,y:1.57079632679,z:0}},
                           {pos:{x: 13.694782536404347, y: -1.4, z: 7.228099822998047}, dims:{width:1.5, height: 2.25}},
                           {pos:{x: 13.826883017001107, y: -1.4, z: -7.377546310424805}, dims:{width:1.5, height: 2.25}},
                           {pos:{x: -19.87673095703125, y: -1.4, z: 0.09557420748106615}, dims:{width:1.5, height: 3}, rot:{x:0,y:1.57079632679,z:0}},
                           {pos:{x: -13.708802988665713, y: -1.4, z: -7.377546310424806}, dims:{width:1.5, height: 2.25}},
                           {pos:{x: -13.885168501713958, y: -1.4, z: 7.228099822998047}, dims:{width:1.5, height: 2.25}},
                           {pos:{x: 0.03363594261864499, y: -1.6, z: -5.7066845703125}, dims:{width:1.5, height: 1.5}},
                           {pos:{x: -0.07060150805972984, y: -1.6, z: 5.704404830932617}, dims:{width:1.5, height: 1.5}}]}]

    },
    'amphitheater':{
      hasCircleLayout: true,
      radius: 20,
      sceneryPath: 'https://bitcloutweb.azureedge.net/public/3d/models/amphitheater/scene.gltf',
      sceneScale: 1,
      scaleModelToHeight: 7,
      scaleModelToWidth: 7,
      scaleModelToDepth: 7,
      playerStartPos: { x: -0.8, y: 4 ,z: -24 },
      floorPlan: [{type:'centerPiece',
                maxItems: 1},
                {type:'circle',
                radius: 9,
                maxItems: 5},
                {type:'circle',
                 radius: 19.5,
                maxItems: 10},
                {type:'circle',
                 radius: 31,
                maxItems: 10,
                size: 4}]
    }
  };

      /*,
      sceneAssets: [{
                modelUrl:'/models/NFTz3Dlogo.glb',
                format:'gltf',
                position: {x:-30,y:30,z:-15},
                rotation: {x:(Math.PI/4),y:0,z:0},
                width: 40,
                height: 25,
                depth: 10 
              }]*/


  let options = {
    walkSpeed: 10,
    el:el,
    defaultLoader: 'gltf',
    firstPerson: true,    
    ctrClass: 'space-ctr', // Attribute of div containing post and any additionl html
    linkText: 'View in 3D',
    linkCtrCls: 'nft-viewer', // container for links such as view in 3d, view in vr
    modelsRoute: 'https://desodata.azureedge.net', // Back end route to load models    
    nftsRoute: 'https://backend.nftz.zone/api/post/get3DScene',
    previewCtrCls: 'container', //container element in which to create the preview
    skyboxes: true,
    skyboxPath: 'https://bitcloutweb.azureedge.net/public/3d/images/skyboxes',
    sceneryPath: 'https://bitcloutweb.azureedge.net/public/3d/models/large_round_gallery_room/scene.gltf',
    sceneScale: 0.01,
    scaleModelToHeight:2,
    scaleModelToWidth: 2,
    scaleModelToDepth: 2,   
    playerStartPos: {x:0,y:4,z:0},  // location in the environment where the player will appear
    avatarSize: {width: 1, height:1, depth:1}, // Max dimensions of avatar
    vrType:vrControls, // default to walking unless vrcontrols=flying is in url params
    sceneryOptions: sceneryOptions[sceneryName]
  };            

  //initialize NFT viewer front end
  let spaceViewer = new D3D.D3DSpaceViewer(options);



  let maxItems = 10; //test with 10 NFTs

  let galleryData = {
  "id": 1,
  "label": "3D NFT Collection",
  "path": "collection13d",
  "desc": "A selection of DeSo 3D NFTs",
  "items": [
  {"id":"7108d188051649202a5cdc721903291d936bd7455a8dbafe62f5c47243725710",
    "layout":"centerPiece"},
   {
      "id": "e46cfaa6c7b1776f482d2d698ef35cd2b56ad17419b86ab89e3ec0cdecebba2a"
    },
    {"id":"74429d81234cc6169028a07a765c046b1194b77df41bcace7102c12b1e1939d9"
    },
    {"id":"e51876f6bdbae05d3bebf506f589bd390df809232a4ec57e1909c8d5f0e56fb0"
    },
    {"id":"ea0eb396c17c57a7e264d07619545999431d9c0f6779fe7553e92829f9cb8f0b"
    },
    {"id":"76b5e5ddf5e698d280bfc0e6beac4a9b25248d189c122a2297ee9718c64335cd"
    },
    {"id":"72a830d3d5f32cb5f78711c83ccb80aad863bf38c1d7d2bc654808965f1364ca"
    },
    {
      "id": "e49a87fa12912297d0a48bec8ed1feb8558ae2e74823ad7c85c6837bd83c9693"
    },
    {
      "id": "1b9332469743e11176512bc7a32bbd41f3906b94bfcb55f56b05f513afb56b0a"
    },
    {"id":"18260f9dc2c8b6bb472b6f1f1228fe0279c0544db7c5ae8ace91d9db89877cbd"
    },
    {"id":"03dba7ae443d58277b311ea00599fb3dabb2c04e626c084bee7332bac78f0ed0"
    },
    {"id":"6694b634ccd623de3222a487687f73abb6f74c743ae9e7842644acfdedbffd4f"
    },
    {"id":"52549b5eb68db7d085198c82f2d21c60f3eef8d731e6025689498f5a1028429a"
    },
    {"id":"72cc651cf9a61330f06a1a83f35bfd555a78014740a472c0d2048c50309bfc91"
    },
    {"id":"aae7d2ece6554a2194cd62f5db422733155f141d9d500c022c0d9b0bdde39f4b"
    },
  /*   {"id":"71b43b5f92686923988928f4b3064503e1f806200b974e6f0f941328fdc541cf"
    },
   {"id":"f24b85bfbc88a1048fd8e31ea85bd6a05c63e235bdfd8bed9ca03c00994a1b64"
    },*/
    {
      "id": "7630999a903663b368d1d2c2b86e39e77f30625eaca646b43b180e2be0ba4428"
    },
    {
      "id": "29159f42bfc28747f3d9fbc19c5a5b113e1feee111b1aa2d55a6abc2954e6c07"
    },
    {
      "id": "62f06d33da7d269cdccbdfc5250e0a9f67dfc70814e03b7f635ab2ab315a0452"
    },
    {
      "id": "87de5605d1a90936e692ae87f3544f6022eac06a6f283544d7f88c3d6e610a5d"
    },
    {"id":"faa40b88f3cca5b66a47ed6577ed763fbf43389ee0ab16720a57ccc42452e95f"
    },
    {"id":"1db9ac6961ec74bc02d56a062b52b8b8c3641ca8df0d55683a37e02ef66e08b0"
    },
    {"id":"440cbddf95882bd77cc561641e2210b314b76f925309467d5583ab620b1f28c5"
    },
    {"id":"8491d1bae3805b2602afcb23af5bd5d5cab50b400ea3f9b33b1765bdeb56f953"
    },
    {"id":"23a0ec171c3d7420fcd530ad2d7d7c6d2341283ae78267d67fdbe6f90cc12aea"
    },
    {"id":"86f7175aea37a25eff78097f3454d56aeaf9020241b46612edeeeeb8b9826323"
    },
    {"id":"e8f31141ba7492ac565ed53dce93edb4c27313e501f2efc8fb16468969a3a642"
    },
    {
      "id": "29159f42bfc28747f3d9fbc19c5a5b113e1feee111b1aa2d55a6abc2954e6c07"
    },
    {
      "id": "62f06d33da7d269cdccbdfc5250e0a9f67dfc70814e03b7f635ab2ab315a0452"
    },
    {"id":"1db9ac6961ec74bc02d56a062b52b8b8c3641ca8df0d55683a37e02ef66e08b0"
    },
    {"id":"440cbddf95882bd77cc561641e2210b314b76f925309467d5583ab620b1f28c5"
    },
    {"id":"8491d1bae3805b2602afcb23af5bd5d5cab50b400ea3f9b33b1765bdeb56f953"
    },
    {"id":"86f7175aea37a25eff78097f3454d56aeaf9020241b46612edeeeeb8b9826323"
    },
    {"id":"e8f31141ba7492ac565ed53dce93edb4c27313e501f2efc8fb16468969a3a642"
    },
    {
      "id": "29159f42bfc28747f3d9fbc19c5a5b113e1feee111b1aa2d55a6abc2954e6c07"
    }
   
    
  ]
};

let noNFTs = galleryData.items.length;
let allNFTS = [];
galleryData.items.forEach((nft, idx)=>{
        fetchDetail(nft.id).then((params)=>{

                        let itemData =  {
                            ...nft,
                            ...{nftPostHashHex: nft.id,
                          params:params,
                          imageUrls: params.nftPost.imageURLs,
                          nft:params.nftPost}
                        };

          if(params.is3D===true){
          nfts3D.push(itemData);
        } else {
          itemData.isImage = true,
          nfts2D.push(itemData);
        };
          allNFTS.push(itemData);
          if(allNFTS.length-1===noNFTs-1){
            spaceViewer.initSpace({items:nfts3D, images:nfts2D}).then((message)=>{
            })
            
          }
        });

  
});
  
}

const fetchDetail = (nftPostHashHex) =>{
  return new Promise(( resolve, reject ) => {
    fetch ('https://backend.nftz.zone/api/post/getnft?hash='+nftPostHashHex )
     .then((req)=>{
          req.json().then((nft)=>{
            let params;
            if(nft.is3D===true){
              params = parse3DNFTData(nft);
              resolve(params)
            } else {
              parse2DNFTData(nft).then((params)=>{
                params.width = 6;  // set maximum height and width here
                params.height = 6;
                params.depth = 6;
                params.nftPost = nft;
                resolve(params)
              })
            };

        });

      })  

 }).catch(err =>{
          console.log('error fetching data..',err);

 })
}


const parse3DNFTData = (nft) =>{
  //return the parameters required to load an nft using viewer.loadModel()

  let nftPostHashHex = nft.postHashHex;
  let extraDataParser = new D3D.ExtraData3DParser({ nftPostHashHex: nft.postHashHex,
                                                    extraData3D:nft.path3D,
                                                    endPoint:'https://desodata.azureedge.net/unzipped/'});

  let versions = extraDataParser.getAvailableVersions(0,'gltf');
  let path3D = versions[0];
  let params;
  if(path3D.indexOf('.')>-1){ // there is a file extension
    let modelUrl = extraDataParser.getModelPath(0,'gltf','any');
    // we have the full path - no api request required , load model 
    params = {
      is3D:nft.is3D,      
      containerId: 'nft-ctr',
      hideElOnLoad: 'nft-img',
      nftPostHashHex: nftPostHashHex,
      modelUrl:modelUrl,
      format:'gltf',
      nftPost: nft
    };
    //  console.log('FILE EXTENSION METHOD, url is: ',modelUrl);
   } else {
    // Do not have the full path (no file ext) api request required. Create params for reqauest to fetch path           
    let nftRequestParams = {
      postHex: nftPostHashHex,
      path: '/'+path3D,
      format: 'gltf'
    };
    
    params = {
      is3D:nft.is3D,      
      nftRequestParams:nftRequestParams,
      containerId: 'nft-ctr',
      hideElOnLoad: 'nft-preview-img',
      nftPostHashHex: nftPostHashHex,
      format:'gltf',
      nftPost: nft
    };
   // console.log('REQUEST PATH METHOD: ',nftPostHashHex,path3D);
  }

  return params;

}


const parse2DNFTData = async(nft) =>{
  return new Promise(( resolve, reject ) => {
    let imageUrl = nft.imageURLs[0];
    let proxyImageURL = PROXYURL +imageUrl;
    let nftData = nft;
    var img = new Image();

        img.onload = function(){

          var height = this.height;
          var width = this.width;
          let dims = calculateAspectRatioFit(width, height, 4,2.75);
          const textureLoader = new THREE.TextureLoader()
                textureLoader.crossOrigin = ""
          const texture = textureLoader.load(this.src);
          const geometry = new THREE.BoxGeometry( dims.width, dims.height, 0.10 );
          const materials = createMats(texture);
          const nftMesh = new THREE.Mesh( geometry, materials );
          let nftImgData = {is3D:nft.is3D, nft:nftData, mesh: nftMesh, imageUrl: imageUrl, width:dims.width, height:dims.height};
          resolve(nftImgData);
    };

    img.addEventListener('error', (img, error) =>{
      console.log('could not load image',img.src);
      console.log(error);
      reject(img.src)
    });
    img.src = proxyImageURL;

  })
}

const calculateAspectRatioFit = (srcWidth, srcHeight, maxWidth, maxHeight) => {

    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

    return { width: srcWidth*ratio, height: srcHeight*ratio };
}

const createMats = (texture) =>{
    var topside = new THREE.MeshBasicMaterial({color: '#AAAAAA'});
    var bottomside = new THREE.MeshBasicMaterial({color: '#AAAAAA'});        
    var leftside = new THREE.MeshBasicMaterial({color: '#AAAAAA'}); 
    var rightside = new THREE.MeshBasicMaterial({color: '#AAAAAA'});
    var backside = new THREE.MeshBasicMaterial( { map: texture } );
    var frontside = new THREE.MeshBasicMaterial( { map: texture } );

    var materials = [
      rightside,          // Right side
      leftside,          // Left side
      topside, // Top side
      bottomside, // Bottom side
      backside,            // Back side
      frontside          // Front side          
    ];

    return materials;
}

