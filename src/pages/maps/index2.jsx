import React, { useEffect } from "react";
import { Card } from "antd";
import Map from "react-bmapgl/Map";

import WithBaiDuMap from "@components/common/WithBaiDuMap";

export default WithBaiDuMap(function index() {
  useEffect(() => {}, []);
  const style = {
    float: "left",
    width: "49%",
    height: 400,
    marginBottom: 5
  };
  const styleOdd = {
    float: "right",
    width: "49%",
    height: 400,
    marginBottom: 5
  };
  return (
    <>
      <Card
        hoverable
        title="小区位置"
        extra={<a href="#">More</a>}
        style={style}
      >
        <Map
          style={{height: 292}}
          center={{ lng: 116.402544, lat: 39.928216 }}
          enableScrollWheelZoom
          zoom="11"
        ></Map>
      </Card>
      <Card
        hoverable
        title="公司位置"
        extra={<a href="#">More</a>}
        style={styleOdd}
      >
        <Map
          style={{height: 292}}
          center={{ lng: 116.402544, lat: 39.928216 }}
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
          style={{height: 292}}
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
          style={{height: 292}}
          center={{ lng: 116.402544, lat: 39.928216 }}
          enableScrollWheelZoom
          zoom="11"
        ></Map>
      </Card>
    </>
  );
})
