import React from "react";

const MAX_LIGHTNESS = 10;
const MIN_LIGHTNESS = 80;
const SATURATION = 100;

function minmax (v) {
  return Math.max(Math.min(MAX_LIGHTNESS, v), MIN_LIGHTNESS);
}

function drawPixel ({ x, y, min, max, lightness, ctx }) {
  min = min | 0;
  max = max | 0;

  let velocity = (Math.random() * 30 + 20) * 0.01 * (Math.random() > 0.5 ? -1 : 1);
  lightness = minmax((lightness || 80) + (velocity * .5));

  if (lightness === MAX_LIGHTNESS || lightness === MIN_LIGHTNESS) {
    velocity = velocity - velocity - velocity;
  }

  let hue = (Math.floor(Math.floor(Math.random() * 360) + velocity) % 360) || 0;

  const color = `hsla(${Math.round(hue)}, ${SATURATION}%, ${lightness}%, .5)`;
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.fillRect(x, y, 1, 1);
}

class BackgroundAnimation extends React.Component {
  constructor(props) {
    super(props)
    this.canvasRef = React.createRef();
  }
  componentDidMount() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    for (let x = 0; x < canvas.width; x++) {
      for (let y = 0; y < canvas.height; y++) {
        if (y % 2 === 0) {
          drawPixel({ ctx, x, y, min: 180, max: 190, lightness: x % 2 ? 80 : 50 });
        } else {
          drawPixel({ ctx, x, y, min: 160, max: 190, lightness: x % 2 ? 50 : 80 });
        }
      }
    }

  }
  
  render() {
    return (
      <div className='background__container'>
        <div className='background__wrapper'>
          <canvas width='8' height='8' className='background__animation' ref={this.canvasRef} />
        </div>
      </div>
    )
  }
}

export default BackgroundAnimation;
