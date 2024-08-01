import { useEffect, useState } from 'react';

function useCurInfo(fromCurrency, toCurrency) {
    const[multiplier,setM]=useState(-1);
    const fromCurrencyLower = String(fromCurrency).toLowerCase();
    const toCurrencyLower = String(toCurrency).toLowerCase();
    const cdnUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrencyLower}.json`;
    const fallbackUrl = `https://latest.currency-api.pages.dev/v1/currencies/${fromCurrencyLower}.json`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Fetching data from CDN URL:", cdnUrl);
                let response = await fetch(cdnUrl);

                if (!response.ok) {
                    console.log("CDN URL fetch failed, fetching from fallback URL:", fallbackUrl);
                    response = await fetch(fallbackUrl);
                    if (!response.ok) {
                        throw new Error('Failed to fetch data from both CDN and fallback URL');
                    }
                }

             
                const result = await response.json();
                console.log("Fetched data:", result);

     
                if (result[fromCurrencyLower][toCurrencyLower]) {
                    setM(result[fromCurrencyLower][toCurrencyLower]);
                } else {
                    throw new Error(`Conversion rate from ${fromCurrency} to ${toCurrency} not found`);
                }
            } catch (err) {
                console.error("Error fetching data:", err);
            } finally {
                console.log("Fetch attempt resolved");
            }
        };

        fetchData();
    }, [fromCurrencyLower, toCurrencyLower]);
   
    return multiplier;
}

export default useCurInfo;
