<script>
	import { onMount } from 'svelte';
	import { createScene } from "./scene";

	let el;

	onMount(() => {
		el = document.querySelector('#space-ctr');
		createScene(el);
	});
</script>
<div class="loader-ctr"></div>
<div class="space-ctr" id="space-ctr">
<div id="hud-content">
<div id="hud-text"></div>
<div class="buttons">
<button class="nft-button-grad" id="view-page">View NFT Page</button>
<button class="nft-button-grad" id="buy-now">Buy Now</button>
<button class="nft-button-grad" id="close-hud">Close</button></div>
</div>

</div>
<div bind:this={el} id="nft-ctr" class="nft-ctr">
	<div class="d3d-btn view-vr-btn" style="display: none;">Enter VR</div>
	<div id="view-full" class="d3d-btn view-vr-btn">Full Screen</div>
	<div id="give-diamond" class="d3d-btn view-vr-btn">💎</div>
	<div id="give-heart" class="d3d-btn view-vr-btn">❤</div>

</div>	
