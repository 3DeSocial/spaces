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
<div bind:this={el} class="space-ctr" id="space-ctr">
	<div style="display:none;" class="statusbar"></div>
	<div style="display:none;" id="heart" class="d3d-btn-top heart">❤</div>
	<div style="display:none;" id="diamond-count" class="d3d-btn-top"><span id="d-count">0</span> X 💎</div>
	<div style="display:none;" id="confirm" class="d3d-btn-top confirm-transaction"><buton class="nft-button-grad" id="trx-confirm">Confirm Send</div>

	<div id="hud-content">
		<div id="hud-text"></div>
		<div class="buttons">
		<button class="nft-button-grad" id="view-page">View NFT Page</button>
		<button class="nft-button-grad" id="buy-now">Buy Now</button>
		<button class="nft-button-grad" id="close-hud">Close</button></div>
	</div>
	<div class="toolbar"></div>
	<div class="d3d-btn view-vr-btn" style="display: none;">Enter VR</div>
	<div id="view-full" class="d3d-btn view-vr-btn">Full Screen</div>
	<div id="give-diamond" class="disabled d3d-btn view-vr-btn">💎</div>
	<div id="give-heart" class="disabled d3d-btn view-vr-btn">❤</div>
</div>
	
