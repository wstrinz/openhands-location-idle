export const gameState = $state({
    player: {
        level: 1,
        experience: 0,
        discoveredLocations: new Set(),
        inventory: [],
        stats: {
            exploration: 1,
            luck: 1,
            speed: 1
        }
    },
    world: {
        time: Date.now(),
        activeEvents: new Set(),
        discoveredPoints: new Map() // key: "lat,lng", value: { type, discovered, lastVisited }
    }
});

export function addExperience(amount) {
    gameState.player.experience += amount;
    checkLevelUp();
}

function checkLevelUp() {
    const expNeeded = Math.floor(100 * Math.pow(1.5, gameState.player.level - 1));
    if (gameState.player.experience >= expNeeded) {
        gameState.player.experience -= expNeeded;
        gameState.player.level += 1;
        // Could trigger level up rewards here
    }
}

export function discoverLocation(lat, lng, type = 'basic') {
    const key = `${lat.toFixed(5)},${lng.toFixed(5)}`;
    if (!gameState.world.discoveredPoints.has(key)) {
        gameState.world.discoveredPoints.set(key, {
            type,
            discovered: Date.now(),
            lastVisited: Date.now()
        });
        gameState.player.discoveredLocations.add(key);
        addExperience(10);
    } else {
        const point = gameState.world.discoveredPoints.get(key);
        point.lastVisited = Date.now();
    }
}

export function updateWorldTime() {
    gameState.world.time = Date.now();
    // Here we could process any time-based events or updates
}