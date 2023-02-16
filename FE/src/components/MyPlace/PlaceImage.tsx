import React from 'react';
import { Image } from 'antd';

import { MdLocalCafe } from 'react-icons/md';
import { Col, Row } from 'antd';

import './PlaceImage.styles.scss';
import { useParams } from 'react-router-dom';
import { placeDetailAPI } from '@src/API/placeAPI';

function PlaceImage() {
  const param = useParams();
  const placeId = param?.id;
  const data = placeDetailAPI(placeId);

  // const title = '가게 이름';
  const description = data?.placeDescrib;

  return (
    <div className="place-desciption-container">
      {/* 장소 사진 분할 */}
      <div className="place-detail-image-container">
        <Image.PreviewGroup>
          <Row gutter={[4, 4]}>
            {/* 왼쪽 1장 */}
            <Col span={12}>
              <Image
                src={
                  data?.placePhoto
                    ? data?.placePhoto.length > 0
                      ? data?.placePhoto[0]
                      : 'https://www.missioninfra.net/img/noimg/noimg_4x3.gif'
                    : 'https://www.missioninfra.net/img/noimg/noimg_4x3.gif'
                }
                alt=""
              />
            </Col>
            {/* 오른쪽 4장 */}
            <Col span={12}>
              <Row gutter={[2, 2]}>
                {/* 위 2장 */}
                <Col span={12}>
                  <Image
                    src={
                      data?.placePhoto
                        ? data?.placePhoto.length > 1
                          ? data?.placePhoto[1]
                          : 'https://www.missioninfra.net/img/noimg/noimg_4x3.gif'
                        : 'https://www.missioninfra.net/img/noimg/noimg_4x3.gif'
                    }
                    alt=""
                  />
                </Col>
                <Col span={12}>
                  <Image
                    src={
                      data?.placePhoto
                        ? data?.placePhoto.length > 2
                          ? data?.placePhoto[2]
                          : 'https://www.missioninfra.net/img/noimg/noimg_4x3.gif'
                        : 'https://www.missioninfra.net/img/noimg/noimg_4x3.gif'
                    }
                    alt=""
                  />
                </Col>
                {/* 아래 2장 */}
                <Col span={12}>
                  <Image
                    src={
                      data?.placePhoto
                        ? data?.placePhoto.length > 3
                          ? data?.placePhoto[3]
                          : 'https://www.missioninfra.net/img/noimg/noimg_4x3.gif'
                        : 'https://www.missioninfra.net/img/noimg/noimg_4x3.gif'
                    }
                    alt=""
                  />
                </Col>
                <Col span={12}>
                  <Image
                    src={
                      data?.placePhoto
                        ? data?.placePhoto.length > 4
                          ? data?.placePhoto[4]
                          : 'https://www.missioninfra.net/img/noimg/noimg_4x3.gif'
                        : 'https://www.missioninfra.net/img/noimg/noimg_4x3.gif'
                    }
                    alt=""
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Image.PreviewGroup>
      </div>
      {/* 장소 설명 */}
      <div className="place-detail-content-container">
        {/* 장소 설명 */}
        <h6>{description}</h6>
      </div>
    </div>
  );
}

export default PlaceImage;
