let mseSourceBuffer4
let mseStreamingStarted4 = false
const mseQueue4 = []
let ws4
  function callhls4(camip) {
    const url = camip
    const videoEl2 = document.querySelector('#Streaming3')
 
 
    const mse = new MediaSource()
    videoEl2.src = window.URL.createObjectURL(mse)
    mse.addEventListener('sourceopen', function () {
      ws4 = new WebSocket(url)
      ws4.binaryType = 'arraybuffer'
      ws4.onopen = function (event) {
        console.log('Connect to ws')
      }
      ws4.onmessage = function (event) {
        const data = new Uint8Array(event.data)
        if (data[0] === 9) {
          let mimeCodec
          const decodedArr = data.slice(1)
          if (window.TextDecoder) {
            mimeCodec = new TextDecoder('utf-8').decode(decodedArr)
          } else {
            mimeCodec = Utf8ArrayToStr(decodedArr)
          }
          mseSourceBuffer4 = mse.addSourceBuffer('video/mp4; codecs="' + mimeCodec + '"')
          mseSourceBuffer4.mode = 'segments'
          mseSourceBuffer4.addEventListener('updateend', pushPacket4)
        } else {
          readPacket4(event.data)
          
        }
      }
    }, false)
  }

  function pushPacket4 () {

    const videoEl2 = document.querySelector('#Streaming3')
    let packet

    if (!mseSourceBuffer4.updating) {
      if (mseQueue4.length > 0) {
        packet = mseQueue4.shift()
        mseSourceBuffer4.appendBuffer(packet)
      } else {
        mseStreamingStarted4 = false
      }
    }
    if (videoEl2.buffered.length > 0) {
      if (typeof document.hidden !== 'undefined' && document.hidden) {
      // no sound, browser paused video without sound in background
        videoEl2.currentTime = videoEl2.buffered.end((videoEl2.buffered.length - 1)) - 0.5
      }
    }
  }

  function readPacket4 (packet) {
    if (!mseStreamingStarted4) {
      mseSourceBuffer4.appendBuffer(packet)
      mseStreamingStarted4 = true
      return
    }
    mseQueue4.push(packet)
    if (!mseSourceBuffer4.updating) {
      pushPacket4()
    }
  }
  function StopWebSocket4()
  {
    ws4.close();
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
