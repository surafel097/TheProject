import "./widgetLg.css";
import {React , useState , useEffect} from 'react' ;
import axios from 'axios' ;

export default function WidgetLg() {
  const createAxios = axios.create({
    baseURL: `http://localhost:4000/api/v1`
  })

  const [Data , setData] = useState([]) ;

  useEffect(() => {
    const fetchData = async() => {
        try{
            console.log('trying to connect!!!!!!!!!!!!!1')
            const Event_response = await createAxios.get(`/orgs`) ;

             setData(Event_response.data.data.org) ;
            console.log(Event_response) ;
            
        } catch(err) {
            // console.log('error has occured ' + err) ;
            console.log(err) ;
            
        }
        
    } 
    fetchData() ;
}, []) ;



  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Charity Organization List</h3>
      <table className="widgetLgTable">  

      <tr className="widgetLgTr">
          <th className="widgetLgTh">Organization</th>
          <th className="widgetLgTh">Registered Date</th>
          <th className="widgetLgTh">Phone Number</th>
          <th className="widgetLgTh">Address</th>
          <th className="widgetLgTh">Status</th>
        </tr>
      { Data.map ( (i) => {     
        return [ 
          <>
       
        
        <tr className="widgetLgTr">
        
          <td className="widgetLgUser">
            <img
              src={`http://localhost:4000/${i.imagePath}`}
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">{i.name}</span>
          </td>
          <td className="widgetLgDate">2 Jun 2012</td>
          <td className="widgetLgDate">{i.phoneNum}</td>

          <td className="widgetLgAmount">{i.locations[0]}</td>
          <td className="widgetLgStatus">
            <Button type={i.status} />
          </td>
          
          

        </tr>
        </>
        ] ;
        })}
      </table>
    </div>
  );
}
