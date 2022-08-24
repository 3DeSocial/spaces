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
  if(!sceneryName){
    sceneryName = 'modern';
  };
  let vrControls = "walking";
  let vrControlsParam =  urlParams.get('vrcontrols'); 

  if(vrControlsParam){
    vrControls = vrControlsParam;
  };

  const avatar = urlParams.get('avatar');

  let sceneryOptions = {'modern':{
      hasCircleLayout: true,
      radius: 20,
      max2d: 12, //hexagon shape so this will be good for even layout
      sceneryPath: 'https://bitcloutweb.azureedge.net/public/3d/models/large_round_gallery_room/scene.gltf',
      sceneScale: 0.01,
      scaleModelToHeight:6,
      scaleModelToWidth: 6,
      scaleModelToDepth: 6,
      playerStartPos: {x:10,y:4,z:10},
      floorPlan: [{type:'centerPiece',
                maxNFTs: 1},
                {type:'circle',
                radius: 5,
                maxNFTs: 3},
                {type:'circle',
                 radius: 12,
                maxNFTs: 6},
                {type:'circle',
                 radius: 20,
                maxNFTs: 12}]
    },
    'art1':{
      hasCircleLayout: false,
      sceneryPath: 'https://bitcloutweb.azureedge.net/public/3d/models/art1/scene.gltf',
      sceneScale: 0.01,
      scaleModelToHeight:2,
      scaleModelToWidth: 2,
      scaleModelToDepth: 2,
      playerStartPos: {x:0,y:0,z:0}

    },
    'amphitheater':{
      hasCircleLayout: true,
      radius: 20,
      sceneryPath: 'https://bitcloutweb.azureedge.net/public/3d/models/amphitheater/scene.gltf',
      sceneScale: 1,
      scaleModelToHeight: 2,
      scaleModelToWidth: 2,
      scaleModelToDepth: 2,
      playerStartPos: { x: 2.2922477623854944, y: 3 ,z: 17.186004572643117 },
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
    }

  };


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



  let maxNFTs = 10; //test with 10 NFTs

  let galleryData = {
  "id": 1,
  "label": "3D NFT Collection",
  "path": "collection13d",
  "desc": "A selection of DeSo 3D NFTs",
  "items": [
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
    }
  ]
};

let noNFTs = galleryData.items.length;
let allNFTS = [];
galleryData.items.forEach((nft, idx)=>{
        fetchDetail(nft.id).then((params)=>{

          let itemData = {nftPostHashHex: nft.id,
                          params:params,
                          imageUrls: params.nftPost.imageURLs,
                          nft:params.nftPost};
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
                params.width = 5;  // set maximum height and width here
                params.height = 5;
                params.depth = 5;
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
 
          const textureLoader = new THREE.TextureLoader()
                textureLoader.crossOrigin = ""
          const texture = textureLoader.load(this.src);

          const geometry = new THREE.BoxGeometry( width, height, 0.10 );
          const materials = createMats(texture);
          const nftMesh = new THREE.Mesh( geometry, materials );
          let nftImgData = {is3D:nft.is3D, nft:nftData, mesh: nftMesh, imageUrl: imageUrl, width:width, height:height};
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