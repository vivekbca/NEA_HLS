let mseSourceBuffer19
let mseStreamingStarted19 = false
const mseQueue19 = []
let ws19
  function callhls19(camip) {
    const url = camip
    const videoEl2 = document.querySelector('#Streaming18')
 
 
    const mse = new MediaSource()
    videoEl2.src = window.URL.createObjectURL(mse)
    mse.addEventListener('sourceopen', function () {
      ws19 = new WebSocket(url)
      ws19.binaryType = 'arraybuffer'
      ws19.onopen = function (event) {
        console.log('Connect to ws')
      }
      ws19.onmessage = function (event) {
        const data = new Uint8Array(event.data)
        if (data[0] === 9) {
          let mimeCodec
          const decodedArr = data.slice(1)
          if (window.TextDecoder) {
            mimeCodec = new TextDecoder('utf-8').decode(decodedArr)
          } else {
            mimeCodec = Utf8ArrayToStr(decodedArr)
          }
          mseSourceBuffer19 = mse.addSourceBuffer('video/mp4; codecs="' + mimeCodec + '"')
          mseSourceBuffer19.mode = 'segments'
          mseSourceBuffer19.addEventListener('updateend', pushPacket19)
        } else {
          readPacket19(event.data)
          
        }
      }
    }, false)
  }

  function pushPacket19 () {

    const videoEl2 = document.querySelector('#Streaming18')
    let packet

    if (!mseSourceBuffer19.updating) {
      if (mseQueue19.length > 0) {
        packet = mseQueue19.shift()
        mseSourceBuffer19.appendBuffer(packet)
      } else {
        mseStreamingStarted19 = false
      }
    }
    if (videoEl2.buffered.length > 0) {
      if (typeof document.hidden !== 'undefined' && document.hidden) {
      // no sound, browser paused video without sound in background
        videoEl2.currentTime = videoEl2.buffered.end((videoEl2.buffered.length - 1)) - 0.5
      }
    }
  }

  function readPacket19 (packet) {
    if (!mseStreamingStarted19) {
      mseSourceBuffer19.appendBuffer(packet)
      mseStreamingStarted19 = true
      return
    }
    mseQueue19.push(packet)
    if (!mseSourceBuffer19.updating) {
      pushPacket19()
    }
  }
  function StopWebSocket19()
  {
    ws19.close();
   console.log("Websocket Close")
  }
  // const videoEl = document.querySelector('#mse-video')
  

  // fix stalled video in safari
  // videoEl.addEventListener('pause', () => {
  //   if (videoEl.currentTime > videoEl.buffered.end(videoEl.buffered.length - 1)) {
  //     videoEl.currentTime = videoEl.buffered.end(videoEl.buffered.length - 1) - 0.1
  //     videoEl.play()
  //   }
  // })
