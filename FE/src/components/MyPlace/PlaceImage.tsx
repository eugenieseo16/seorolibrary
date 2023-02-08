import React from 'react';
import { Image } from 'antd';

import { MdLocalCafe } from 'react-icons/md';
import { Col, Row } from 'antd';

import './PlaceImage.styles.scss';

function PlaceImage() {
  const title = '가게 이름';
  const description =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae modi id nobis ex necessitatibus magnam officia, harum eveniet, distinctio praesentium provident corporis odio recusandae sunt accusamus. Quidem et ducimus exercitationem.';

  return (
    <div className="place-desciption-container">
      {/* 장소 사진 분할 */}
      <div className="place-detail-image-container">
        <Image.PreviewGroup>
          <Row gutter={[4, 4]}>
            {/* 왼쪽 1장 */}
            <Col span={12}>
              <Image src="/src/assets/images/place_sample1.jpeg" alt="" />
            </Col>
            {/* 오른쪽 4장 */}
            <Col span={12}>
              <Row gutter={[2, 2]}>
                {/* 위 2장 */}
                <Col span={12}>
                  <Image src="/src/assets/images/place_sample2.jpg" alt="" />
                </Col>
                <Col span={12}>
                  <Image src="/src/assets/images/place_sample3.jpg" alt="" />
                </Col>
                {/* 아래 2장 */}
                <Col span={12}>
                  <Image src="/src/assets/images/place_sample4.jpeg" alt="" />
                </Col>
                <Col span={12}>
                  <Image src="/src/assets/images/place_sample5.jpg" alt="" />
                </Col>
              </Row>
            </Col>
          </Row>
        </Image.PreviewGroup>
      </div>
      {/* 장소 설명 */}
      <div className="place-detail-content-container">
        {/* 장소 이름 */}
        <h2>
          <MdLocalCafe />
          &nbsp;
          {title}
        </h2>
        {/* 장소 설명 */}
        <h6>{description}</h6>
      </div>
    </div>
  );
}

export default PlaceImage;
