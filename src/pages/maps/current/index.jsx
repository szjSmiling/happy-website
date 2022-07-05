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
  const [mapParentRef, setMapParentRef] = useState(null);
  const [mapHeight, setMaoHeight] = useState('350px');
  const mapRef = React.createRef(null);
  const scaleOffset = new BMapGL.Size(10, 5);       // BMAP_ANCHOR_TOP_RIGHT    -- RIGHT:10, TOP: 5
  const navigationOffset = new BMapGL.Size(10, 50); // BMAP_ANCHOR_BOTTOM_LEFT  -- LEFT:10, BOTTOM: 50
  useEffect(() => {
    function myFun(r) {
      var cityName = r.name;
      setCurrentAxis([r.center.lng, r.center.lat])
      console.log(r);
      console.log("当前定位城市:" + cityName);
    }
    var myCity = new BMapGL.LocalCity();
    myCity.get(myFun)
  }, []);
  useEffect(() => {
    if(mapParentRef) {
      const headHeight = mapParentRef?.children[0].clientHeight ?? 60;
      const mapHeight = mapParentRef.clientHeight - headHeight - 48;
      setMaoHeight(mapHeight)
    }
  }, [mapParentRef])
  useEffect(() => {
    console.log(mapRef.current);
  }, [mapRef.current])
  return (
    <>
      <Card
        ref={(e) => setMapParentRef(e)}
        hoverable
        title="当前位置"
        extra={<a href="#">More</a>}
        style={{height: '100%'}}
      >
        <Map
          ref={mapRef}
          style={{height: mapHeight}}
          center={{ lng: currentAxis[0], lat: currentAxis[1] }}
          enableScrollWheelZoom
          zoom={12}
          tilt={40}
          onClick={e => console.log(e)}
        >
          <MapTypeControl anchor={BMAP_ANCHOR_TOP_LEFT} />
          <NavigationControl anchor={BMAP_ANCHOR_BOTTOM_LEFT} offset={navigationOffset} />
          <ScaleControl anchor={BMAP_ANCHOR_TOP_RIGHT} offset={scaleOffset} />
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
    </>
  );
}
