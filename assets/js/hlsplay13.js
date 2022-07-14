let mseSourceBuffer13
let mseStreamingStarted13 = false
const mseQueue13 = []
let ws13
  function callhls13(camip) {
    const url = camip
    const videoEl2 = document.querySelector('#Streaming12')
 
 
    const mse = new MediaSource()
    videoEl2.src = window.URL.createObjectURL(mse)
    mse.addEventListener('sourceopen', function () {
      ws13 = new WebSocket(url)
      ws13.binaryType = 'arraybuffer'
      ws13.onopen = function (event) {
        console.log('Connect to ws')
      }
      ws13.onmessage = function (event) {
        const data = new Uint8Array(event.data)
        if (data[0] === 9) {
          let mimeCodec
          const decodedArr = data.slice(1)
          if (window.TextDecoder) {
            mimeCodec = new TextDecoder('utf-8').decode(decodedArr)
          } else {
            mimeCodec = Utf8ArrayToStr(decodedArr)
          }
          mseSourceBuffer13 = mse.addSourceBuffer('video/mp4; codecs="' + mimeCodec + '"')
          mseSourceBuffer13.mode = 'segments'
          mseSourceBuffer13.addEventListener('updateend', pushPacket13)
        } else {
          readPacket13(event.data)
          
        }
      }
    }, false)
  }

  function pushPacket13 () {

    const videoEl2 = document.querySelector('#Streaming12')
    let packet

    if (!mseSourceBuffer13.updating) {
      if (mseQueue13.length > 0) {
        packet = mseQueue13.shift()
        mseSourceBuffer13.appendBuffer(packet)
      } else {
        mseStreamingStarted13 = false
      }
    }
    if (videoEl2.buffered.length > 0) {
      if (typeof document.hidden !== 'undefined' && document.hidden) {
      // no sound, browser paused video without sound in background
        videoEl2.currentTime = videoEl2.buffered.end((videoEl2.buffered.length - 1)) - 0.5
      }
    }
  }

  function readPacket13 (packet) {
    if (!mseStreamingStarted13) {
      mseSourceBuffer13.appendBuffer(packet)
      mseStreamingStarted13 = true
      return
    }
    mseQueue13.push(packet)
    if (!mseSourceBuffer13.updating) {
      pushPacket13()
    }
  }
  function StopWebSocket13()
  {
    ws13.close();
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
