let mseSourceBuffer5
let mseStreamingStarted5 = false
const mseQueue5 = []
let ws5
  function callhls5(camip) {
    const url = camip
    const videoEl2 = document.querySelector('#Streaming4')
 
 
    const mse = new MediaSource()
    videoEl2.src = window.URL.createObjectURL(mse)
    mse.addEventListener('sourceopen', function () {
      ws5 = new WebSocket(url)
      ws5.binaryType = 'arraybuffer'
      ws5.onopen = function (event) {
        console.log('Connect to ws')
      }
      ws5.onmessage = function (event) {
        const data = new Uint8Array(event.data)
        if (data[0] === 9) {
          let mimeCodec
          const decodedArr = data.slice(1)
          if (window.TextDecoder) {
            mimeCodec = new TextDecoder('utf-8').decode(decodedArr)
          } else {
            mimeCodec = Utf8ArrayToStr(decodedArr)
          }
          mseSourceBuffer5 = mse.addSourceBuffer('video/mp4; codecs="' + mimeCodec + '"')
          mseSourceBuffer5.mode = 'segments'
          mseSourceBuffer5.addEventListener('updateend', pushPacket5)
        } else {
          readPacket5(event.data)
          
        }
      }
    }, false)
  }

  function pushPacket5 () {

    const videoEl2 = document.querySelector('#Streaming4')
    let packet

    if (!mseSourceBuffer5.updating) {
      if (mseQueue5.length > 0) {
        packet = mseQueue5.shift()
        mseSourceBuffer5.appendBuffer(packet)
      } else {
        mseStreamingStarted5 = false
      }
    }
    if (videoEl2.buffered.length > 0) {
      if (typeof document.hidden !== 'undefined' && document.hidden) {
      // no sound, browser paused video without sound in background
        videoEl2.currentTime = videoEl2.buffered.end((videoEl2.buffered.length - 1)) - 0.5
      }
    }
  }

  function readPacket5 (packet) {
    if (!mseStreamingStarted5) {
      mseSourceBuffer5.appendBuffer(packet)
      mseStreamingStarted5 = true
      return
    }
    mseQueue5.push(packet)
    if (!mseSourceBuffer5.updating) {
      pushPacket5()
    }
  }
  function StopWebSocket5()
  {
    ws5.close();
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
