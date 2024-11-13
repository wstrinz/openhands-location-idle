<script>
import { onMount } from 'svelte';
import { location, startWatching } from '$lib/stores/location.js';
import { gameState, discoverLocation, updateWorldTime } from '$lib/stores/game.js';
import DebugPanel from '$lib/components/DebugPanel.svelte';

let updateInterval;

$effect(() => {
    if (location.latitude && location.longitude) {
        discoverLocation(location.latitude, location.longitude);
    }
});

onMount(() => {
    startWatching();
    updateInterval = setInterval(updateWorldTime, 1000);

    return () => {
        if (updateInterval) clearInterval(updateInterval);
    };
});
</script>

<div class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">Location Idle</h1>
        
        {#if location.error}
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {location.error}
            </div>
        {:else if location.latitude && location.longitude}
            <div class="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
                <div>Latitude: {location.latitude.toFixed(6)}</div>
                <div>Longitude: {location.longitude.toFixed(6)}</div>
                <div>Accuracy: {location.accuracy?.toFixed(1)}m</div>
            </div>
        {:else}
            <div class="animate-pulse bg-gray-200 dark:bg-gray-700 p-4 rounded-lg">
                Waiting for location...
            </div>
        {/if}

        <div class="mt-4">
            <h2 class="text-xl font-semibold mb-2">Player Stats</h2>
            <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <div>Level {gameState.player.level}</div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                    <div 
                        class="bg-blue-600 h-2.5 rounded-full" 
                        style="width: {(gameState.player.experience / (100 * Math.pow(1.5, gameState.player.level - 1)) * 100)}%"
                    ></div>
                </div>
                <div>Discovered Locations: {gameState.player.discoveredLocations.size}</div>
            </div>
        </div>
    </div>

    <DebugPanel />
</div>
