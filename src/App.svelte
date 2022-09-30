<script>
	import { onMount } from 'svelte';
	import { createScene } from "./scene";

	let el;

	onMount(() => {
	console.log('creating scene');
		el = document.querySelector('#space-ctr');
		createScene(el);
	});
</script>
<div class="loader-ctr"></div>
<div class="space-ctr" id="space-ctr">
</div>
<div bind:this={el} id="nft-ctr" class="nft-ctr">
	<div class="container" id="nft-img">
	</div>
	<div id="nft-overlay-holder" class="svelte-n8t4is">

		<div id="nft-overlay" class="nft-3d-overlay svelte-n8t4is">
			<span id="pos-display" class="pos">x:0 , y:0 , z:0</span>
			<!--<select id="layout" class="svelte-n8t4is">
				<option value="amphitheater">Amphitheater</option><option value="round_showroom">roundshowroom</option><option value="art_showroom">art_showroom</option><option value="aztec_temple">aztec_temple</option><option value="big_room">big_room</option></select> -->
				
		</div>

	</div>
	<div class="d3d-btn view-vr-btn" style="display: none;">Enter VR</div>

</div>	
<div id="hud-content"></div>
