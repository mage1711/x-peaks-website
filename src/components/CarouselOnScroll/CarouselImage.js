import Atropos from "atropos/react";
import "atropos/css/min";
import "./CarouselImage.css";

const CarouselImage = ({ image }) => {
  return (
    <div
      className="container"
      style={{ width: "25vw", minWidth: "300px", height: "50vh" }}
    >
      <Atropos
        className="my-atropos h-full"
        rotateTouch="scroll-x"
        activeOffset={5}
        shadowScale={0.85}
        shadowOpacity={0.5}
      >
        <div className="atropos h-full">
          <div className="atropos-scale h-full">
            <div className="atropos-rotate h-full">
              <div className="atropos-inner h-full">
                <img
                  className="atropos-spacer"
                  src={image}
                  alt="stars"
                  style={{ display: "none" }}
                />
                <img
                  data-atropos-offset="-5.5"
                  src={image}
                  alt="stars"
                  className="h-full"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="atropos-shadow"></div>
            </div>
          </div>
        </div>
      </Atropos>
    </div>
  );
};

export default CarouselImage;
