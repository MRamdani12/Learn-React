import { useState } from "react";

type Position = {
    lat: number;
    lng: number;
};

export function useGeolocation(): [Position | null, boolean, () => void] {
    const [position, setPosition] = useState<Position | null>(null);
    const [loading, setLoading] = useState(false);
    function getPosition() {
        if (navigator.geolocation) {
            setLoading(true);

            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setPosition({
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                    });
                    setLoading(false);
                },
                (err) => {
                    alert(err.message);
                    setLoading(false);
                }
            );
        } else {
            alert("Your browser doesn't support geolocaton");
        }
    }

    return [position, loading, getPosition];
}
