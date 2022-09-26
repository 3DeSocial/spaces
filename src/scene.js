import * as THREE from 'three';    
import * as D3D from '3d-nft-viewer'
let counter = 0;
const PROXYURL = 'https://backend.nftz.zone/api/query/getimage?url='; //URL and parameter to add to request for image

export const createScene = (el) => {

  /*  Get username from url - this will be gallery name in nftz  */
  const urlParams = new URLSearchParams(window.location.search);
  const nftUserName = urlParams.get('username');

  /* TODO Get these parameters from NFT stored gallery preferences instead of URL  */
  var sceneryName = urlParams.get('scenery');
  var userName =  urlParams.get('username');
if(!userName){
  userName = 'Swafs';
}
  if(!sceneryName){
    sceneryName = 'art1';
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
                  spots:[  {pos:{x: -0.10944072448069289, y: -1.2, z: -6.047203540802002}, dims:{width:1.5, height: 1.5}},
                           {pos:{x: -0.06733116066026976, y: -0.8, z: -16.733196258544922}, dims:{width:1.5, height: 3}},
                           {pos:{x: 7.697452392578127, y: -0.8, z: -11.542924826859029}, dims:{width:1.5, height: 2.25}, rot:{x:0,y:1.57079632679,z:0}},
                           {pos:{x: -7.731833457946777, y: -0.8, z: -11.617785725239571}, dims:{width:1.5, height: 2.25}, rot:{x:0,y:1.57079632679,z:0}},
                           {pos:{x: -0.013148501254326372, y: -1.2, z: 6.044923782348633}, dims:{width:1.5, height: 1.5}},
                           {pos:{x: -0.07595948011816395, y: -0.8, z: 16.75197982788086}, dims:{width:1.5, height: 3}},
                           {pos:{x: -7.731833457946778, y: -0.8, z: 11.544662040888163}, dims:{width:1.5, height: 3}, rot:{x:0,y:1.57079632679,z:0}},
                           {pos:{x: 7.6974523925781275, y: -0.8, z: 11.73381267645709}, dims:{width:1.5, height: 3}, rot:{x:0,y:1.57079632679,z:0}},
                           {pos:{x: 19.842348098754883, y: -1.2, z: 0.18324702120981307}, dims:{width:1.5, height: 3}, rot:{x:0,y:1.57079632679,z:0}},
                           {pos:{x: 13.694782536404347, y: -1.2, z: 7.228099822998047}, dims:{width:1.5, height: 2.25}},
                           {pos:{x: 13.826883017001107, y: -1.2, z: -7.377546310424805}, dims:{width:1.5, height: 2.25}},
                           {pos:{x: -19.87673095703125, y: -1.2, z: 0.09557420748106615}, dims:{width:1.5, height: 3}, rot:{x:0,y:1.57079632679,z:0}},
                           {pos:{x: -13.708802988665713, y: -0.8, z: -7.377546310424806}, dims:{width:1.5, height: 2.25}},
                           {pos:{x: -13.885168501713958, y: -0.8, z: 7.228099822998047}, dims:{width:1.5, height: 2.25}},
                           {pos:{x: 0.03363594261864499, y: -0.8, z: -5.7066845703125}, dims:{width:1.5, height: 1.5}},
                           {pos:{x: -0.07060150805972984, y: -1.2, z: 5.704404830932617}, dims:{width:1.5, height: 1.5}}]}]

    },
    'amphitheater':{
      hasCircleLayout: true,
      radius: 20,
      sceneryPath: 'https://bitcloutweb.azureedge.net/public/3d/models/amphitheater/scene.gltf',
      sceneScale: 1,
      scaleModelToHeight: 7,
      scaleModelToWidth: 7,
      scaleModelToDepth: 7,
      playerStartPos: { x: -0.8, y: 5 ,z: -24 },
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
    imageProxyUrl: PROXYURL,
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
    sceneryOptions: sceneryOptions[sceneryName],
    user: {
      userName: 'AndrewVanDuivenbode',
      publicKey: '1e25c4f29d76c8989db411f5c3171d87ec715ca2ad01498cb47d77ba5df7c6e5'
    },
    //Pass Deso API functions
    chainAPI: {
      fetchPost: function(params){
      },
      fetchPostDetail: function(params){
        return fetch('https://backend.nftz.zone/api/post/getnft?hash='+params.postHashHex );
      }
    }
  }; 



    //initialize NFT viewer front end
  let spaceViewer = new D3D.D3DSpaceViewer(options);

  fetch('https://nftzapi.azurewebsites.net/api/creator/nfts?datatype=0&username='+userName )
    .then((response) => {
      response.json().then((nfts)=>{
        console.log('no nfts: ',nfts.length);
        console.log(nfts);
        spaceViewer.initSpace({sceneAssets:nfts});
      });
    });

}


