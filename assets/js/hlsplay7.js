let mseSourceBuffer7
let mseStreamingStarted7 = false
const mseQueue7 = []
let ws7
  function callhls7(camip) {
    const url = camip
    const videoEl2 = document.querySelector('#Streaming6')
 
 
    const mse = new MediaSource()
    videoEl2.src = window.URL.createObjectURL(mse)
    mse.addEventListener('sourceopen', function () {
      ws7 = new WebSocket(url)
      ws7.binaryType = 'arraybuffer'
      ws7.onopen = function (event) {
        console.log('Connect to ws')
      }
      ws7.onmessage = function (event) {
        const data = new Uint8Array(event.data)
        if (data[0] === 9) {
          let mimeCodec
          const decodedArr = data.slice(1)
          if (window.TextDecoder) {
            mimeCodec = new TextDecoder('utf-8').decode(decodedArr)
          } else {
            mimeCodec = Utf8ArrayToStr(decodedArr)
          }
          mseSourceBuffer7 = mse.addSourceBuffer('video/mp4; codecs="' + mimeCodec + '"')
          mseSourceBuffer7.mode = 'segments'
          mseSourceBuffer7.addEventListener('updateend', pushPacket7)
        } else {
          readPacket7(event.data)
          
        }
      }
    }, false)
  }

  function pushPacket7 () {

    const videoEl2 = document.querySelector('#Streaming6')
    let packet

    if (!mseSourceBuffer7.updating) {
      if (mseQueue7.length > 0) {
        packet = mseQueue7.shift()
        mseSourceBuffer7.appendBuffer(packet)
      } else {
        mseStreamingStarted7 = false
      }
    }
    if (videoEl2.buffered.length > 0) {
      if (typeof document.hidden !== 'undefined' && document.hidden) {
      // no sound, browser paused video without sound in background
        videoEl2.currentTime = videoEl2.buffered.end((videoEl2.buffered.length - 1)) - 0.5
      }
    }
  }

  function readPacket7 (packet) {
    if (!mseStreamingStarted7) {
      mseSourceBuffer7.appendBuffer(packet)
      mseStreamingStarted7 = true
      return
    }
    mseQueue7.push(packet)
    if (!mseSourceBuffer7.updating) {
      pushPacket7()
    }
  }
  function StopWebSocket7()
  {
    ws7.close();
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
