import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home2.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import Post from "../Post/post" ;


export default function Home() {
  return (
    <div className="home">
      {/* <FeaturedInfo />
      <Chart data={userData} title="User Analytics" grid dataKey="Donations"/> */}
      <div className="homeWidgets">
        {/* <WidgetSm/> */}
        <Post/>
      </div>
    </div>
  );
}
