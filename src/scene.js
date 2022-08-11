import * as THREE from 'three';    
import * as D3D from '3d-nft-viewer'

export const createScene = (el) => {


  /*  Get username from url - this will be gallery name in nftz  */
  const urlParams = new URLSearchParams(window.location.search);
  const nftUserName = urlParams.get('username');

  /* TODO Get these parameters from NFT stored gallery preferences instead of URL  */
  const sceneryName = urlParams.get('scenery');
  let vrControls = "walking";
  let vrControlsParam =  urlParams.get('vrcontrols'); 

  if(vrControlsParam){
    vrControls = vrControlsParam;
  };

  const avatar = urlParams.get('avatar');

  let sceneryOptions = {'modern':{
      sceneryPath: 'https://bitcloutweb.azureedge.net/public/3d/models/large_round_gallery_room/scene.gltf',
      sceneScale: 0.01,
      scaleModelToHeight:2,
      scaleModelToWidth: 2,
      scaleModelToDepth: 2,
      playerStartPos: {x:0,y:2,z:0}
    },
    'art1':{
      sceneryPath: 'https://bitcloutweb.azureedge.net/public/3d/models/art1/scene.gltf',
      sceneScale: 0.01,
      scaleModelToHeight:2,
      scaleModelToWidth: 2,
      scaleModelToDepth: 2,
      playerStartPos: {x:0,y:0,z:0}

    },
    'amphitheater':{
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


  let defaultOptions = {
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
    sceneryPath: 'https://bitcloutweb.azureedge.net/public/3d/models/large_round_gallery_roomscene.gltf',
    sceneScale: 0.01,
    scaleModelToHeight:2,
    scaleModelToWidth: 2,
    scaleModelToDepth: 2,   
    playerStartPos: {x:0,y:0,z:0},  // location in the environment where the player will appear
    avatarSize: {width: 1, height:1, depth:1}, // Max dimensions of avatar
    vrType:vrControls // default to walking unless vrcontrols=flying is in url params
  };            

  let selectedSceneryOptions = sceneryOptions[sceneryName];

  //merge default options with selected scenery options
  let options = {
      ...defaultOptions,
      ...selectedSceneryOptions
  };

  //initialize NFT viewer front end
  let spaceViewer = new D3D.D3DSpaceViewer(options);

  //create array of nfts to view
  let nfts3D = [];
  let maxNFTs = 10; //test with 10 NFTs


  /**** Replace the "fetch" call with retrieval of NFT Gallery items from NFTz for the current gallery ****/
  fetch ('https://backend.nftz.zone/api/creator/nfts?datatype=0&username='+nftUserName)
    .then((req)=>{
      req.json().then((res)=>{
        res.forEach((nft, idx)=>{
            if(nft.is3D){
                fetchDetail(nft.postHashHex).then((params)=>{
                  console.log(params);
                  let itemData = {nftPostHashHex: nft.postHashHex,
                                  params:params,
                                  imageUrls: nft.imageURLs,
                                  nft:(params.nftPost)?params.nftPost:''};
                  nfts3D.push(itemData);
                  if((idx===res.length-1)||(idx===maxNFTs)){
                    console.log('nfts3D array format2 final length: ',nfts3D.length);
                    console.log(nfts3D);                    
                    spaceViewer.initSpace({items:nfts3D}).then((message)=>{
                      console.log('MESSAGE: ',message);
                      console.log('newly plotted positions: ');
                      console.log(spaceViewer.layoutPlotter.circlePositions);
                    })
                  }
                }).catch(err=>{
                  console.log('fetchDetail: ',err);
                })

          }
        })
      });
  });

}


const fetchDetail = (nftPostHashHex) =>{
  return new Promise(( resolve, reject ) => {
    fetch ('https://backend.nftz.zone/api/post/getnft?hash='+nftPostHashHex )
     .then((req)=>{
          req.json().then((nft)=>{

            let extraDataParser = new D3D.ExtraData3DParser({ nftPostHashHex: nftPostHashHex,
                                                          extraData3D:nft.path3D,
                                                          endPoint:'https://desodata.azureedge.net/unzipped/'});

            let versions = extraDataParser.getAvailableVersions(0,'gltf');
            let path3D = versions[0];

            if(path3D.indexOf('.')>-1){ // there is a file extension
              let modelUrl = extraDataParser.getModelPath(0,'gltf','any');
              // we have the full path - no api request required , load model 
              let params = {
                containerId: 'nft-ctr',
                hideElOnLoad: 'nft-img',
                nftPostHashHex: nftPostHashHex,
                modelUrl:modelUrl,
                format:'gltf',
                nftPost: nft
              };
            //  console.log('FILE EXTENSION METHOD, url is: ',modelUrl);

            resolve(params);
            return;

            } else {
              // Do not have the full path (no file ext) api request required. Create params for reqauest to fetch path           
              let nftRequestParams = {
                postHex: nftPostHashHex,
                path: '/'+path3D,
                format: 'gltf'
              };
              
              let params = {
                nftRequestParams:nftRequestParams,
                containerId: 'nft-ctr',
                hideElOnLoad: 'nft-preview-img',
                nftPostHashHex: nftPostHashHex,
                format:'gltf',
                nftPost: nft
              };
             // console.log('REQUEST PATH METHOD: ',nftPostHashHex,path3D);

              resolve(params);
              return;
            }
      });

    });  

 });
} 