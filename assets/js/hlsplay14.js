let mseSourceBuffer14
let mseStreamingStarted14 = false
const mseQueue14 = []
let ws14
  function callhls14(camip) {
    const url = camip
    const videoEl2 = document.querySelector('#Streaming13')
 
 
    const mse = new MediaSource()
    videoEl2.src = window.URL.createObjectURL(mse)
    mse.addEventListener('sourceopen', function () {
      ws14 = new WebSocket(url)
      ws14.binaryType = 'arraybuffer'
      ws14.onopen = function (event) {
        console.log('Connect to ws')
      }
      ws14.onmessage = function (event) {
        const data = new Uint8Array(event.data)
        if (data[0] === 9) {
          let mimeCodec
          const decodedArr = data.slice(1)
          if (window.TextDecoder) {
            mimeCodec = new TextDecoder('utf-8').decode(decodedArr)
          } else {
            mimeCodec = Utf8ArrayToStr(decodedArr)
          }
          mseSourceBuffer14 = mse.addSourceBuffer('video/mp4; codecs="' + mimeCodec + '"')
          mseSourceBuffer14.mode = 'segments'
          mseSourceBuffer14.addEventListener('updateend', pushPacket14)
        } else {
          readPacket14(event.data)
          
        }
      }
    }, false)
  }

  function pushPacket14 () {

    const videoEl2 = document.querySelector('#Streaming13')
    let packet

    if (!mseSourceBuffer14.updating) {
      if (mseQueue14.length > 0) {
        packet = mseQueue14.shift()
        mseSourceBuffer14.appendBuffer(packet)
      } else {
        mseStreamingStarted14 = false
      }
    }
    if (videoEl2.buffered.length > 0) {
      if (typeof document.hidden !== 'undefined' && document.hidden) {
      // no sound, browser paused video without sound in background
        videoEl2.currentTime = videoEl2.buffered.end((videoEl2.buffered.length - 1)) - 0.5
      }
    }
  }

  function readPacket14 (packet) {
    if (!mseStreamingStarted14) {
      mseSourceBuffer14.appendBuffer(packet)
      mseStreamingStarted14 = true
      return
    }
    mseQueue14.push(packet)
    if (!mseSourceBuffer14.updating) {
      pushPacket14()
    }
  }
  function StopWebSocket14()
  {
    ws14.close();
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
