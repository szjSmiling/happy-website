import React, { useEffect, useState } from "react";
import { Card } from "antd";
import Map from "react-bmapgl/Map";
import MapTypeControl from "react-bmapgl/Control/MapTypeControl";
import NavigationControl from "react-bmapgl/Control/NavigationControl";
import ScaleControl from "react-bmapgl/Control/ScaleControl";
import ZoomControl from "react-bmapgl/Control/ZoomControl";
import Circle from "react-bmapgl/Overlay/Circle";

export default function index() {
  const [currentAxis, setCurrentAxis] = useState([116.331398, 39.897445]);
  useEffect(() => {
    var map = new window.BMapGL.Map("allmap");
    var point = new BMapGL.Point(116.331398, 39.897445);
    map.centerAndZoom(point, 12);
    // var geolocation = new window.BMapGL.Geolocation();
    // geolocation.getCurrentPosition(function (r) {
    //   if (this.getStatus() == BMAP_STATUS_SUCCESS) {
    //     var mk = new window.BMapGL.Marker(r.point);
    //     map.addOverlay(mk);
    //     map.panTo(r.point);
    //     console.log("您的位置：" + r.point.lng + "," + r.point.lat);
    //     setCurrentAxis([r.point.lng, r.point.lat])
    //   } else {
    //     alert("failed" + this.getStatus());
    //   }
    // });
    function myFun(r) {
      var cityName = r.name;
      map.setCenter(cityName);
      setCurrentAxis([r.center.lng, r.center.lat])
      console.log(r);
      console.log("当前定位城市:" + cityName);
    }
    var myCity = new BMapGL.LocalCity();
    myCity.get(myFun)
  }, []);
  const style = {
    float: "left",
    width: "49%",
    height: 400,
    marginBottom: 5,
  };
  const styleOdd = {
    float: "right",
    width: "49%",
    height: 400,
    marginBottom: 5,
  };
  return (
    <>
      <div id="allmap" style={{display: "none"}}></div>
      <Card
        hoverable
        title="小区位置"
        extra={<a href="#">More</a>}
        style={style}
      >
        <Map
          style={{ height: 292 }}
          center={{ lng: 116.402544, lat: 39.928216 }}
          enableScrollWheelZoom
          zoom="11"
        >
          <MapTypeControl anchor={BMAP_ANCHOR_TOP_LEFT} />
          <NavigationControl anchor={BMAP_ANCHOR_BOTTOM_LEFT} />
          <ScaleControl anchor={BMAP_ANCHOR_TOP_RIGHT} />
          <ZoomControl anchor={BMAP_ANCHOR_BOTTOM_RIGHT} />
          <Circle
            center={new BMapGL.Point(116.4, 39.91)}
            radius={5000}
            strokeColor="#f00"
            strokeWeight={2}
            fillColor="#ff0"
            fillOpacity={0.3}
          />
        </Map>
      </Card>
      <Card
        hoverable
        title="公司位置"
        extra={<a href="#">More</a>}
        style={styleOdd}
      >
        <Map
          style={{ height: 292 }}
          center={{ lng: currentAxis[0], lat: currentAxis[1] }}
          enableScrollWheelZoom
          zoom="11"
        ></Map>
      </Card>
      <Card
        hoverable
        title="老家位置"
        extra={<a href="#">More</a>}
        style={style}
      >
        <Map
          style={{ height: 292 }}
          center={{ lng: 116.402544, lat: 39.928216 }}
          enableScrollWheelZoom
          zoom="11"
        ></Map>
      </Card>
      <Card
        hoverable
        title="中国地图"
        extra={<a href="#">More</a>}
        style={styleOdd}
      >
        <Map
          style={{ height: 292 }}
          center={{ lng: 116.402544, lat: 39.928216 }}
          enableScrollWheelZoom
          zoom="11"
        ></Map>
      </Card>
    </>
  );
}
