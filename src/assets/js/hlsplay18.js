let mseSourceBuffer18
let mseStreamingStarted18 = false
const mseQueue18 = []
let ws18
  function callhls18(camip) {
    const url = camip
    const videoEl2 = document.querySelector('#Streaming17')
 
 
    const mse = new MediaSource()
    videoEl2.src = window.URL.createObjectURL(mse)
    mse.addEventListener('sourceopen', function () {
      ws18 = new WebSocket(url)
      ws18.binaryType = 'arraybuffer'
      ws18.onopen = function (event) {
        console.log('Connect to ws')
      }
      ws18.onmessage = function (event) {
        const data = new Uint8Array(event.data)
        if (data[0] === 9) {
          let mimeCodec
          const decodedArr = data.slice(1)
          if (window.TextDecoder) {
            mimeCodec = new TextDecoder('utf-8').decode(decodedArr)
          } else {
            mimeCodec = Utf8ArrayToStr(decodedArr)
          }
          mseSourceBuffer18 = mse.addSourceBuffer('video/mp4; codecs="' + mimeCodec + '"')
          mseSourceBuffer18.mode = 'segments'
          mseSourceBuffer18.addEventListener('updateend', pushPacket18)
        } else {
          readPacket18(event.data)
          
        }
      }
    }, false)
  }

  function pushPacket18 () {

    const videoEl2 = document.querySelector('#Streaming17')
    let packet

    if (!mseSourceBuffer18.updating) {
      if (mseQueue18.length > 0) {
        packet = mseQueue18.shift()
        mseSourceBuffer18.appendBuffer(packet)
      } else {
        mseStreamingStarted18 = false
      }
    }
    if (videoEl2.buffered.length > 0) {
      if (typeof document.hidden !== 'undefined' && document.hidden) {
      // no sound, browser paused video without sound in background
        videoEl2.currentTime = videoEl2.buffered.end((videoEl2.buffered.length - 1)) - 0.5
      }
    }
  }

  function readPacket18 (packet) {
    if (!mseStreamingStarted18) {
      mseSourceBuffer18.appendBuffer(packet)
      mseStreamingStarted18 = true
      return
    }
    mseQueue18.push(packet)
    if (!mseSourceBuffer18.updating) {
      pushPacket18()
    }
  }
  function StopWebSocket18()
  {
    ws18.close();
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
