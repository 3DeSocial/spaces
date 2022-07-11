import * as THREE from 'three';    
import * as D3D from '3d-nft-viewer'

export const createScene = (el) => {

  const urlParams = new URLSearchParams(window.location.search);
  const nftUserName = urlParams.get('username');

//initialize NFT viewer front end
  let spaceViewer = new D3D.D3DSpaceViewer({
    el:el,
    defaultLoader: 'gltf',
    ctrClass: 'space-ctr', // Attribute of div containing post and any additionl html
    linkText: 'View in 3D',
    linkCtrCls: 'nft-viewer', // container for links such as view in 3d, view in vr
    modelsRoute: 'https://desodata.azureedge.net', // Back end route to load models    
    nftsRoute: 'https://backend.nftz.zone/api/post/get3DScene',
    previewCtrCls: 'container', //container element in which to create the preview
    skyboxes: true,
    skyboxPath: 'https://bitcloutweb.azureedge.net/public/3d/images/skyboxes',
    sceneryPath: 'http://localhost:5000/layouts/modern_architectural_style_gallery_museum/scene.gltf',
    sceneScale: 0.01,
    scaleModelToHeight:2,
    scaleModelToWidth: 2,
    scaleModelToDepth: 2,   
    playerStartPos: new THREE.Vector3(0,0,0)
  });

  let nfts3D = [];

  fetch ('https://backend.nftz.zone/api/creator/nfts?datatype=0&username='+nftUserName )
    .then((req)=>{
      req.json().then((res)=>{
        res.forEach((nft, idx)=>{
          if(nft.postExtraData){
            if(nft.postExtraData['3DExtraData']){
                fetchDetail(nft.postHashHex).then((params)=>{
                  let itemData = {nftPostHashHex: nft.postHashHex,
                                  params:params,
                                  imageUrls: nft.imageURLs};
                  nfts3D.push(itemData);
                  if((idx===res.length-1)||(idx===12)){
                    spaceViewer.initSpace({items:nfts3D});
                  }
                });
            }
          } else {
            if(nft.is3D){
                fetchDetail(nft.postHashHex).then((params)=>{
                  let itemData = {nftPostHashHex: nft.postHashHex,
                                  params:params,
                                  imageUrls: nft.imageURLs};
                  nfts3D.push(itemData);
                  if((idx===res.length-1)||(idx===12)){
                    spaceViewer.initSpace({items:nfts3D});
                  }
                });
            }
          }
        })
      });
  });
}

/** settings for different rooms **

sceneryPath: 'http://localhost:5000/layouts/vr_art_gallery_-_el5/scene.gltf',
    sceneScale: 0.01,
    scaleModelToHeight:1,
    scaleModelToWidth: 1,
    scaleModelToDepth: 0.8,

   sceneryPath: 'http://localhost:5000/layouts/big_room/scene.gltf',
    sceneScale: 0.1,
    scaleModelToHeight: 2,
    scaleModelToWidth: 2,
    scaleModelToDepth: 2,


    sceneryPath: 'http://localhost:5000/layouts/clock_tower/scene.gltf',
    sceneScale: 0.2,
    scaleModelToHeight: 2,
    scaleModelToWidth: 2,
    scaleModelToDepth: 2,

    sceneScale: 1,
    scaleModelToHeight: 1,
    scaleModelToWidth: 1,
    scaleModelToDepth: 1,
    playerStartPos: new THREE.Vector3(0,0,10),


 sceneryPath: 'http://localhost:5000/layouts/modern_architectural_style_gallery_museum/scene.gltf',
    sceneScale: 0.01,
    scaleModelToHeight:1,
    scaleModelToWidth: 1,
    scaleModelToDepth: 0.8,    
*/

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
              // we have the full path, load model
              let params = {
                containerId: 'nft-ctr',
                hideElOnLoad: 'nft-img',
                nftPostHashHex: nftPostHashHex,
                modelUrl:modelUrl
              };
  resolve(params);
  /*
              nftViewer.loadModel(params)
              .then((item, model, pos)=>{

                if(nftViewer.loadedItem){ 
                  // this confirms that the model is loaded
                  nftViewer.start3D(); // start animation loop 
                  showOverlay(); // display overlay
                  addOverlayListeners(nftViewer); // add listeners to overlay
                };
              });
  */
            } else {
              // get path params and load NFT
             
              let nftRequestParams = {
                postHex: nftPostHashHex,
                path: '/'+path3D,
                format: 'gltf'
              };
              /** Load the model immediately, or call the following code on click of a button ***/
              let params = {
                nftRequestParams:nftRequestParams,
                containerId: 'nft-ctr',
                hideElOnLoad: 'nft-preview-img',
                nftPostHashHex: nftPostHashHex,
                format:'gltf'
              };
  resolve(params);

           /*   nftViewer.loadNFT(params)
              .then((item, model, pos)=>{
                if(nftViewer.loadedItem){ 
                  // this confirms that the model is loaded
                  nftViewer.start3D(); // start animation loop 
                  showOverlay(); // display overlay
                  addOverlayListeners(nftViewer); // add listeners to overlay
                }
              });
  */

            }
      });

    });  

 });
} 