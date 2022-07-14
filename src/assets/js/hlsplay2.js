let mseSourceBuffer2
let mseStreamingStarted2 = false
const mseQueue2 = []
let ws2
  function callhls2(camip) {
    const url = camip
    const videoEl2 = document.querySelector('#Streaming1')
 
 
    const mse = new MediaSource()
    videoEl2.src = window.URL.createObjectURL(mse)
    mse.addEventListener('sourceopen', function () {
      ws2 = new WebSocket(url)
      ws2.binaryType = 'arraybuffer'
      ws2.onopen = function (event) {
        console.log('Connect to ws')
      }
      ws2.onmessage = function (event) {
        const data = new Uint8Array(event.data)
        if (data[0] === 9) {
          let mimeCodec
          const decodedArr = data.slice(1)
          if (window.TextDecoder) {
            mimeCodec = new TextDecoder('utf-8').decode(decodedArr)
          } else {
            mimeCodec = Utf8ArrayToStr(decodedArr)
          }
          mseSourceBuffer2 = mse.addSourceBuffer('video/mp4; codecs="' + mimeCodec + '"')
          mseSourceBuffer2.mode = 'segments'
          mseSourceBuffer2.addEventListener('updateend', pushPacket2)
        } else {
          readPacket2(event.data)
          
        }
      }
    }, false)
  }

  function pushPacket2 () {

    const videoEl2 = document.querySelector('#Streaming1')
    let packet

    if (!mseSourceBuffer2.updating) {
      if (mseQueue2.length > 0) {
        packet = mseQueue2.shift()
        mseSourceBuffer2.appendBuffer(packet)
      } else {
        mseStreamingStarted2 = false
      }
    }
    if (videoEl2.buffered.length > 0) {
      if (typeof document.hidden !== 'undefined' && document.hidden) {
      // no sound, browser paused video without sound in background
        videoEl2.currentTime = videoEl2.buffered.end((videoEl2.buffered.length - 1)) - 0.5
      }
    }
  }

  function readPacket2 (packet) {
    if (!mseStreamingStarted2) {
      mseSourceBuffer2.appendBuffer(packet)
      mseStreamingStarted2 = true
      return
    }
    mseQueue2.push(packet)
    if (!mseSourceBuffer2.updating) {
      pushPacket2()
    }
  }
  function StopWebSocket2()
  {
    ws2.close();
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
