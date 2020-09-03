import React,{useEffect, useState} from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import '../styles/Locator.scss'


interface ICity {
  city: string
}
interface IIp {
  ip: string
}

const Locator:React.FC = () => {

  const [ip, setIp] = useState<IIp | null>(null);
  const [city, setCity] = useState<ICity | null>(null);

  useEffect(() => {

    const source = Axios.CancelToken.source();
  
    const fetchLocation = async () => {

      try{ 
        await Axios.get('http://www.geoplugin.net/json.gp',{
          cancelToken: source.token
        })
        .then( res => {
          console.log(res)
          setCity(res.data.geoplugin_city);
          setIp(res.data.geoplugin_request);
        } )

      } catch(err){

        if(Axios.isCancel(err)) console.log(err);
        else throw err;
        
      }
    }

    fetchLocation();

    return () => {
      source.cancel();
    }
  }, [])

  return (
    <div className="locatorDiv">
      <div>
        Your Ip Address is {ip}
      </div>
      <div>
        In city {city}
      </div>
    </div>
  );
};

export default Locator;