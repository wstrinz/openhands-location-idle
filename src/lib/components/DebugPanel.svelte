<script>
import { location, setDebugLocation } from '../stores/location.js';
import { gameState } from '../stores/game.js';

let debugLat = $derived(location.latitude?.toFixed(6) ?? '0');
let debugLng = $derived(location.longitude?.toFixed(6) ?? '0');
let showDebug = $state(false);

function handleMove() {
    setDebugLocation(parseFloat(debugLat), parseFloat(debugLng));
}

function moveRelative(dlat, dlng) {
    const newLat = (location.latitude ?? 0) + dlat;
    const newLng = (location.longitude ?? 0) + dlng;
    setDebugLocation(newLat, newLng);
}
</script>

<div class="fixed bottom-4 right-4 bg-white/90 dark:bg-gray-800/90 p-4 rounded-lg shadow-lg">
    <button 
        class="mb-2 px-3 py-1 bg-blue-500 text-white rounded"
        onclick={() => showDebug = !showDebug}
    >
        {showDebug ? 'Hide' : 'Show'} Debug
    </button>

    {#if showDebug}
        <div class="space-y-2">
            <div class="grid grid-cols-2 gap-2">
                <input 
                    type="number" 
                    bind:value={debugLat}
                    step="0.000001"
                    class="px-2 py-1 border rounded"
                />
                <input 
                    type="number" 
                    bind:value={debugLng}
                    step="0.000001"
                    class="px-2 py-1 border rounded"
                />
            </div>
            
            <button 
                onclick={handleMove}
                class="w-full px-3 py-1 bg-green-500 text-white rounded"
            >
                Set Location
            </button>

            <div class="grid grid-cols-3 gap-1">
                <button 
                    onclick={() => moveRelative(0.0001, -0.0001)}
                    class="px-2 py-1 bg-gray-500 text-white rounded"
                >↖</button>
                <button 
                    onclick={() => moveRelative(0.0001, 0)}
                    class="px-2 py-1 bg-gray-500 text-white rounded"
                >↑</button>
                <button 
                    onclick={() => moveRelative(0.0001, 0.0001)}
                    class="px-2 py-1 bg-gray-500 text-white rounded"
                >↗</button>
                <button 
                    onclick={() => moveRelative(0, -0.0001)}
                    class="px-2 py-1 bg-gray-500 text-white rounded"
                >←</button>
                <div class="px-2 py-1 text-center">·</div>
                <button 
                    onclick={() => moveRelative(0, 0.0001)}
                    class="px-2 py-1 bg-gray-500 text-white rounded"
                >→</button>
                <button 
                    onclick={() => moveRelative(-0.0001, -0.0001)}
                    class="px-2 py-1 bg-gray-500 text-white rounded"
                >↙</button>
                <button 
                    onclick={() => moveRelative(-0.0001, 0)}
                    class="px-2 py-1 bg-gray-500 text-white rounded"
                >↓</button>
                <button 
                    onclick={() => moveRelative(-0.0001, 0.0001)}
                    class="px-2 py-1 bg-gray-500 text-white rounded"
                >↘</button>
            </div>

            <div class="text-sm">
                <div>Level: {gameState.player.level}</div>
                <div>XP: {gameState.player.experience}</div>
                <div>Locations: {gameState.player.discoveredLocations.size}</div>
            </div>
        </div>
    {/if}
</div>