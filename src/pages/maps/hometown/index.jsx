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
  useEffect(() => {
    var geolocation = new window.BMapGL.Geolocation();
    geolocation.getCurrentPosition(function (r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        console.log("您的位置：" + r.point.lng + "," + r.point.lat);
        setCurrentAxis([r.point.lng, r.point.lat])
      } else {
        alert("failed" + this.getStatus());
      }
    });
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
          <NavigationControl anchor={BMAP_ANCHOR_BOTTOM_LEFT} />
          <ScaleControl anchor={BMAP_ANCHOR_TOP_RIGHT} />
          <ZoomControl anchor={BMAP_ANCHOR_BOTTOM_RIGHT} />
          <Circle
            center={new BMapGL.Point(currentAxis[0], currentAxis[1])}
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
