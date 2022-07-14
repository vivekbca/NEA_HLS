let mseSourceBuffer6
let mseStreamingStarted6 = false
const mseQueue6 = []
let ws6
  function callhls6(camip) {
    const url = camip
    const videoEl2 = document.querySelector('#Streaming5')
 
 
    const mse = new MediaSource()
    videoEl2.src = window.URL.createObjectURL(mse)
    mse.addEventListener('sourceopen', function () {
      ws6 = new WebSocket(url)
      ws6.binaryType = 'arraybuffer'
      ws6.onopen = function (event) {
        console.log('Connect to ws')
      }
      ws6.onmessage = function (event) {
        const data = new Uint8Array(event.data)
        if (data[0] === 9) {
          let mimeCodec
          const decodedArr = data.slice(1)
          if (window.TextDecoder) {
            mimeCodec = new TextDecoder('utf-8').decode(decodedArr)
          } else {
            mimeCodec = Utf8ArrayToStr(decodedArr)
          }
          mseSourceBuffer6 = mse.addSourceBuffer('video/mp4; codecs="' + mimeCodec + '"')
          mseSourceBuffer6.mode = 'segments'
          mseSourceBuffer6.addEventListener('updateend', pushPacket6)
        } else {
          readPacket6(event.data)
          
        }
      }
    }, false)
  }

  function pushPacket6 () {

    const videoEl2 = document.querySelector('#Streaming5')
    let packet

    if (!mseSourceBuffer6.updating) {
      if (mseQueue6.length > 0) {
        packet = mseQueue6.shift()
        mseSourceBuffer6.appendBuffer(packet)
      } else {
        mseStreamingStarted6 = false
      }
    }
    if (videoEl2.buffered.length > 0) {
      if (typeof document.hidden !== 'undefined' && document.hidden) {
      // no sound, browser paused video without sound in background
        videoEl2.currentTime = videoEl2.buffered.end((videoEl2.buffered.length - 1)) - 0.5
      }
    }
  }

  function readPacket6 (packet) {
    if (!mseStreamingStarted6) {
      mseSourceBuffer6.appendBuffer(packet)
      mseStreamingStarted6 = true
      return
    }
    mseQueue6.push(packet)
    if (!mseSourceBuffer6.updating) {
      pushPacket6()
    }
  }
  function StopWebSocket6()
  {
    ws6.close();
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
