import React, { useEffect, useRef } from "react";
import "../GridAnimation.css";

class GridAnimationInstance {
  constructor(el, row = 13, col = 9) {
    this.element = el;
    this.fragments = el.children;
    this.row = row;
    this.col = col;
    this.duration = 2000;
    this.delayDelta = 70;
    this.type = null;

    this.randomIntBetween = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    this.element.style.setProperty("--row", this.row);
    this.element.style.setProperty("--col", this.col);
    this.element.addEventListener("click", this.trigger);
  }

  trigger = () => {
    if (this.fragments.length > 0) this.clear();
    this.element.classList.add("hide");
    this.animate();
  };

  setType = (type) => {
    this.type = type;
  };

  clear = () => {
    while (this.element.hasChildNodes()) {
      this.element.removeChild(this.element.firstChild);
    }
  };

  animate = () => {
    if (this.type !== 2) return;
    const x = this.col - 1;
    const y = this.row - 1;
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        const fragment = document.createElement("div");
        fragment.className = "fragment";
        fragment.style.setProperty("--x", j);
        fragment.style.setProperty("--y", i);

        const isOdd = (i + j) % 2 === 0;
        fragment.style.setProperty(
          "--rotateX",
          `rotateX(${isOdd ? -180 : 0}deg)`
        );
        fragment.style.setProperty(
          "--rotateY",
          `rotateY(${isOdd ? 0 : -180}deg)`
        );
        const delay = this.randomIntBetween(0, x + y);
        fragment.style.setProperty("--delay", delay * this.delayDelta + "ms");
        fragment.style.setProperty("--duration", this.duration + "ms");
        this.element.appendChild(fragment);

        const timer = setTimeout(() => {
          fragment.style.willChange = "initial";
          fragment.style.transform = "initial";
          fragment.style.animation = "initial";
          fragment.style.backfaceVisibility = "initial";
          clearTimeout(timer);
        }, this.duration + delay * this.delayDelta);
      }
    }
  };
}

const GridAnimation = ({ row = 13, col = 9 }) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const element = wrapperRef.current.querySelector(".box");
    const gridAnimation = new GridAnimationInstance(element, row, col);
    const boxType = parseInt(element.getAttribute("data-i"));
    gridAnimation.setType(boxType);
    gridAnimation.trigger();

    return () => {};
  }, [row, col]);

  return (
    <div className="wrapper" ref={wrapperRef}>
      <div className="box" data-i="2" data-title=""></div>
    </div>
  );
};

export default GridAnimation;
