let mseSourceBuffer1
let mseStreamingStarted1 = false
const mseQueue1 = []
let ws1
  function callhls1(camip) {
    const url = camip
    const videoEl1 = document.querySelector("#Streaming0")
    const mse = new MediaSource()
    videoEl1.src = window.URL.createObjectURL(mse)
    mse.addEventListener('sourceopen', function () {
      ws1 = new WebSocket(url)
      ws1.binaryType = 'arraybuffer'
      ws1.onopen = function (event) {
        console.log('Connect to ws')
      }
      ws1.onmessage = function (event) {
        const data = new Uint8Array(event.data)
        if (data[0] === 9) {
          let mimeCodec
          const decodedArr = data.slice(1)
          if (window.TextDecoder) {
            mimeCodec = new TextDecoder('utf-8').decode(decodedArr)
          } else {
            mimeCodec = Utf8ArrayToStr(decodedArr)
          }
          mseSourceBuffer1 = mse.addSourceBuffer('video/mp4; codecs="' + mimeCodec + '"')
          mseSourceBuffer1.mode = 'segments'
          mseSourceBuffer1.addEventListener('updateend', pushPacket1)
        } else {
          readPacket1(event.data)
          
        }
      }
    }, false)
  }

  function pushPacket1 () {

    const videoEl1 = document.querySelector('#Streaming0')
    let packet

    if (!mseSourceBuffer1.updating) {
      if (mseQueue1.length > 0) {
        packet = mseQueue1.shift()
        mseSourceBuffer1.appendBuffer(packet)
      } else {
        mseStreamingStarted1 = false
      }
    }
    if (videoEl1.buffered.length > 0) {
      if (typeof document.hidden !== 'undefined' && document.hidden) {
      // no sound, browser paused video without sound in background
        videoEl1.currentTime = videoEl1.buffered.end((videoEl1.buffered.length - 1)) - 0.5
      }
    }
  }

  function readPacket1 (packet) {
    if (!mseStreamingStarted1) {
      mseSourceBuffer1.appendBuffer(packet)
      mseStreamingStarted1 = true
      return
    }
    mseQueue1.push(packet)
    if (!mseSourceBuffer1.updating) {
      pushPacket1()
    }
  }
  function StopWebSocket1()
  {
  
    ws1.close();
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
