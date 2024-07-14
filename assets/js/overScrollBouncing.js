// 출처 : https://codepen.io/idiotWu/pen/EgNdXK
export const overScrollBouncing = (containerElem, contentElem, dampValue) => {
  const damping = dampValue;
  const maxOffset = 100;

  const container = document.querySelector(containerElem);
  const content = document.querySelector(contentElem);

  let offset = 0;
  let rendered = 0;
  let lastDis = 0;
  let backFlag = false;

  let timer;

  function resetFlag() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      backFlag = false;
    }, 30);
  }

  function render() {
    if (!offset && !rendered) {
      lastDis = 0;
      return requestAnimationFrame(render);
    }

    const dis = offset - rendered;

    if (lastDis * dis < 0) {
      backFlag = true;
    }

    lastDis = dis;

    const next = offset - ((dis * damping) | 0);

    content.style.transform = `translate3d(0, ${-next}px, 0)`;

    rendered = next;
    offset = (offset * damping) | 0;

    requestAnimationFrame(render);
  }

  render();

  const DELTA_SCALE = {
    STANDARD: 1,
    OTHERS: -3,
  };

  const DELTA_MODE = [1.0, 28.0, 500.0];

  const getDeltaMode = (mode) => DELTA_MODE[mode] || DELTA_MODE[0];

  const getDelta = (evt) => {
    if ("deltaX" in evt) {
      const mode = getDeltaMode(evt.deltaMode);

      return {
        x: (evt.deltaX / DELTA_SCALE.STANDARD) * mode,
        y: (evt.deltaY / DELTA_SCALE.STANDARD) * mode,
      };
    }

    if ("wheelDeltaX" in evt) {
      return {
        x: evt.wheelDeltaX / DELTA_SCALE.OTHERS,
        y: evt.wheelDeltaY / DELTA_SCALE.OTHERS,
      };
    }

    return {
      x: 0,
      y: evt.wheelDelta / DELTA_SCALE.OTHERS,
    };
  };

  function isOntoEdge(delta) {
    const { scrollTop, scrollHeight, clientHeight } = container;

    const max = scrollHeight - clientHeight;

    return (scrollTop === 0 && delta <= 0) || (scrollTop === max && delta >= 0);
  }

  ["wheel", "mousewheel"].forEach((name) => {
    container.addEventListener(
      name,
      (evt) => {
        const { y } = getDelta(evt);

        if (!isOntoEdge(y)) {
          return;
        }

        resetFlag();
        evt.preventDefault({ passive: false });

        if (!backFlag && y) {
          offset += (y * (maxOffset - Math.abs(offset))) / maxOffset;
        }
      },
      { passive: false }
    ); // passive: false 옵션 추가
  });
};
