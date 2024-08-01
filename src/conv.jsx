import { useState ,useEffect} from "react";
import useCurInfo from "./hooks/useCurInfo";

function Conv() {
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('INR');
    const [Famount, setFAmount] = useState(0);
    const [Tamount, setTAmount] = useState(0);
    let multiplier=useCurInfo(fromCurrency,toCurrency);
 
   
    useEffect(() => {
        if (multiplier !== -1) {
            setTAmount((Famount*multiplier).toPrecision(8));
        }
    }, [multiplier]); 

    const handleFromCurrencyChange = (e) => {
        setFromCurrency(e.target.value);
    };

    const handleToCurrencyChange = (e) => {
        setToCurrency(e.target.value);
    };

    const handleFromAmountChange = (e) => {
        if(String(e.target.value).length==10){
            alert("Please enter reasonable amount of money");
        }else{
        setFAmount(e.target.value);
        }
    };
    const handleToAmountChange = (e) => {
        setTAmount(e.target.value);
    };

    const handleConv=()=>{
        
    
        setTAmount((Famount*multiplier).toPrecision(8));
        
    };

    const handleSwap=()=>{
      
        const newFromCurrency = toCurrency;
        const newToCurrency = fromCurrency;

        setFromCurrency(newFromCurrency);
        setToCurrency(newToCurrency);
 
        //very imp point if we want to implement swap without using `useCurInfo` inside any hook or conditional statement 
        // console.log(multiplier); outdated value react will only give updated value after swap is handled 
        //since currencies changed and so did multiplier multiplier is updated
   
        // setTAmount(Famount*multiplier); this statement has no significance
    
       
    };

    const currencies = [
        { value: 'USD', label: 'USD' },
        { value: 'INR', label: 'INR' },
        { value: 'EUR', label: 'EUR' },
        { value: 'JPY', label: 'JPY' },
        { value: 'GBP', label: 'GBP' },
        { value: 'AUD', label: 'AUD' },
        { value: 'CAD', label: 'CAD' },
        { value: 'CHF', label: 'CHF' },
        { value: 'CNY', label: 'CNY' },
        { value: 'SEK', label: 'SEK' },
        { value: 'NZD', label: 'NZD' },

    ];

    return (
        <div className="main h-screen w-screen flex flex-col gap-12 justify-center items-center text-center px-4">
        <h3 className="overflow-clip sm:text-wrap md:text-xl lg:text-2xl font-bold underline">
          Simple Currency Converter
        </h3>
        <div className="card border bg-gray-500/70 rounded-xl px-6 py-4 sm:w-full md:w-3/4 lg:w-1/2 xl:w-1/3 flex flex-col justify-around items-center gap-4">
          <div className="fields gap-4 px-2 flex flex-col justify-around w-full">
      
            <div className="field flex flex-col justify-between gap-4 items-start border border-slate-700 px-4 py-3 w-full rounded-md bg-white">
              <div className="upper flex flex-row justify-between text-gray-500 text-xs font-sans font-medium w-full">
                <h4 >From</h4>
                <h4>Currency Type</h4>
           
              </div>
              <div className="lower flex flex-col sm:flex-row justify-between items-center text-black font-semibold font-sans w-full gap-2">
                <input
                  type="number"
                  className="border overflow-ellipsis w-full sm:w-1/2 px-2 py-2"
                  value={Famount}
                  onChange={handleFromAmountChange}
                />
                <select value={fromCurrency} onChange={handleFromCurrencyChange} className="text-black w-full sm:w-1/2 px-2 py-2">
                  {currencies.map((currency) => (
                    <option key={currency.value} value={currency.value}>
                      {currency.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
      
            <div className="field flex flex-col justify-between gap-4 items-start border border-slate-700 px-4 py-3 w-full rounded-md bg-white">
              <div className="upper flex flex-row justify-between text-gray-500 text-xs font-sans font-medium w-full">
                <h4>To</h4>
                <h4>Currency Type</h4>
              </div>
              <div className="lower flex flex-col sm:flex-row justify-between items-center text-black font-semibold font-sans w-full gap-2">
                <input
                  type="number"
                  className="border overflow-ellipsis w-full sm:w-1/2 px-2 py-2"
                  value={Tamount}
                  onChange={handleToAmountChange}
                  readOnly
                />
                <select value={toCurrency} onChange={handleToCurrencyChange} className="text-black w-full sm:w-1/2 px-2 py-2">
                  {currencies.map((currency) => (
                    <option key={currency.value} value={currency.value}>
                      {currency.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
      
          <div className="btns flex flex-col sm:flex-row justify-between gap-4 font-sans font-medium">
            <button onClick={handleConv} className="bg-cyan-600 px-4 py-2 rounded-md">
              Convert {fromCurrency} to {toCurrency}
            </button>
            <button onClick={handleSwap} className="bg-cyan-700 px-4 py-2 rounded-md">
              Swap
            </button>
          </div>
        </div>
      </div>
      
    );
}

export default Conv;
