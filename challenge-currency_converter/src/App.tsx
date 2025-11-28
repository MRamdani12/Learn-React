import { useEffect, useState } from "react";

type frankfurtRatesResponse = {
    amount: number;
    base: string;
    dates: string;
    rates: Record<string, number>;
};

export default function App() {
    const [currencies, setCurrencies] = useState<string[]>([]);
    const [fromCurrencies, setFromCurrencies] = useState("USD");
    const [toCurrencies, setToCurrencies] = useState("IDR");
    const [input, setInput] = useState(1);
    const [convertedCurrencies, setConvertedCurrencies] = useState(0);
    const [loading, setLoading] = useState(false);

    async function fetchJSON<T>(...args: Parameters<typeof fetch>): Promise<T> {
        const res = await fetch(...args);
        if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
        return res.json() as Promise<T>;
    }

    useEffect(() => {
        async function fetchCurrencies() {
            const data = await fetchJSON<Record<string, string>>(
                "https://api.frankfurter.dev/v1/currencies"
            );
            setCurrencies(Object.keys(data));
        }
        fetchCurrencies();
    }, []);

    useEffect(() => {
        async function fetchCurrenciesRate() {
            setLoading(true);

            const data = await fetchJSON<frankfurtRatesResponse>(
                `https://api.frankfurter.dev/v1/latest?base=${fromCurrencies}&symbols=${toCurrencies}`
            );

            const convertedValue = data.rates[toCurrencies] * input;
            setConvertedCurrencies(convertedValue);
            setLoading(false);
        }

        fetchCurrenciesRate();
    }, [fromCurrencies, input, toCurrencies]);

    return (
        <div>
            <label style={{ display: "block" }}>Currency Converter</label>
            <br />
            {String(loading)}
            <input
                disabled={loading ? loading : false}
                value={input}
                onChange={(e) => setInput(Number(e.target.value))}
                type="text"
            />
            <select
                disabled={loading ? loading : false}
                value={fromCurrencies}
                onChange={(e) => setFromCurrencies(e.target.value)}
            >
                {currencies.map((cur) => {
                    return (
                        <option key={cur} value={cur}>
                            {cur ? cur : "Loading Currencies..."}
                        </option>
                    );
                })}
            </select>
            <select
                disabled={loading ? loading : false}
                value={toCurrencies}
                onChange={(e) => setToCurrencies(e.target.value)}
            >
                {currencies.map((cur) => {
                    return (
                        <option key={cur} value={cur}>
                            {cur ? cur : "Loading Currencies..."}
                        </option>
                    );
                })}
            </select>
            <p>
                {convertedCurrencies} {toCurrencies}
            </p>
        </div>
    );
}
