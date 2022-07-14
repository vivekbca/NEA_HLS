let mseSourceBuffer12
let mseStreamingStarted12 = false
const mseQueue12 = []
let ws12
  function callhls12(camip) {
    const url = camip
    const videoEl2 = document.querySelector('#Streaming11')
 
 
    const mse = new MediaSource()
    videoEl2.src = window.URL.createObjectURL(mse)
    mse.addEventListener('sourceopen', function () {
      ws12 = new WebSocket(url)
      ws12.binaryType = 'arraybuffer'
      ws12.onopen = function (event) {
        console.log('Connect to ws')
      }
      ws12.onmessage = function (event) {
        const data = new Uint8Array(event.data)
        if (data[0] === 9) {
          let mimeCodec
          const decodedArr = data.slice(1)
          if (window.TextDecoder) {
            mimeCodec = new TextDecoder('utf-8').decode(decodedArr)
          } else {
            mimeCodec = Utf8ArrayToStr(decodedArr)
          }
          mseSourceBuffer12 = mse.addSourceBuffer('video/mp4; codecs="' + mimeCodec + '"')
          mseSourceBuffer12.mode = 'segments'
          mseSourceBuffer12.addEventListener('updateend', pushPacket12)
        } else {
          readPacket12(event.data)
          
        }
      }
    }, false)
  }

  function pushPacket12 () {

    const videoEl2 = document.querySelector('#Streaming11')
    let packet

    if (!mseSourceBuffer12.updating) {
      if (mseQueue12.length > 0) {
        packet = mseQueue12.shift()
        mseSourceBuffer12.appendBuffer(packet)
      } else {
        mseStreamingStarted12 = false
      }
    }
    if (videoEl2.buffered.length > 0) {
      if (typeof document.hidden !== 'undefined' && document.hidden) {
      // no sound, browser paused video without sound in background
        videoEl2.currentTime = videoEl2.buffered.end((videoEl2.buffered.length - 1)) - 0.5
      }
    }
  }

  function readPacket12 (packet) {
    if (!mseStreamingStarted12) {
      mseSourceBuffer12.appendBuffer(packet)
      mseStreamingStarted12 = true
      return
    }
    mseQueue12.push(packet)
    if (!mseSourceBuffer12.updating) {
      pushPacket12()
    }
  }
  function StopWebSocket12()
  {
    ws12.close();
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
