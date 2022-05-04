import React, { useEffect, useState,  } from 'react';
import Media from 'react-media';
import './App.css';
import axios from 'axios'
import Coin from './Coin';


function App() {
  const [coins,setCoins] = useState([])
  const [search,setSearch] = useState('')
  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h')
    .then(res=>{
       setCoins(res.data)
       console.log(res.data)
    }).catch(error=>console.log(error))
  }, [])
  const handleChange = e =>{
    setSearch(e.target.value)
  }
  const filteredCoins = coins.filter(coin=>
    coin.name.toLowerCase().includes(search.toLowerCase())
    )
  return (
    
    <div className="coin-app">
      <h1 className='header'>Top 100 Cryptocurrencies</h1>
      <div className="coin-search">
        <form action="">
          <input type="text" font-family='Akshar' className="coin-input" placeholder="Search Coin" onChange={handleChange}/>

        </form>

      </div>
      {filteredCoins.map(coin=>{
        return(
          <Coin 
          key={coin.id} 
          name={coin.name} 
          image={coin.image} 
          symbol={coin.symbol}
          marketcap={coin.market_cap}
          price={coin.current_price}
          pricechange={coin.price_change_percentage_24h}
          />
        );
      })}

        <footer>Powered by CoinGecko </footer>
    </div>
  );
}

export default App;