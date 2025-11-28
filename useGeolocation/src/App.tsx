import { useGeolocation } from "./useGeolocation";

export default function App() {
    const [position, loading, getPosition] = useGeolocation();

    return (
        <div>
            <button disabled={loading} onClick={getPosition}>
                Get my position
            </button>
            {position ? (
                <div>
                    {" "}
                    {loading ? (
                        "Loading..."
                    ) : (
                        <p>
                            My Position: <br />
                            <a
                                target="_blank"
                                href={`https://maps.google.com/?q=${position.lat},${position.lng}`}
                            >
                                {position.lat} | {position.lng}
                            </a>
                        </p>
                    )}
                </div>
            ) : (
                <p>{loading ? "Loading..." : "Click on the button"}</p>
            )}
        </div>
    );
}
