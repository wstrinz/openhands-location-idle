export const location = $state({
    latitude: null,
    longitude: null,
    accuracy: null,
    timestamp: null,
    error: null,
    watchId: null,
    isWatching: false
});

export function startWatching() {
    if (!navigator.geolocation) {
        location.error = 'Geolocation is not supported';
        return;
    }

    if (location.isWatching) return;

    location.watchId = navigator.geolocation.watchPosition(
        (position) => {
            location.latitude = position.coords.latitude;
            location.longitude = position.coords.longitude;
            location.accuracy = position.coords.accuracy;
            location.timestamp = position.timestamp;
            location.error = null;
        },
        (error) => {
            location.error = error.message;
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
    );
    location.isWatching = true;
}

export function stopWatching() {
    if (location.watchId) {
        navigator.geolocation.clearWatch(location.watchId);
        location.watchId = null;
        location.isWatching = false;
    }
}

export function setDebugLocation(lat, lng) {
    location.latitude = lat;
    location.longitude = lng;
    location.accuracy = 10;
    location.timestamp = Date.now();
    location.error = null;
}